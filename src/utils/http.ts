/**
 * Hypertext Transfer Protocol (HTTP) response status codes.
 *
 * @see {@link https://en.wikipedia.org/wiki/List_of_HTTP_status_codes}
 */

export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  NOT_MODIFIED = 304,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  NOT_ACCEPTABLE = 406,
  INTERNAL_SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
}

export enum HttpMethods {
  GET = "GET",
  PUT = "PUT",
  POST = "POST",
  DELETE = "DELETE",
  OPTIONS = "OPTIONS",
  PATCH = "PATCH",
}

export class BadRequestException extends Error {
  public readonly statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = HttpStatusCode.BAD_REQUEST;
  }
}

export class UnauthorizedException extends Error {
  public readonly statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = HttpStatusCode.UNAUTHORIZED;
  }
}

export class MethodNotAllowedException extends Error {
  public readonly statusCode: number;
  constructor(received: string, expected: HttpMethods) {
    super(
      `This route only accepts the ${expected} method, you tried: ${received}`
    );
    this.statusCode = HttpStatusCode.NOT_ACCEPTABLE;
  }
}

export class InternalServerErrorException extends Error {
  constructor() {
    super("Internal Server Error");
  }
}
