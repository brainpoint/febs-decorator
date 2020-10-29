// Type definitions for febs-decorator

/// <reference types="node" />


export interface RestRequest {
  /**
   * Return request header
   */
  headers: any;
  /**
   * Get/Set request URL.
   */
  url: string;
  /**
   * Get origin of URL.
   */
  origin: string;
  /**
   * Get/Set request method.
   */
  method: string;
  /**
   * Parse the "Host" header field host
   * and support X-Forwarded-Host when a
   * proxy is enabled.
   */
  host: string;
  /**
   * Return the protocol string "http" or "https"
   * when requested with TLS. When the proxy setting
   * is enabled the "X-Forwarded-Proto" header
   * field will be trusted. If you're running behind
   * a reverse proxy that supplies https for you this
   * may be enabled.
   */
  protocol: string;
  /**
   * Request remote address. Supports X-Forwarded-For when app.proxy is true.
   */
  ip: string;
  /**
   * Request body.
   */
  body: any;
}


export interface RestResponse {
  /**
   * set response header
   */
  setHeader(field: string, val: string | string[]): void;
  /**
   * remove response header
   */
  removeHeader(field: string): void;
  /**
   * append response header
   */
  appendHeader(field: string, val: string | string[]): void;
  /**
   * Get/Set response status code.
   */
  status: number;

  /**
   * Get response status message
   */
  message: string;
  /**
   * Request body.
   */
  body: any;
}