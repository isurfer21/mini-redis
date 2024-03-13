# Mini Redis Client

Mini Redis Client that is designed specifically to communicate with Mini Redis Server in interactive mode.

## Prerequisite

The system should have [Node.js](https://nodejs.org/) installed.

## Setup

To resolve all the dependencies, run this command

```sh
npm install
```

## Execute

To start the client with default settings, run this command

```sh
npm start
```

With custom setting, run this command

```sh
npm start -- -h localhost -p 8000
```

## Usage

Here is a sample instructions which can be fed interactively

```sh
> PING
PONG
> SET foo bar
Ok
> GET foo
bar
> DEL foo
(integer) 1
```
