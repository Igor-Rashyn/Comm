using System;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.DependencyInjection;
using Serilog;
using System.IO;
using Auth.API.Data;
using IdentityServer4.EntityFramework.DbContexts;

namespace Auth.API
{
    public class Program
    {
        public static readonly string Namespace = typeof(Program).Namespace;
        public static readonly string AppName = Namespace.Substring(Namespace.LastIndexOf('.', Namespace.LastIndexOf('.') - 1) + 1);
        public static int Main(string[] args)
        {
            var configuration = GetConfiguration();

            Log.Logger = CreateLogger(configuration);

            try
            {
                Log.Information("Web host config ({ApplicationContext})...", AppName);
                var host = BuidWebHost(configuration, args);

                Log.Information("Migration ({ApplicationContext})...", AppName);

                host.MigrateDbContext<PersistedGrantDbContext>((_, __) => { })
                    .MigrateDbContext<ApplicationDbContext>((context, services) =>
                    {
                        var env = services.GetService<IWebHostEnvironment>();
                        var logger = services.GetService<ILogger<ApplicationDbContextSeed>>();
                        var settings = services.GetService<IOptions<AppSettings>>();

                        new ApplicationDbContextSeed()
                        .SeedAsync(context, env, logger, settings)
                        .Wait();
                    })
                    .MigrateDbContext<ConfigurationDbContext>((context, services) =>
                    {
                        new ConfigurationDbContextSeed()
                        .SeedAsync(context, configuration)
                        .Wait();
                    });

                Log.Information("Starting web host ({ApplicationContext})...", AppName);
                host.Run();
                return 0;
            }
            catch (Exception ex)
            {
                Log.Fatal(ex, "Program stoped ({ApplicationContext})...", AppName);
                return 1;
            }
            finally
            {
                Log.CloseAndFlush();
            }
        }

        public static IWebHost BuidWebHost(IConfiguration configuration, string[] args) =>
           WebHost.CreateDefaultBuilder(args)
                .CaptureStartupErrors(false)
                .ConfigureAppConfiguration(x => x.AddConfiguration(configuration))
                .UseStartup<Startup>()
                .UseContentRoot(Directory.GetCurrentDirectory())
                .UseSerilog()
                .Build();

        private static Serilog.ILogger CreateLogger(IConfiguration configuration)
        {
            var seqServerUrl = configuration["Serilog:SeqServerUrl"];
            var logstashUrl = configuration["Serilog:LogstashUrl"];

            return new LoggerConfiguration()
                .MinimumLevel.Verbose()
                .Enrich.WithProperty("ApplicationContext", AppName)
                .Enrich.FromLogContext()
                .WriteTo.Console()
                .WriteTo.Http(string.IsNullOrWhiteSpace(logstashUrl) ? "http://localhost:8080" : logstashUrl)
                .WriteTo.Seq(string.IsNullOrWhiteSpace(seqServerUrl) ? "http://seq" : seqServerUrl)
                .ReadFrom.Configuration(configuration)
                .CreateLogger();
        }

        private static IConfiguration GetConfiguration()
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddEnvironmentVariables();

            return builder.Build();
        }

    }
}
