FROM mcr.microsoft.com/dotnet/core/aspnet:2.2-stretch-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:2.2-stretch AS build
WORKDIR /src
COPY ["apps/api/Note/Note.API/Note.API.csproj", "apps/api/Note/Note.API/"]
RUN dotnet restore "apps/api/Note/Note.API/Note.API.csproj"
COPY . .
WORKDIR "/src/apps/api/Note/Note.API"
RUN dotnet build "Note.API.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "Note.API.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "Note.API.dll"]