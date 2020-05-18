FROM mcr.microsoft.com/dotnet/core/aspnet:3.0-buster-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.0-buster AS build
WORKDIR /src
COPY ["src/api/Project/Project.API_new/Project.API_new.csproj", "src/api/Project/Project.API_new/"]
RUN dotnet restore "src/api/Project/Project.API_new/Project.API_new.csproj"
COPY . .
WORKDIR "/src/src/api/Project/Project.API_new"
RUN dotnet build "Project.API_new.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Project.API_new.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Project.API_new.dll"]