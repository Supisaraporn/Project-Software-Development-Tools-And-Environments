// Config

const express = require("express");
const router = express.Router();
const { body, query, param } = require("express-validator");
const verifyToken = require("../validation/verifyToken");
const apiValidation = require("../validation/apiValidation");

// Import Controller

const {
    buyBookController,
    getOwnedBookController,
} = require("../controller/owned-book-controller");

// Create Routes

router.post("/buy", [ body("book_id").notEmpty(), body("point").notEmpty() ], apiValidation, verifyToken, buyBookController);

router.post("/get/user/all", [ body("id").notEmpty()], apiValidation, getOwnedBookController);

module.exports = router;