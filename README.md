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

## Demo snapshots

Mini-redis server interaction with CLI client

![mini-redis server interaction with client](./demo/mini-redis-client-server.png)

Mini-redis server interaction using `curl` command

![mini-redis server interaction using curl](./demo/mini-redis-curl-server.png)
