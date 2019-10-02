FROM mcr.microsoft.com/dotnet/core/aspnet:2.2-stretch-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:2.2-stretch AS build
WORKDIR /src
COPY ["apps/api/Task/Task.API/Task.API.csproj", "apps/api/Task/Task.API/"]
RUN dotnet restore "apps/api/Task/Task.API/Task.API.csproj"
COPY . .
WORKDIR "/src/apps/api/Task/Task.API"
RUN dotnet build "Task.API.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "Task.API.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "Task.API.dll"]