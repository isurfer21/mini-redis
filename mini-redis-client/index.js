import axios from "axios";
import minimist from "minimist";
import readline from "readline";

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
  const host = argv.h || argv.host || "0.0.0.0";
  const port = argv.p || argv.port || 8080;

  const baseAddress = `${host}:${port}`;
  const baseUrl = `http://${baseAddress}`;
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
              `(error) ERR wrong number of arguments for 'get' command`,
            );
            break;
          }
          try {
            const response = await axios.get(`${baseUrl}/ping`);
            console.log(response.data);
          } catch (error) {
            console.error("Error:", error);
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
            const response = await axios.get(`${baseUrl}/get/${key}`);
            console.log(response.data);
          } catch (error) {
            console.error("Error:", error);
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
            const response = await axios.post(
              `${baseUrl}/set/${key}`,
              `value=${JSON.stringify(value)}`,
            );
            console.log(response.data);
          } catch (error) {
            console.error("Error:", error);
          }
          break;
        case "DEL":
          if (args.length != 1) {
            console.log(
              `(error) ERR wrong number of arguments for 'get' command`,
            );
            break;
          }
          try {
            const key = args.shift();
            const response = await axios.get(`${baseUrl}/del/${key}`);
            console.log(response.data);
          } catch (error) {
            console.error("Error:", error);
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
