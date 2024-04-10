"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const dataSchema = new mongoose_1.Schema({
    box: {
        type: String,
    },
    img_url: {
        type: String,
    },
    count: {
        type: String,
    },
});
const Data = (0, mongoose_1.model)("data", dataSchema);
exports.default = Data;
