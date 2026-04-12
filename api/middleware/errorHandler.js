const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  // Only log unexpected crashes, not operational errors
  if (!err.isOperational) {
    console.error("Unexpected error:", err);
  }

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
};

export default errorHandler;
