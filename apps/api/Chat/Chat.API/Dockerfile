FROM mcr.microsoft.com/dotnet/core/aspnet:2.2-stretch-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:2.2-stretch AS build
WORKDIR /src
COPY ["apps/api/Chat/Chat.API/Chat.API.csproj", "apps/api/Chat/Chat.API/"]
RUN dotnet restore "apps/api/Chat/Chat.API/Chat.API.csproj"
COPY . .
WORKDIR "/src/apps/api/Chat/Chat.API"
RUN dotnet build "Chat.API.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "Chat.API.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "Chat.API.dll"]
