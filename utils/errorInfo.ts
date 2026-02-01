type ErrorInfo = {
  type: string;
  name?: string;
  message?: string;
  cause?: unknown;
  code?: string | number;
  stack?: string;

  // non-standard (ex: Firefox)
  fileName?: string;
  lineNumber?: number;
  columnNumber?: number;
};

const hasProperty = <T extends string>(obj: unknown, prop: T): obj is { [K in T]: unknown } => {
  return typeof obj === "object" && obj !== null && prop in obj;
};

const getStr = (obj: unknown, key: string): string | undefined => {
  if (!hasProperty(obj, key)) return undefined;
  const v = obj[key];
  return typeof v === "string" ? v : undefined;
};

const getNum = (obj: unknown, key: string): number | undefined => {
  if (!hasProperty(obj, key)) return undefined;
  const v = obj[key];
  return typeof v === "number" && Number.isFinite(v) ? v : undefined;
};

const getStrOrNum = (obj: unknown, key: string): string | number | undefined => {
  return getStr(obj, key) ?? getNum(obj, key);
};

const getUnknown = (obj: unknown, key: string): unknown | undefined => {
  return hasProperty(obj, key) ? obj[key] : undefined;
};

export const errorInfo = (error: unknown): ErrorInfo => {
  if (error === null || typeof error !== "object") {
    return { type: typeof error, message: "", stack: String(error) };
  }

  const isDOMException = typeof DOMException !== "undefined" && error instanceof DOMException;
  const isError = error instanceof Error || ("isError" in Error && typeof Error.isError === "function" && Error.isError(error));

  const type = isDOMException ? "DOMException" : isError ? "Error" : "Object";
  const name = getStr(error, "name");
  const message = getStr(error, "message");
  const cause = getUnknown(error, "cause");
  const code = getStrOrNum(error, "code");
  const stack = getStr(error, "stack");

  // non-standard (ex: Firefox)
  const fileName = getStr(error, "fileName");
  const lineNumber = getNum(error, "lineNumber");
  const columnNumber = getNum(error, "columnNumber");

  const result: ErrorInfo = { type };
  if (name !== undefined) result.name = name;
  if (message !== undefined) result.message = message;
  if (stack !== undefined) result.stack = stack;
  if (cause !== undefined) result.cause = cause;
  if (code !== undefined) result.code = code;

  // non-standard (ex: Firefox)
  if (fileName !== undefined) result.fileName = fileName;
  if (lineNumber !== undefined) result.lineNumber = lineNumber;
  if (columnNumber !== undefined) result.columnNumber = columnNumber;

  return result;
};
