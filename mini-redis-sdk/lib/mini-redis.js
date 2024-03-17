import axios from "axios";
import resp from "./resp.js";

class MiniRedis {
  constructor(config) {
    const host = config.host || "0.0.0.0";
    const port = config.port || 8080;
    this.hostname = `${host}:${port}`;
    this.baseUrl = `http://${this.hostname}`;
  }
  async connect() {
    try {
      const url = `${this.baseUrl}/ping`;
      const response = await axios.get(url);
      if (response.data != resp.serialize("PONG")) {
        throw new Error(response.data);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async ping() {
    try {
      const url = `${this.baseUrl}/ping`;
      const response = await axios.get(url);
      return resp.deserialize(response.data);
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async get(key) {
    if (!key) {
      throw new Error(`(error) ERR missing argument 'key'`);
    }
    try {
      const url = `${this.baseUrl}/get?key=${encodeURIComponent(resp.serialize(key))}`;
      const response = await axios.get(url);
      return resp.deserialize(response.data) || "(nil)";
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async set(key, value) {
    if (!key) {
      throw new Error(`(error) ERR missing argument 'key'`);
    }
    if (!value) {
      throw new Error(`(error) ERR missing argument 'value'`);
    }
    try {
      const url = `${this.baseUrl}/set`;
      const payload = `key=${encodeURIComponent(resp.serialize(key))}&value=${encodeURIComponent(resp.serialize(value))}`;
      const response = await axios.post(url, payload);
      return resp.deserialize(response.data);
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async del(key) {
    if (!key) {
      throw new Error(`(error) ERR missing argument 'key'`);
    }
    try {
      const url = `${this.baseUrl}/del?key=${encodeURIComponent(resp.serialize(key))}`;
      const response = await axios.delete(url);
      const result = resp.deserialize(response.data);
      return Number.isInteger(result) ? `(integer) ${result}` : result;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default {
  createClient: (config) => new MiniRedis(config),
};
