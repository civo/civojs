// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export default class CivoError extends Error {
  public static factory(type: ErrorType): CivoError {
    switch (type) {
      case ErrorType.INVALID_REQUEST:
        return new CivoInvalidRequestError();
      case ErrorType.AUTHENTICATION:
        return new CivoAuthenticationError();
      case ErrorType.API:
        return new CivoAPIError();
      case ErrorType.PERMISSION:
        return new CivoPermissionError();
      case ErrorType.CONNECTION:
        return new CivoConnectionError();
      case ErrorType.NOT_FOUND:
        return new CivoNotFoundError();
    }
  }
}

enum ErrorType {
  INVALID_REQUEST = 0,
  API = 1,
  AUTHENTICATION = 2,
  PERMISSION = 3,
  CONNECTION = 4,
  NOT_FOUND = 5,
}

/**
 * CivoInvalidRequestError is raised when a request as invalid parameters.
 */
export class CivoInvalidRequestError extends CivoError {}

/**
 * CivoAPIError is raised in case no other type cover the problem
 */
export class CivoAPIError extends CivoError {}

/**
 * CivoAuthenticationError is raised when invalid credentials is used to connect to Civo
 */
export class CivoAuthenticationError extends CivoError {}

/**
 * CivoPermissionError is raised when attempting to access a resource without permissions
 */
export class CivoPermissionError extends CivoError {}

/**
 * CivoConnectionError is raised when the Civo servers can't be reached.
 */
export class CivoConnectionError extends CivoError {}

/**
 * CivoNotFoundError is raised when a resource is not found
 */
export class CivoNotFoundError extends CivoError {}
