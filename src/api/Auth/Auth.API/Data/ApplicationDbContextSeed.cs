using Auth.API.Extensions;
using Auth.API.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Auth.API.Data
{
    public class ApplicationDbContextSeed
    {
        private readonly IPasswordHasher<ApplicationUser> _passwordHasher = new PasswordHasher<ApplicationUser>();

        public async Task SeedAsync(ApplicationDbContext context, IWebHostEnvironment env, ILogger<ApplicationDbContextSeed> logger, IOptions<AppSettings> settings, int? retry =0)
        {
            int retryForAvaiability = retry.Value;

            try
            {
                var useCustomizationData = settings.Value.UseCustomizationData;
                var contentRootPath = env.ContentRootPath;
                var webroot = env.WebRootPath;

                if (!context.Users.Any())
                {
                    context.Users.AddRange(GetDefaultUser());
                    await context.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                if(retryForAvaiability < 10)
                {
                    retryForAvaiability++;
                    logger.LogError(ex, "EXCEPTION ERROR while migrating {DbContextName}", nameof(ApplicationDbContext));

                    await SeedAsync(context, env, logger, settings, retryForAvaiability);
                }
            }
        }

        private IEnumerable<ApplicationUser> GetDefaultUser()
        {
            var user = new ApplicationUser() {
                City = "Wellington",
                Country = "New Zealand",
                Email = "nimbik@gmail.com",
                Id = Guid.NewGuid().ToString(),
                LastName = "Rashin",
                Name = "Igor",
                PhoneNumber = "1234567890",
                UserName = "Nish",
                ZipCode = "6011",
                State = "Wellington",
                Street = "51 Cuba",
                NormalizedEmail = "NIMBIK@GMAIL.COM",
                NormalizedUserName = "NISH",
                SecurityStamp = Guid.NewGuid().ToString("D"),
            };

            user.PasswordHash = _passwordHasher.HashPassword(user, "Pass@word1");

            return new List<ApplicationUser>() { user };
        }
    }
}
