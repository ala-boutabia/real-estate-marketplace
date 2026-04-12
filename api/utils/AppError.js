class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; // distinguishes your errors from unexpected crashes
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;