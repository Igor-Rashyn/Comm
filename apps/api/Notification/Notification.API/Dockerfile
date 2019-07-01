FROM mcr.microsoft.com/dotnet/core/aspnet:2.2-stretch-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:2.2-stretch AS build
WORKDIR /src
COPY ["apps/api/Notification/Notification.API/Notification.API.csproj", "apps/api/Notification/Notification.API/"]
RUN dotnet restore "apps/api/Notification/Notification.API/Notification.API.csproj"
COPY . .
WORKDIR "/src/apps/api/Notification/Notification.API"
RUN dotnet build "Notification.API.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "Notification.API.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "Notification.API.dll"]