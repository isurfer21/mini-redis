# Mini Redis Server

Mini Redis Server that is designed to be a lightweight in-memory key-value store server.

## Prerequisite

The system should have [Node.js](https://nodejs.org/) installed.

## Setup

To resolve all the dependencies, run this command

```sh
npm install
```

## Execute

To start the server with default settings, run this command

```sh
npm start
```

With custom setting, run this command

```sh
npm start -- -h localhost -p 8000
```

## Usage

Here is a sample API requests using `curl`

```sh
# PING
curl -X GET http://localhost:8080/ping

# SET foo 'bar'
curl -X POST -d 'value=bar' http://localhost:8080/set/foo

# GET foo
curl -X GET http://localhost:8080/get/foo

# DEL foo
curl -X GET http://localhost:8080/del/foo
```
