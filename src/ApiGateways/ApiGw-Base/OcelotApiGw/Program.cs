using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Serilog;

namespace OcelotApiGw
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder
                    .ConfigureAppConfiguration(ic => ic.AddJsonFile(Path.Combine("configuration", "configuration.json")))
                    .UseStartup<Startup>()
                    .ConfigureLogging((hostingContext, loggingBuilder) => 
                    {
                        loggingBuilder.AddConfiguration(hostingContext.Configuration.GetSection("Logging"));
                        loggingBuilder.AddConsole();
                        loggingBuilder.AddDebug();
                    })
                    .UseSerilog((builderContext, config) => 
                    {
                        config
                        .MinimumLevel.Information()
                        .Enrich.FromLogContext()
                        .WriteTo.Console();
                    })
                    ;
                });
    }
}
