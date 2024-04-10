import dotenv from "dotenv";
import { Response, Request, NextFunction } from "express";
import logger from "../utils/loggerUtils";
import Data from "../model/databaseSchema";
dotenv.config();

export const home = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send({ message: "hey hello" });
  } catch (error) {
    res.status(500);
    error instanceof Error
      ? logger.error(error.message, { stack: error.stack })
      : logger.error(error);
  }
};

export const getData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await Data.find({});
    res.send({ message: "hey hello", data: result });
  } catch (error) {
    res.status(500);
    error instanceof Error
      ? logger.error(error.message, { stack: error.stack })
      : logger.error(error);
  }
};
export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let count = await Data.findOne({ box: req?.body.box });
    const newCount = Number(count?.count) + 1;
    const indexx = await Data.findOneAndUpdate(
      { box: req?.body.box },
      { $set: { img_url: req.body.url, count: newCount } }
    );

    res.json({ message: "url & count updated" });
  } catch (error) {
    res.status(500);
    error instanceof Error
      ? logger.error(error.message, { stack: error.stack })
      : logger.error(error);
  }
};
