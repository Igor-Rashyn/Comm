FROM mcr.microsoft.com/dotnet/core/aspnet:3.0-buster-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.0-buster AS build
WORKDIR /src
COPY ["src/api/Comment/Comment.API/Comment.API.csproj", "src/api/Comment/Comment.API/"]
RUN dotnet restore "src/api/Comment/Comment.API/Comment.API.csproj"
COPY . .
WORKDIR "/src/src/api/Comment/Comment.API"
RUN dotnet build "Comment.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Comment.API.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Comment.API.dll"]