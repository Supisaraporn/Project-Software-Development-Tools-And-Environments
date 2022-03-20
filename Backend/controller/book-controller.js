// Config

const { sign, jwt } = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Import Models

const {
    getAllBook,
    getBookById,
    insertBook,
    updateBook,
    deleteBook,
} = require("../model/book-model");

// Create Controller

module.exports = {
    getAllBookController: async (req, res, next) => { 
        try {
            const response = await getAllBook();
            res.status(200).json(response);
            res.end();
        } catch (err) {
            next(err);
        };
    },
    getBookByIdController: async (req, res, next) => { 
        try {
            const response = await getBookById(req.params);
            res.status(200).json(response);
            res.end();
        } catch (err) {
            next(err);
        };
    },
    insertController: async (req, res, next) => { 
        try {
            const response = await insertBook(req.body);
            res.status(200).json(response);
            res.end();
        } catch (err) {
            next(err);
        };
    },
    updateController: async (req, res, next) => { 
        try {
            const response = await updateBook(req.body);
            res.status(200).json(response);
            res.end();
        } catch (err) {
            next(err);
        };
    },
    deleteController: async (req, res, next) => { 
        try {
            const response = await deleteBook(req.body);
            res.status(200).json(response);
            res.end();
        } catch (err) {
            next(err);
        };
    },
};