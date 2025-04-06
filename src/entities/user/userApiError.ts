export class UserApiError extends Error {
  statusCode?: number;
  details?: string;

  constructor(message: string, statusCode?: number, details?: string) {
    super(message);
    this.name = "UserApiError";
    this.statusCode = statusCode;
    this.details = details;
    Object.setPrototypeOf(this, UserApiError.prototype);
  }
}
