const jwt = require("jsonwebtoken");

// Import Models

const {
    getOwnedBook,
    buyBook,
} = require("../model/owned-book-model");

// Create Controller

module.exports = {
    buyBookController: async (req, res, next) => { 
        try {
            const userData = jwt.verify(
                req.token,
                process.env.SECRET,
                (err, authData) => {
                    return authData.result;
                },
            );
            const response = await buyBook({
                book_id: req.body.book_id,
                user_id: userData.id,
            }, req.body.point);
            res.status(200).json(response);
            res.end();
        } catch (err) {
            next(err);
        };
    },
    getOwnedBookController: async (req, res, next) => { 
        try {
            const response = await getOwnedBook(req.body.id);
            res.status(200).json(response);
            res.end();
        } catch (err) {
            next(err);
        };
    },
    testBuyBookController: async (req, res, next) => { 
        try {
            const userData = jwt.verify(
                req.token,
                process.env.SECRET,
                (err, authData) => {
                    return authData.result;
                },
            );
            const response = await buyBook({
                book_id: req.body.book_id,
                user_id: userData.id,
            }, req.body.point);
            res.status(200).json(response);
            res.end();
        } catch (err) {
            next(err);
        };
    },
    testGetOwnedBookController: async (req, res, next) => { 
        try {
            const response = await getOwnedBook(req.body.id);
            res.status(200).json(response);
            res.end();
        } catch (err) {
            next(err);
        };
    },
};