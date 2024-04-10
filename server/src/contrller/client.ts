import dotenv from "dotenv";
import { Response, Request, NextFunction } from "express";
import logger from "../utils/loggerUtils";
import Data from "../model/databaseSchema";
dotenv.config();

//   home controller generally shows that the server is on
export const home = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // This variable is for  storing start time
    const start = Date.now();

    // Actual operstion  of getting data from DB starts here
    res.send({ message: "hey hello" });

    // This will calculate the execution time of the above operation
    res.on("finish", () => {
      const duration = Date.now() - start;
      console.log(
        `${req.method} ${req.originalUrl} - Execution time of home route: ${duration}ms`
      );
    });
  } catch (error) {
    res.status(500);
    error instanceof Error
      ? logger.error(error.message, { stack: error.stack })
      : logger.error(error);
  }
};

//  getData controller Get all data from the database
export const getData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // This variable is for  storing start time
    const start = Date.now();

    // Actual operstion  of getting data from DB starts here
    const result = await Data.find({});
    res.send({ message: "hey hello", data: result });

    // This will calculate the execution time of the above operation
    res.on("finish", () => {
      const duration = Date.now() - start;
      console.log(
        `${req.method} ${req.originalUrl} - Execution time of getData  route: ${duration}ms`
      );
    });
  } catch (error) {
    res.status(500);
    error instanceof Error
      ? logger.error(error.message, { stack: error.stack })
      : logger.error(error);
  }
};

//   update controller will chnage the image and count in database
export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // This variable is for  storing start time
    const start = Date.now();

    // Actual operstion  of updating data from DB starts here
    let count = await Data.findOne({ box: req?.body.box });
    const newCount = Number(count?.count) + 1;
    const indexx = await Data.findOneAndUpdate(
      { box: req?.body.box },
      { $set: { img_url: req.body.url, count: newCount } }
    );

    res.json({ message: "url & count updated" });
    // This will calculate the execution time of the above operation
    res.on("finish", () => {
      const duration = Date.now() - start;
      console.log(
        `${req.method} ${req.originalUrl} - Execution time of  update  route: ${duration}ms`
      );
    });
  } catch (error) {
    res.status(500);
    error instanceof Error
      ? logger.error(error.message, { stack: error.stack })
      : logger.error(error);
  }
};
