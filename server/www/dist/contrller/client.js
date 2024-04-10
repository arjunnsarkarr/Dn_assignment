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
const home = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send({ message: "hey hello" });
    }
    catch (error) {
        res.status(500);
        error instanceof Error
            ? loggerUtils_1.default.error(error.message, { stack: error.stack })
            : loggerUtils_1.default.error(error);
    }
});
exports.home = home;
const getData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield databaseSchema_1.default.find({});
        res.send({ message: "hey hello", data: result });
    }
    catch (error) {
        res.status(500);
        error instanceof Error
            ? loggerUtils_1.default.error(error.message, { stack: error.stack })
            : loggerUtils_1.default.error(error);
    }
});
exports.getData = getData;
const update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let count = yield databaseSchema_1.default.findOne({ box: req === null || req === void 0 ? void 0 : req.body.box });
        const newCount = Number(count === null || count === void 0 ? void 0 : count.count) + 1;
        const indexx = yield databaseSchema_1.default.findOneAndUpdate({ box: req === null || req === void 0 ? void 0 : req.body.box }, { $set: { img_url: req.body.url, count: newCount } });
        res.json({ message: "url & count updated" });
    }
    catch (error) {
        res.status(500);
        error instanceof Error
            ? loggerUtils_1.default.error(error.message, { stack: error.stack })
            : loggerUtils_1.default.error(error);
    }
});
exports.update = update;
