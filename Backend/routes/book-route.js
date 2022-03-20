// Config

const express = require("express");
const router = express.Router();
const { body, query, param } = require("express-validator");
const apiValidation = require("../validation/apiValidation");

// Import Controller

const {
    getAllBookController,
    getBookByIdController,
    insertController,
    updateController,
    deleteController,
} = require("../controller/book-controller");

// Create Routes

router.post("/insert", [body("id").notEmpty(), body("name").notEmpty(), body("price").notEmpty(), body("publisher").notEmpty(), body("story").notEmpty(), body("synopsis").notEmpty(), body("cover_img").notEmpty(), body("author").notEmpty()], apiValidation, insertController);

router.post("/update", [body("id").notEmpty(), body("oldId").notEmpty(), body("name").notEmpty(), body("price").notEmpty(), body("publisher").notEmpty(), body("story").notEmpty(), body("synopsis").notEmpty(), body("cover_img").notEmpty(), body("author").notEmpty()], apiValidation, updateController);

router.post("/delete", [body("id").notEmpty()], apiValidation, deleteController);

router.get("/get/all", apiValidation, getAllBookController);

router.get("/get/:id", [param("id").notEmpty()], apiValidation, getBookByIdController);

module.exports = router;