// Import Models

const {
    getAllHistory,
    getAllUserHistory,
    addHistory,
} = require("../model/reward-history-model");

// Create Controller

module.exports = {
    getAllUserHistoryController: async (req, res, next) => { 
        try {
            const response = await getAllUserHistory(req.token);
            res.status(200).json(response);
            res.end();
        } catch (err) {
            next(err);
        };
    },
    addHistoryController: async (req, res, next) => { 
        try {
            const response = await addHistory(req.body);
            res.status(200).json(response);
            res.end();
        } catch (err) {
            next(err);
        };
    },
    getAllHistoryController: async (req, res, next) => { 
        try {
            const response = await getAllHistory();
            res.status(200).json(response);
            res.end();
        } catch (err) {
            next(err);
        };
    },
};