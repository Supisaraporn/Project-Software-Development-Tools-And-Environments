// Config

const express = require("express");
const router = express.Router();
const { body, query, param } = require("express-validator");
const apiValidation = require("../validation/apiValidation");

// Import Controller

const {
    getAllRewardController,
    getRewardByIdController,
    insertController,
    updateController,
    deleteController,
} = require("../controller/reward-controller");

// Create Routes

router.post("/insert", [body("id").notEmpty(), body("name").notEmpty(), body("cover_img").notEmpty(), body("in_stock").notEmpty()], apiValidation, insertController);

router.post("/update", [body("id").notEmpty(), body("oldId").notEmpty(), body("name").notEmpty(), body("cover_img").notEmpty(), body("in_stock").notEmpty()], apiValidation, updateController);

router.post("/delete", [body("id").notEmpty()], apiValidation, deleteController);

router.get("/get/all", apiValidation, getAllRewardController);

router.get("/get/:id", [param("id").notEmpty()], apiValidation, getRewardByIdController);

module.exports = router;