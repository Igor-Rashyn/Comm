FROM mcr.microsoft.com/dotnet/core/aspnet:2.2-stretch-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:2.2-stretch AS build
WORKDIR /src
COPY ["apps/api/Identity/Identity.API/Identity.API.csproj", "apps/api/Identity/Identity.API/"]
RUN dotnet restore "apps/api/Identity/Identity.API/Identity.API.csproj"
COPY . .
WORKDIR "/src/apps/api/Identity/Identity.API"
RUN dotnet build "Identity.API.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "Identity.API.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "Identity.API.dll"]