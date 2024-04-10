"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("../contrller/client");
var express = require("express");
var router = express.Router();
/* GET home page. */
router.get("/", client_1.home);
router.get("/data", client_1.getData);
router.post("/update", client_1.update);
exports.default = router;
