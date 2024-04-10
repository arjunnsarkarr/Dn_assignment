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
exports.update = exports.getData = exports.home = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const loggerUtils_1 = __importDefault(require("../utils/loggerUtils"));
const databaseSchema_1 = __importDefault(require("../model/databaseSchema"));
dotenv_1.default.config();
//   home controller generally shows that the server is on
const home = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // This variable is for  storing start time
        const start = Date.now();
        // Actual operstion  of getting data from DB starts here
        res.send({ message: "hey hello" });
        // This will calculate the execution time of the above operation
        res.on("finish", () => {
            const duration = Date.now() - start;
            console.log(`${req.method} ${req.originalUrl} - Execution time of home route: ${duration}ms`);
        });
    }
    catch (error) {
        res.status(500);
        error instanceof Error
            ? loggerUtils_1.default.error(error.message, { stack: error.stack })
            : loggerUtils_1.default.error(error);
    }
});
exports.home = home;
//  getData controller Get all data from the database
const getData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // This variable is for  storing start time
        const start = Date.now();
        // Actual operstion  of getting data from DB starts here
        const result = yield databaseSchema_1.default.find({});
        res.send({ message: "hey hello", data: result });
        // This will calculate the execution time of the above operation
        res.on("finish", () => {
            const duration = Date.now() - start;
            console.log(`${req.method} ${req.originalUrl} - Execution time of getData  route: ${duration}ms`);
        });
    }
    catch (error) {
        res.status(500);
        error instanceof Error
            ? loggerUtils_1.default.error(error.message, { stack: error.stack })
            : loggerUtils_1.default.error(error);
    }
});
exports.getData = getData;
//   update controller will chnage the image and count in database
const update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // This variable is for  storing start time
        const start = Date.now();
        // Actual operstion  of updating data from DB starts here
        let count = yield databaseSchema_1.default.findOne({ box: req === null || req === void 0 ? void 0 : req.body.box });
        const newCount = Number(count === null || count === void 0 ? void 0 : count.count) + 1;
        const indexx = yield databaseSchema_1.default.findOneAndUpdate({ box: req === null || req === void 0 ? void 0 : req.body.box }, { $set: { img_url: req.body.url, count: newCount } });
        res.json({ message: "url & count updated" });
        // This will calculate the execution time of the above operation
        res.on("finish", () => {
            const duration = Date.now() - start;
            console.log(`${req.method} ${req.originalUrl} - Execution time of  update  route: ${duration}ms`);
        });
    }
    catch (error) {
        res.status(500);
        error instanceof Error
            ? loggerUtils_1.default.error(error.message, { stack: error.stack })
            : loggerUtils_1.default.error(error);
    }
});
exports.update = update;
