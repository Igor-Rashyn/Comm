FROM mcr.microsoft.com/dotnet/core/aspnet:2.2-stretch-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:2.2-stretch AS build
WORKDIR /src
COPY ["apps/api/Comment/Comment.API/Comment.API.csproj", "apps/api/Comment/Comment.API/"]
RUN dotnet restore "apps/api/Comment/Comment.API/Comment.API.csproj"
COPY . .
WORKDIR "/src/apps/api/Comment/Comment.API"
RUN dotnet build "Comment.API.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "Comment.API.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "Comment.API.dll"]