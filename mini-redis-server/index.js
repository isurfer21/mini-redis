import express from "express";
import bodyParser from "body-parser";
import minimist from "minimist";

const argv = minimist(process.argv.slice(2));
const storage = {};

const timestamp = () => {
  const date = new Date();
  return date.toISOString();
};

if (!!argv.help) {
  console.log(`Mini Redis Server

Syntax:
  npm start -- -h <address> -p <port>

Options:
  -h --host    Provide the host IP address
  -p --port    Provide the port numbernumber
     --help    Display help menu
    `);
} else {
  const host = argv.h || argv.host || "0.0.0.0";
  const port = argv.p || argv.port || 8080;

  const app = express();
  app.use(bodyParser.urlencoded({ extended: true }));

  app.get("/ping", async (req, res) => {
    console.log(`${timestamp()} PING`);
    res.send("PONG");
  });

  app.get("/get/:key", async (req, res) => {
    console.log(`${timestamp()} GET ${req.params.key}`);
    const value = storage[req.params.key] || "(nil)";
    res.send(value);
  });

  app.post("/set/:key", async (req, res) => {
    console.log(`${timestamp()} SET ${req.params.key}=${req.body.value}`);
    storage[req.params.key] = req.body.value;
    res.send("Ok");
  });

  app.delete("/del/:key", async (req, res) => {
    console.log(`${timestamp()} DEL ${req.params.key}`);
    delete storage[req.params.key];
    res.send("(integer) 1");
  });

  app.listen(port, host, () => {
    console.log(`Server is running at ${host}:${port}`);
  });
}
