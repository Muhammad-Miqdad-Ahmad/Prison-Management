// HttpStatusCodes.js

const HttpStatusCodes = Object.freeze({
  // 200 - Success
  OK: 200, // Successful request.

  // 201 - Created
  CREATED: 201, // Resource created successfully (useful for POST requests).

  // 204 - No Content
  NO_CONTENT: 204, // Successful request but no content to return.

  // 400 - Bad Request
  BAD_REQUEST: 400, // Request has missing or invalid parameters.

  // 401 - Unauthorized
  UNAUTHORIZED: 401,
  // Used when credentials are incorrect, e.g., incorrect password.

  // 403 - Forbidden
  FORBIDDEN: 403,
  // User doesn't have permission to access this resource, even if authenticated.

  // 404 - Not Found
  NOT_FOUND: 404,
  // Resource not found, e.g., user not found in the database.

  // 409 - Conflict
  CONFLICT: 409,
  // Conflict with the current state of the resource, e.g., email already exists during registration.

  // 500 - Internal Server Error
  INTERNAL_SERVER_ERROR: 500,
  // Server error for unexpected issues.

  // 503 - Service Unavailable
  SERVICE_UNAVAILABLE: 503,
  // Server temporarily unable to handle the request.
});

module.exports = HttpStatusCodes;
