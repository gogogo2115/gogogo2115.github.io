const isEmpty = (value: unknown) => {
  if (value === null || value === undefined) return true;

  switch (typeof value) {
    case "string":
      return (value as string).length === 0;
    case "boolean":
      return false;
    case "number":
      return Number.isNaN(value);
    case "object":
      if (Array.isArray(value)) return value.length === 0;
      if (value instanceof Date) return isNaN(value.getTime());
      if (value instanceof Map || value instanceof Set) return value.size === 0;
      if (typeof Buffer !== "undefined" && Buffer.isBuffer(value)) return value.length === 0;
      if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView(value)) return (value as ArrayBufferView).byteLength === 0;
      if (value instanceof WeakMap || value instanceof WeakSet) return false; // WeakMap과 WeakSet은 크기를 알 수 없으므로 빈 것으로 간주할 수 없음

      return Object.keys(value as Record<string, unknown>).length === 0;
    default:
      return true;
  }
};

export default isEmpty;
