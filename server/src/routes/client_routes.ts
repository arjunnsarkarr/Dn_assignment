import { getData, home, update } from "../contrller/client";

var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", home);

router.get("/data", getData);

router.post("/update", update);

export default router;
