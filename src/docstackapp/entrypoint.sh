#!/bin/bash

if [ "$#" -eq 0 ]
then
    echo "no args provided -> args: run -s <your_computer_vision_msft_cognitive_services_subscription> -p /app/test/ocr_service.Tests/testdata/ocr-test2.png"
    #bash
elif [[ $# == 1 && "$1" == "test" ]]
then
    echo "test"
    dotnet test
elif [[ $# == 1 && "$1" == "host" ]]
then
    echo "host"
    dotnet run
else
    echo "unknown arg $@"
fi