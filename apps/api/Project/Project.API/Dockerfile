FROM mcr.microsoft.com/dotnet/core/aspnet:2.2-stretch-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:2.2-stretch AS build
WORKDIR /src
COPY ["apps/api/Project/Project.API/Project.API.csproj", "apps/api/Project/Project.API/"]
RUN dotnet restore "apps/api/Project/Project.API/Project.API.csproj"
COPY . .
WORKDIR "/src/apps/api/Project/Project.API"
RUN dotnet build "Project.API.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "Project.API.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "Project.API.dll"]