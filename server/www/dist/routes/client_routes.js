"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("../contrller/client");
var express = require("express");
var router = express.Router();
//   "/" api generally shows that the server is on
router.get("/", client_1.home);
//  "/data" Api will Get all data from the database
router.get("/data", client_1.getData);
//  "/update" will update the image and count in database
router.post("/update", client_1.update);
exports.default = router;
