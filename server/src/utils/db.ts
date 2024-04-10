import logger from "./loggerUtils";
var mongoose = require("mongoose");
var dotenv = require("dotenv");
dotenv.config();

const mongo_url: any =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/dataneuronn";

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(mongo_url);
    logger.info("Mongo Connected");
  } catch (e) {
    console.error("Error on connceting Mongo", e);
    e instanceof Error
      ? logger.error(e.message, { stack: e.stack })
      : logger.error(`Error on connecting Mongo : ${e}`);
  }
};

export default connectDB;
