declare module 'querystring' {
  /**
   * Parse a query string into an object.
   * Leading ? or # are ignored, so you can pass location.search or location.hash directly.
   * @param str
   */
  export function parse(str: string): any;

  /**
   * Stringify an object into a query string, sorting the keys.
   *
   * @param obj
   * @param options
   */
  export function stringify(obj: any, options?: { strict: boolean }): string;

  /**
   * Extract a query string from a URL that can be passed into .parse().
   *
   * @param str
   */
  export function extract(str: string): string;
}
