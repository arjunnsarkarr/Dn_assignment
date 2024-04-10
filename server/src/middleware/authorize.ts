import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import logger from "../utils/loggerUtils";

dotenv.config();

export const authorize = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authToken = req.headers.authorization as string;
    const token = authToken?.split(" ")[1]
      ? ( authToken?.split(" ")[1] ) : ( authToken?.split(" ")[0] );

    if (!token || token !== process.env.AUTH_TOKEN) {
      return res.status(401).json({ status: 401, message: "Not Authorize" });
    }
    next();
  } catch (error) {
    res.status(500);
    error instanceof Error
      ? logger.error(error.message, { stack: error.stack })
      : logger.error(error);
  }
};

