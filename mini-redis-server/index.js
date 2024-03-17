import express from "express";
import bodyParser from "body-parser";
import minimist from "minimist";
import { resp } from "mini-redis-sdk";

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
    res.send(resp.serialize("PONG"));
  });

  app.get("/get", async (req, res) => {
    console.log(`${timestamp()} GET ${req.query.key}`);
    try {
      if (!req.query.key) {
        throw new Error("parameter 'key' is missing");
      }
      const key = resp.deserialize(req.query.key);
      const value = storage[key] || null;
      res.send(resp.serialize(value));
    } catch (err) {
      console.log(err.message);
      res.status(400).send(resp.error(err));
    }
  });

  app.post("/set", async (req, res) => {
    console.log(`${timestamp()} SET ${req.body.key}=${req.body.value}`);
    try {
      if (!req.body.key) {
        throw new Error("parameter 'key' is missing");
      }
      const key = resp.deserialize(req.body.key);
      if (!req.body.value) {
        throw new Error("parameter 'value' is missing");
      }
      const value = resp.deserialize(req.body.value);
      storage[key] = value || null;
      res.send(resp.serialize("Ok"));
    } catch (err) {
      console.log(err.message);
      res.status(400).send(resp.error(err));
    }
  });

  app.delete("/del", async (req, res) => {
    console.log(`${timestamp()} DEL ${req.query.key}`);
    try {
      if (!req.query.key) {
        throw new Error("parameter 'key' is missing");
      }
      const key = resp.deserialize(req.query.key);
      delete storage[key];
      res.send(resp.serialize(1));
    } catch (err) {
      console.log(err.message);
      res.status(400).send(resp.error(err));
    }
  });

  app.listen(port, host, () => {
    console.log(`Server is running at ${host}:${port}`);
  });
}
