using IdentityServer4;
using IdentityServer4.Models;
using System.Collections.Generic;

namespace Auth.API.Configuration
{
    public class Config
    {
        //define the apis in the system
        public static IEnumerable<ApiResource> GetApis()
        {
            return new List<ApiResource>
            {
                new ApiResource("projects", "Projects Service"),
                new ApiResource("comments", "Comments Service"),
                new ApiResource("notifications", "Notifications Service")
            };
        }

        public static IEnumerable<IdentityResource> GetResources()
        {
            return new List<IdentityResource>
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile()
            };
        }

        public static IEnumerable<Client> GetClients(Dictionary<string, string> clientUrl)
        {
            return new List<Client>
            {
                new Client
                {
                    ClientId = "js",
                    ClientName = "SPA OpenId Client",
                    AllowedGrantTypes = GrantTypes.Implicit,
                    AllowAccessTokensViaBrowser = true,
                    RedirectUris = { $"{clientUrl["Spa"]}/" }, //Specifies the allowed URIs to return tokens or authorization codes to
                    RequireConsent = false,
                    PostLogoutRedirectUris = { $"{clientUrl["Spa"]}/" },
                    AllowedCorsOrigins = { $"{clientUrl["Spa"]}/" },
                    AllowedScopes =
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        "projects"
                    },
                },
                new Client
                {
                    ClientId = "projectsswaggerui",
                    ClientName = "Project Swagger UI",
                    AllowedGrantTypes = GrantTypes.Implicit,
                    AllowAccessTokensViaBrowser = true,
                    RedirectUris = { $"{clientUrl["ProjectApi"]}/swagger/oauth2-redirect.html"},
                    PostLogoutRedirectUris = { $"{clientUrl["ProjectApi"]}/swagger/" },

                    AllowedScopes = 
                    { 
                        "projects"
                    }
                }
            };
        }

    }
}
