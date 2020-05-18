using Comment.API.Model;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Polly;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using global::Comment.API.Extensions;

namespace Comment.API.Infrastructure
{
    public class CommentContextSeed
    {
        public async Task SeedAsync(CommentContext context, IWebHostEnvironment env, IOptions<CommentSettings> settings, ILogger<CommentContextSeed> logger)
        {
            var policy = CreatePolicy(logger, nameof(CommentContextSeed));

            await policy.ExecuteAsync(async () =>
            {
                var useCustomizationData = settings.Value.UseCustomizationData;
                var contentRootPath = env.ContentRootPath;
                var picturePath = env.WebRootPath;

                if(!context.Comments.Any())
                {
                    await context.Comments.AddRangeAsync(useCustomizationData
                        ? GetCommentsFromFile(contentRootPath, context, logger)
                        : GetPreconfiguredComments());

                    await context.SaveChangesAsync();
                }
            });
        }

        private CommentItem[] GetPreconfiguredComments()
        {
            throw new NotImplementedException();
        }

        private IEnumerable<CommentItem> GetCommentsFromFile(string contentRootPath, CommentContext context, ILogger<CommentContextSeed> logger)
        {
            string csvFileComments = Path.Combine(contentRootPath, "Setup", "Comments.csv");

            if (!File.Exists(csvFileComments))
            {
                return GetPreconfiguredComments();
            }

            string[] csvheaders;
            try
            {
                string[] requiredHeaders = { "catalogtypename", "catalogbrandname", "description", "name", "price", "pictureFileName" };
                string[] optionalheaders = { "availablestock", "restockthreshold", "maxstockthreshold", "onreorder" };
                csvheaders = GetHeaders(csvFileComments, requiredHeaders, optionalheaders);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "EXCEPTION ERROR: {Message}", ex.Message);
                return GetPreconfiguredComments();
            }

            return File.ReadAllLines(csvFileComments)
                        .Skip(1) // skip header row
                        .Select(row => Regex.Split(row, ",(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)"))
                        .SelectTry(column => CreateCommentItem(column, csvheaders))
                        .OnCaughtException(ex => { logger.LogError(ex, "EXCEPTION ERROR: {Message}", ex.Message); return null; })
                        .Where(x => x != null);
        }

        private CommentItem CreateCommentItem(string[] column, string[] headers)
        {
            if (column.Count() != headers.Count())
            {
                throw new Exception($"column count '{column.Count()}' not the same as headers count'{headers.Count()}'");
            }

            return new CommentItem()
            {
                Message = "Test message",
                EntityType = "Project",
                EntityId = "1",
                UserId = "1"
            };
        }

        private string[] GetHeaders(string csvfile, string[] requiredHeaders, string[] optionalHeaders = null)
        {
            string[] csvheaders = File.ReadLines(csvfile).First().ToLowerInvariant().Split(',');

            if (csvheaders.Count() < requiredHeaders.Count())
            {
                throw new Exception($"requiredHeader count '{ requiredHeaders.Count()}' is bigger then csv header count '{csvheaders.Count()}' ");
            }

            if (optionalHeaders != null)
            {
                if (csvheaders.Count() > (requiredHeaders.Count() + optionalHeaders.Count()))
                {
                    throw new Exception($"csv header count '{csvheaders.Count()}'  is larger then required '{requiredHeaders.Count()}' and optional '{optionalHeaders.Count()}' headers count");
                }
            }

            foreach (var requiredHeader in requiredHeaders)
            {
                if (!csvheaders.Contains(requiredHeader))
                {
                    throw new Exception($"does not contain required header '{requiredHeader}'");
                }
            }

            return csvheaders;
        }

        private AsyncPolicy CreatePolicy(ILogger<CommentContextSeed> logger, string prefix, int retries = 3)
        {
            return Policy.Handle<SqlException>().
                WaitAndRetryAsync(
                    retryCount: retries,
                    sleepDurationProvider: retry => TimeSpan.FromSeconds(5),
                    onRetry: (exception, timeSpan, retry, ctx) =>
                    {
                        logger.LogWarning(exception, "[{prefix}] Exception {ExceptionType} with message {Message} detected on attempt {retry} of {retries}", prefix, exception.GetType().Name, exception.Message, retry, retries);
                    }
                );
        }
    }
}


//https://stackify.com/resilient-applications-polly/