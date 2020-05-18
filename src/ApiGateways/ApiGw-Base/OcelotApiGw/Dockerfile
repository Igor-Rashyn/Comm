FROM mcr.microsoft.com/dotnet/core/aspnet:3.0-buster-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.0-buster AS build
WORKDIR /src
COPY ["apps/ApiGateways/ApiGw-Base/OcelotApiGw/OcelotApiGw.csproj", "apps/ApiGateways/ApiGw-Base/OcelotApiGw/"]
RUN dotnet restore "apps/ApiGateways/ApiGw-Base/OcelotApiGw/OcelotApiGw.csproj"
COPY . .
WORKDIR "/src/apps/ApiGateways/ApiGw-Base/OcelotApiGw"
RUN dotnet build "OcelotApiGw.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "OcelotApiGw.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "OcelotApiGw.dll"]