import { ZodError } from "zod";
import { HTTPSTATUS } from "../config/https.config.js";
import { ErrorCodeEnum } from "../enums/errorCode.enum.js";
import { AppError } from "../utils/appError.js";

const formatZodError = (res, error) => {
  const errors = error?.issues?.map((error) => ({
    fields: error.path.join("."),
    message: error.message,
  }));
  return res.status(HTTPSTATUS.BAD_REQUEST).json({
    message: "Validation failed",
    errors,
    errorCode: ErrorCodeEnum.VALIDATION_ERROR,
  });
};

const ErrorHandler = (error, req, res, next) => {
  console.log(`Error occurred at path ${req.path}:`, error);

  if (error instanceof SyntaxError) {
    return res.status(HTTPSTATUS.BAD_REQUEST).json({
      message: "Invalid JSON",
      error: error.message || "Unknown error occurred",
    });
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
      errorCode: error.errorCode,
    });
  }

  if (error instanceof ZodError) {
    return formatZodError(res, error);
  }

  res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
    message: "Something went wrong",
    error: error.message || "Unknown error occurred",
  });
};

export default ErrorHandler;
