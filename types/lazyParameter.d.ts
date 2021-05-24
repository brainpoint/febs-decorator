// Type definitions for febs-decorator

/**
 * 定义延迟参数.
 */
export type LazyParameter<T> = T | (() => T);
export type StringLazyParameter = LazyParameter<string>;