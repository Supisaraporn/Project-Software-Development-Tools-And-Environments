// Config

const express = require("express");
const router = express.Router();
const { body, query, param } = require("express-validator");
const apiValidation = require("../validation/apiValidation");

// Import Controller

const {
    getAllHistoryController,
    addHistoryController,
    getAllUserHistoryController,
} = require("../controller/reward-history-controller");
const verifyToken = require("../validation/verifyToken");

// Create Routes

router.post("/add", [body("user_id").notEmpty(), body("reward_id").notEmpty(), body("time_exchange").notEmpty(), apiValidation, verifyToken, addHistoryController]);

router.get("/get/user/all", apiValidation, verifyToken, getAllUserHistoryController);

router.get("/get/all", apiValidation, getAllHistoryController);

module.exports = router;