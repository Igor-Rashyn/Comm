namespace Auth.API.Services
{
    interface IRedirectService
    {
        string ExtractRedirectUriFromReturnUrl(string url);
    }
}
