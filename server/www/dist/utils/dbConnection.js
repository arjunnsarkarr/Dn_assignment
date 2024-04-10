"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const loggerUtils_1 = __importDefault(require("./loggerUtils"));
var mongoose = require("mongoose");
var dotenv = require("dotenv");
dotenv.config();
const mongo_url = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/dataneuronn";
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        mongoose.set("strictQuery", true);
        yield mongoose.connect(mongo_url);
        loggerUtils_1.default.info("Mongo Connected");
    }
    catch (e) {
        console.error("Error on connceting Mongo", e);
        e instanceof Error
            ? loggerUtils_1.default.error(e.message, { stack: e.stack })
            : loggerUtils_1.default.error(`Error on connecting Mongo : ${e}`);
    }
});
exports.default = connectDB;
