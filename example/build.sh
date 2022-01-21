#!/bin/bash

npm run build

zip -r mta-fissoin-onion.zip example lib package.json

fission fn delete --name hi
fission fn delete --name helloworld
fission fn delete --name inject-middlewares
fission fn delete --name say-hello
fission fn delete --name create-account

fission pkg delete --name mta-fission-onion

fission pkg create --src mta-fissoin-onion.zip --env nodejs --name mta-fission-onion

fission fn create --name hi --pkg mta-fission-onion --env nodejs --entrypoint "example/hi"
fission fn create --name helloworld --pkg mta-fission-onion --env nodejs --entrypoint "example/helloworld"
fission fn create --name inject-middlewares --pkg mta-fission-onion --env nodejs --entrypoint "example/inject-middlewares"
fission fn create --name say-hello --pkg mta-fission-onion --env nodejs --entrypoint "example/say-hello"
fission fn create --name create-account --pkg mta-fission-onion --env nodejs --entrypoint "example/create-account"

sleep 60

fission fn test --name hi
fission fn test --name helloworld
fission fn test --name inject-middlewares --query name=onion
fission fn test --name say-hello --query name=onion
fission fn test --name create-account --method POST --header "content-type: application/json" --body '{"username": "onion", "email": "onion@nayotta.com", "nickname": "onion"}'