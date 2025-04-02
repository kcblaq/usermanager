import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/apiError";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  if (err.name === "ZodError") {
    statusCode = 400;
    message = "Validation Error";
    return res.status(statusCode).json({ message, errors: err.format() });
  }


  if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Mongoose Validation Error";
    return res.status(statusCode).json({ message, errors: err.errors });
  }

  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  }

  res.status(statusCode).json({ message, errors: err.errors || null });
};

export default errorHandler;
