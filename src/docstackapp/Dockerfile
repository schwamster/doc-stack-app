FROM microsoft/dotnet:latest

RUN mkdir app

COPY project.json /app

WORKDIR /app
RUN ["dotnet", "restore"]

COPY . /app
WORKDIR /app/src/ocr_service.webapi
RUN ["dotnet", "build"]

WORKDIR /app
ENTRYPOINT ["bash", "./entrypoint.sh"]