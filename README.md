# mini-redis

A lightweight in-memory data store server with a CLI client with interactive mode.

## Introduction

**Mini-redis server** is a lightweight in-memory key-value data store designed for **high-performance data access**.

### Key features

- **High Performance**:

  - **Fast Access**: Data retrieval and manipulation happen in constant time _O(1)_ regardless of data size, offering exceptional speed for frequent lookups.
  - **Low Latency**: Ideal for applications requiring rapid data access with minimal delay.

- **Versatility**:

  - **Beyond Key-Value Store**: Functions effectively as a cache, and session store, enhancing application performance and enabling communication between services.

- **In-Memory Storage**:

  - **Faster Operations**: Leverages RAM for significantly faster read/write speeds compared to traditional disk-based storage.

### Considerations

- **Data Volatility**: Data gets lost upon system restarts. Not suitable for persistent storage needs.
- **Limited Capacity**: Maximum storage is restricted by available RAM.

### Use Cases

- Caching frequently accessed data.
- Temporary data storage during application execution.
- Session management for web applications.

_For persistent storage or handling larger datasets, consider alternative solutions like disk-based key-value stores._

## Getting started

Follow these steps to use mini-redis:

- **Start the server**: Refer to the mini-redis server [README](./mini-redis-server/README.md) for detailed instructions.
- **Use the client**: Access the client instructions in the mini-redis client [README](./mini-redis-client/README.md).
- **Integrate with application**: Guide to integrate the mini-redis SDK [README](./mini-redis-sdk/README.md) with your application.

## Demo

After a short interaction, the client and server logs are shown here for demo purpose.

### Mini-redis server interaction with CLI client

Server logs

```console
mini-redis-server % npm start

> mini-redis-server@1.0.0 start
> node index.js

Server is running at 0.0.0.0:8080
2024-03-17T15:48:36.228Z PING
2024-03-17T15:48:45.775Z PING
2024-03-17T15:49:16.769Z GET +foo\r\n
2024-03-17T15:49:23.090Z SET +foo\r\n=$11\r\nhello world\r\n
2024-03-17T15:49:26.968Z GET +foo\r\n
2024-03-17T15:49:31.374Z DEL +foo\r\n
2024-03-17T15:49:35.827Z GET +foo\r\n
```

CLI client logs

```console
mini-redis-client % npm start

> mini-redis-client@1.0.0 start
> node index.js

0.0.0.0:8080> ping
PONG
0.0.0.0:8080> get foo
(nil)
0.0.0.0:8080> set foo "hello world"
Ok
0.0.0.0:8080> get foo
hello world
0.0.0.0:8080> del foo
(integer) 1
0.0.0.0:8080> get foo
(nil)
0.0.0.0:8080>
```

### Mini-redis server interaction using `curl` command

Server logs

```console
mini-redis-server % npm start

> mini-redis-server@1.0.0 start
> node index.js

Server is running at 0.0.0.0:8080
2024-03-17T16:22:52.539Z PING
2024-03-17T16:22:59.432Z GET +foo\r\n
2024-03-17T16:23:06.772Z SET +foo\r\n=$11\r\nhello world\r\n
2024-03-17T16:23:15.606Z GET +foo\r\n
2024-03-17T16:23:22.482Z DEL +foo\r\n
2024-03-17T16:23:25.873Z GET +foo\r\n
```

Client-side terminal logs

```console
% curl -X GET http://localhost:8080/ping
+PONG\r\n%

% curl -X GET "http://localhost:8080/get?key=%2Bfoo\r\n"
_\r\n%

% curl -X POST -d 'key=%2Bfoo\r\n&value=%2411\r\nhello%20world\r\n' http://localhost:8080/set
+Ok\r\n%

% curl -X GET "http://localhost:8080/get?key=%2Bfoo\r\n"
$11\r\nhello world\r\n%

% curl -X DELETE "http://localhost:8080/del?key=%2Bfoo\r\n"
:1\r\n%

% curl -X GET "http://localhost:8080/get?key=%2Bfoo\r\n"
_\r\n%

```
