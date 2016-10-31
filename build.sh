#!bin/bash
set -e
apt-get update
apt-get install -y build-essential chrpath libssl-dev libxft-dev
dotnet restore
rm -rf $(pwd)/publish/web
dotnet publish src/docstackapp/project.json -c release -o $(pwd)/publish/web