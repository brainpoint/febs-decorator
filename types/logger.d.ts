
/**
 * logger interface.
 */
export interface Logger {
  info(...msg:any[]): any
}

/**
 * Rest log level.
 */
export enum RestLogLevel {
  /** no logging */
  NONE = 'NONE',
  /** Log only the request method and URL and the response status code and execution time. */
  BASIC = 'BASIC',
  /** Log the basic information along with request and response headers */
  HEADERS = 'HEADERS',
  /** Log the headers, body, and metadata for both requests and responses */
  FULL = 'FULL',
}

/**
* @desc 设置日志对象.
*/
export function setLogger(logger: Logger): any;