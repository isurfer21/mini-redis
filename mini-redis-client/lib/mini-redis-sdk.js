import axios from "axios";

class MiniRedis {
  constructor(config) {
    const host = config.host || "0.0.0.0";
    const port = config.port || 8080;
    this.hostname = `${host}:${port}`;
    this.baseUrl = `http://${this.hostname}`;
  }
  async connect() {
    try {
      const response = await axios.get(`${this.baseUrl}/ping`);
      if (response.data != "PONG") {
        throw new Error(response.data);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async ping() {
    try {
      const response = await axios.get(`${this.baseUrl}/ping`);
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async get(key) {
    if (!key) {
      throw new Error(`(error) ERR missing argument 'key'`);
    }
    try {
      const response = await axios.get(`${this.baseUrl}/get/${key}`);
      return response.data;
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
      const response = await axios.post(
        `${this.baseUrl}/set/${key}`,
        `value=${JSON.stringify(value)}`,
      );
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async del(key) {
    if (!key) {
      throw new Error(`(error) ERR missing argument 'key'`);
    }
    try {
      const response = await axios.delete(`${this.baseUrl}/del/${key}`);
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default {
  createClient: (config) => new MiniRedis(config),
};
