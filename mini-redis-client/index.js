import minimist from "minimist";
import readline from "readline";
import miniRedis from "./lib/mini-redis-sdk.js";

const argv = minimist(process.argv.slice(2));

if (!!argv.help) {
  console.log(`Mini Redis Client

Syntax:
  npm start -- -h <address> -p <port>

Options:
  -h --host    Provide the host IP address
  -p --port    Provide the port number
     --help    Display help menu
    `);
} else {
  const host = argv.h || argv.host;
  const port = argv.p || argv.port;

  const client = miniRedis.createClient({
    host: host,
    port: port,
  });

  try {
    await client.connect();
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }

  const baseAddress = client.hostname;
  const breakpoint = /("[^"]*"|'[^']*'|\S+)/g;

  const prompt = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const prompter = () => {
    prompt.question(`${baseAddress}> `, async (answer) => {
      const args = answer
        .split(breakpoint)
        .filter((item) => item != "" && item != " ");
      const command = args.shift();
      switch (command.toUpperCase()) {
        case "PING":
          if (args.length != 0) {
            console.log(
              `(error) ERR wrong number of arguments for 'ping' command`,
            );
            break;
          }
          try {
            const response = await client.ping();
            console.log(response);
          } catch (error) {
            console.error(error.message);
          }
          break;
        case "GET":
          if (args.length != 1) {
            console.log(
              `(error) ERR wrong number of arguments for 'get' command`,
            );
            break;
          }
          try {
            const key = args.shift();
            const response = await client.get(key);
            console.log(response);
          } catch (error) {
            console.error(error.message);
          }
          break;
        case "SET":
          if (args.length != 2) {
            console.log(
              `(error) ERR wrong number of arguments for 'set' command`,
            );
            break;
          }
          try {
            const key = args.shift();
            const value = args.shift();
            const response = await client.set(key, value);
            console.log(response);
          } catch (error) {
            console.error(error.message);
          }
          break;
        case "DEL":
          if (args.length != 1) {
            console.log(
              `(error) ERR wrong number of arguments for 'del' command`,
            );
            break;
          }
          try {
            const key = args.shift();
            const response = await client.del(key);
            console.log(response);
          } catch (error) {
            console.error(error.message);
          }
          break;
        default:
          console.log(`The '${command}' command is not available`);
      }
      // prompt.close();
      prompter();
    });
  };
  prompter();
}
