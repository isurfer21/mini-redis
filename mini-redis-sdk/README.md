# mini-redis-sdk

The purpose of the _Mini Redis SDK_ is to provide a Redis-like interface for server interaction.

This document provides comprehensive instructions for setting up and using the `mini-redis-sdk` to interact with a server using a Redis-like interface.

## Prerequisites

- **Node.js:** Ensure you have Node.js installed on your system. Download and install the latest version from the official website: [https://nodejs.org/en](https://nodejs.org/en).

## Installation

**1. Clone or Download the Repository:**

Obtain the `mini-redis` codebase. You can either clone the repository using Git or download the ZIP file.

**2. Install Dependencies:**

Navigate to the project directory in your terminal and run the following command to install all the required dependencies:

```sh
npm install
```

**3. Link the Module (Optional):**

This step allows using `mini-redis-sdk` as a module in other projects within your workspace. Run the following command in the project directory:

```sh
npm link
```

## Usage

### 1. Import the Module:

Start by importing the `miniredis` module in your JavaScript file:

```javascript
import miniredis from "mini-redis-sdk";
```

### 2. Create a Client:

Instantiate a client object to interact with the server. Provide configuration options as an object during creation:

```javascript
const client = miniredis.createClient({
  host: "localhost", // Server hostname (default: "localhost")
  port: 8080, // Server port (default: 6379 for Redis)
});
```

**Configuration Options:**

- `host`: The hostname or IP address of the server you want to connect to. Defaults to "localhost".
- `port`: The port on which the server listens for connections. Defaults to 6379 (standard Redis port). You might need to adjust this based on your server configuration.

### 3. Connect to the Server:

Establish a connection with the server using the `connect` method. This method is asynchronous, so use `async/await` or `.then/.catch` for handling the connection result:

```javascript
try {
  await client.connect();
  console.log("Connected to server successfully!");
} catch (error) {
  console.error("Connection failed:", error.message);
  process.exit(1); // Exit the process on connection error
}
```

### 4. Available Methods:

Once connected, you can use the following methods to interact with the server:

**a) Ping:**

Checks if the server is alive and responsive.

```javascript
try {
  const response = await client.ping();
  console.log(response); // Usually returns "PONG" on success
} catch (error) {
  console.error("Ping failed:", error.message);
}
```

**b) Get:**

Retrieves the value associated with a specific key from the server.

```javascript
try {
  const response = await client.get("key");
  console.log(response); // The retrieved value or null if not found
} catch (error) {
  console.error("Get operation failed:", error.message);
}
```

**c) Set:**

Inserts a new key-value pair or updates an existing one.

```javascript
try {
  const response = await client.set("key", "value");
  console.log(response); // Usually returns "OK" on success
} catch (error) {
  console.error("Set operation failed:", error.message);
}
```

**d) Del:**

Deletes a key and its associated value from the server.

```javascript
try {
  const response = await client.del("key");
  console.log(response); // Usually returns 1 if deleted, 0 if not found
} catch (error) {
  console.error("Del operation failed:", error.message);
}
```

**Important Note:**

Remember to handle potential errors using `try/catch` blocks for all asynchronous operations.
