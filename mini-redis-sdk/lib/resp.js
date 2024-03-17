export default class RESP {
  static serialize(data) {
    if (typeof data === "string") {
      if (data.length <= 5) {
        // Simple string
        return `+${data}\\r\\n`;
      } else {
        // Bulk string
        return `$${data.length}\\r\\n${data}\\r\\n`;
      }
    } else if (typeof data === "number") {
      // Integer
      return `:${data}\\r\\n`;
    } else if (Array.isArray(data)) {
      // Array (commands)
      const serializedCommands = data
        .map((arg) => this.serialize(arg))
        .join("\\r\\n");
      return `*${data.length}\\r\\n${serializedCommands}\\r\\n`;
    } else if (data === null) {
      // Null
      return "_\\r\\n";
    } else if (typeof data === "boolean") {
      // Boolean
      return `#${data ? "t" : "f"}\\r\\n`;
    } else if (typeof data === "bigint") {
      // Big number
      return `(${data.toString()}\\r\\n`;
    } else if (typeof data === "object") {
      // Handle maps (objects) and sets
      if (data instanceof Map) {
        const serializedPairs = [...data.entries()]
          .map(([key, value]) => {
            return this.serialize(key) + this.serialize(value);
          })
          .join("");
        return `%${serializedPairs}\\r\\n`;
      } else if (data instanceof Set) {
        const serializedValues = [...data]
          .map((value) => this.serialize(value))
          .join("");
        return `~${serializedValues}\\r\\n`;
      }
    } else {
      throw new Error("Unsupported data type for serialization");
    }
  }

  static deserialize(data) {
    if (data.startsWith(":")) {
      // Integer
      return parseInt(data.substring(1), 10);
    } else if (data.startsWith("+")) {
      // Simple string
      return data.substring(1, data.length - 4);
    } else if (data.startsWith("$")) {
      // Bulk string
      const payload = data.slice(1, -4);
      const divider = payload.indexOf("\\r\\n");
      const dataLen = Number(payload.slice(0, divider));
      return payload.slice(-dataLen);
    } else if (data.startsWith("_")) {
      // Null
      return null;
    } else if (data.startsWith("#")) {
      // Boolean
      return data[1] === "t";
    } else if (data.startsWith("(")) {
      // Big number
      return BigInt(data.substring(1, data.length - 4));
    } else if (data.startsWith("*")) {
      // TODO: Handle arrays (commands)
    } else if (data.startsWith("%")) {
      // TODO: Handle maps (objects)
    } else if (data.startsWith("~")) {
      // TODO: Handle sets
    } else {
      throw new Error("Unsupported RESP format for deserialization");
    }
  }

  static error(message) {
    return `-${message}\\r\\n`;
  }
}
