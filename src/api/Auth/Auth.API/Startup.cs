using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Auth.API.Data;
using Auth.API.Devspaces;
using Auth.API.Models;
using Auth.API.Services;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using HealthChecks.UI.Client;
using IdentityServer4.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using StackExchange.Redis;

namespace Auth.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public IServiceProvider ConfigureServices(IServiceCollection services)
        {
            //services.Configure<ForwardedHeadersOptions>(options =>
            //{
            //options.ForwardLimit = 2;
            //options.KnownProxies.Add(IPAddress.Parse("127.0.10.1"));
            //options.ForwardedForHeaderName = "X-Forwarded-For-My-Custom-Header-Name";
            //    options.ForwardedHeaders =
            //        ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
            //});

            //RegisterAppInsights(services);

            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(Configuration["ConnectionStrings"],
                   sqlServerOptionsAction: sqlOptions =>
                   {
                       sqlOptions.MigrationsAssembly(typeof(Startup).GetTypeInfo().Assembly.GetName().Name);
                        //Configuring Connection Resiliency: https://docs.microsoft.com/en-us/ef/core/miscellaneous/connection-resiliency 
                        sqlOptions.EnableRetryOnFailure(maxRetryCount: 15, maxRetryDelay: TimeSpan.FromSeconds(30), errorNumbersToAdd: null);
                   }));

            services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            services.Configure<AppSettings>(Configuration);

            //TODO: READ
            if (Configuration.GetValue<string>("IsClusterEnv") == bool.TrueString)
            {
                services.AddDataProtection(opts =>
                {
                    opts.ApplicationDiscriminator = "community.auth";
                })
                .PersistKeysToStackExchangeRedis(ConnectionMultiplexer.Connect(Configuration["DPConnectionString"]), "DataProtection-Keys");
            }

            services.AddHealthChecks()
                .AddCheck("self", () => HealthCheckResult.Healthy())
                .AddSqlServer(Configuration["ConnectionStrings"],
                    name: "AuthDB-check",
                    tags: new string[] { "AuthDB" });

            services.AddTransient<ILoginService<ApplicationUser>, EFLoginService>();
            services.AddTransient<IRedirectService, RedirectService>();

            var connectionString = Configuration["ConnectionString"];
            var migrationsAssembly = typeof(Startup).GetTypeInfo().Assembly.GetName().Name;


            services.AddIdentityServer(x =>
                {
                    x.IssuerUri = "null";
                    x.Authentication.CookieLifetime = TimeSpan.FromHours(2);
                })
                //.AddDeveloperSigningCredential() //TODO: READ!
                .AddDevspacesIfNeeded(Configuration.GetValue("EnableDevspaces", false))
               //.AddSigningCredential(Certificate.Get()) //TODO: MAYBE ADD LATER
               .AddAspNetIdentity<ApplicationUser>()
               .AddConfigurationStore(options => //TODo:READ
               {
                   options.ConfigureDbContext = builder => builder.UseSqlServer(connectionString,
                       sqlServerOptionsAction: sqlOptions =>
                       {
                           sqlOptions.MigrationsAssembly(migrationsAssembly);
                            //Configuring Connection Resiliency: https://docs.microsoft.com/en-us/ef/core/miscellaneous/connection-resiliency 
                           sqlOptions.EnableRetryOnFailure(maxRetryCount: 15, maxRetryDelay: TimeSpan.FromSeconds(30), errorNumbersToAdd: null);
                       });
               })
               .AddOperationalStore(options => //TODo:READ
               {
                   options.ConfigureDbContext = builder => builder.UseSqlServer(connectionString,
                        sqlServerOptionsAction: sqlOptions =>
                           {
                               sqlOptions.MigrationsAssembly(migrationsAssembly);
                                //Configuring Connection Resiliency: https://docs.microsoft.com/en-us/ef/core/miscellaneous/connection-resiliency 
                                sqlOptions.EnableRetryOnFailure(maxRetryCount: 15, maxRetryDelay: TimeSpan.FromSeconds(30), errorNumbersToAdd: null);
                           });
               })
               .Services.AddTransient<IProfileService, ProfileService>();

            services.AddControllers();
            //services.AddControllersWithViews();
            //services.AddRazorPages();

            var container = new ContainerBuilder();
            container.Populate(services);

            return new AutofacServiceProvider(container.Build());
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILoggerFactory loggerFactory)
        {
            //loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            //loggerFactory.AddDebug();
            //loggerFactory.AddAzureWebAppDiagnostics();
            //loggerFactory.AddApplicationInsights(app.ApplicationServices, LogLevel.Trace);

      
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseDatabaseErrorPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                //app.UseHsts();
            }

            var pathBase = Configuration["PATH_BASE"];

            if (!string.IsNullOrWhiteSpace(pathBase))
            {
                loggerFactory.CreateLogger<Startup>().LogDebug("Using PATH BASE '{pathBase}'", pathBase);
                app.UsePathBase(pathBase);
            }
            //https://www.sitepoint.com/improving-web-security-with-the-content-security-policy/
            app.Use(async (context, next) =>
            {
                context.Response.Headers.Add("Content-Security-Policy", "script-src 'unsafe-inline'");
                await next();
            });

            // UseForwardedHeaders has to be called before all middleware. before .UseHsts()
            app.UseForwardedHeaders(); // to forward the X-Forwarded-For and X-Forwarded-Proto headers . By convention, proxies forward information in HTTP headers.
            app.UseIdentityServer();
            app.UseStaticFiles();
            //it only affects downstream components registered in the pipeline.
            app.UseCookiePolicy(new CookiePolicyOptions { MinimumSameSitePolicy = Microsoft.AspNetCore.Http.SameSiteMode.Lax }); 
            app.UseRouting();
            //app.UseAuthorization();
            
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapDefaultControllerRoute();
                endpoints.MapControllers();
                endpoints.MapHealthChecks("/hc", new HealthCheckOptions
                {
                    Predicate = _ => true,
                    ResponseWriter = UIResponseWriter.WriteHealthCheckUIResponse
                });
                endpoints.MapHealthChecks("/liveness", new HealthCheckOptions
                {
                    Predicate = r => r.Name.Contains("self")
                });
            });
        }

        //private void RegisterAppInsights(IServiceCollection services)
        //{
        //    services.AddApplicationInsightsTelemetry(Configuration);
        //    services.AddApplicationInsightsKubernetesEnricher();
        //}
    }
}


//TODO: for nginx https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/linux-nginx?view=aspnetcore-3.1#configure-nginx
//https://www.nginx.com/resources/wiki/start/topics/examples/forwarded/