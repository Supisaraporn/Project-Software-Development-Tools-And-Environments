// Config
const express = require("express");
const router = express.Router();
const verifyToken = require("../validation/verifyToken");
const { body, query } = require("express-validator");
const apiValidation = require("../validation/apiValidation");

// Import Controller

const {
    registerController,
    loginController,
    incrementController,
    getDataController,
    deleteUserController,
} = require("../controller/user-controller");

// Create Routes

router.post("/register", [body("id").notEmpty(), body("password").notEmpty(), body("name").notEmpty(), body("lastname").notEmpty(), 
body("user_address").notEmpty(), body("email").notEmpty(), body("user_point").notEmpty(), body("role").notEmpty()], apiValidation, registerController);

router.post("/login", [body("id").notEmpty(), body("password").notEmpty()], apiValidation, loginController);

router.post("/point", [body("id").notEmpty(), body("point").notEmpty()], apiValidation, verifyToken, incrementController);

router.post("/unregister", [body("id").notEmpty()], apiValidation, deleteUserController);

router.get("/get/data", apiValidation, verifyToken, getDataController);

module.exports = router;