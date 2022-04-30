// Import Models

const {
    getAllReward,
    getRewardById,
    insertReward,
    updateReward,
    deleteReward,
} = require("../model/reward-model");

// Create Controller

module.exports = {
    getAllRewardController: async (req, res, next) => { 
        try {
            const response = await getAllReward();
            res.status(200).json(response);
            res.end();
        } catch (err) {
            next(err);
        };
    },
    getRewardByIdController: async (req, res, next) => { 
        try {
            const response = await getRewardById(req.params);
            res.status(200).json(response);
            res.end();
        } catch (err) {
            next(err);
        };
    },
    insertController: async (req, res, next) => { 
        try {
            const response = await insertReward(req.body);
            res.status(200).json(response);
            res.end();
        } catch (err) {
            next(err);
        };
    },
    updateController: async (req, res, next) => { 
        try {
            const response = await updateReward(req.body);
            res.status(200).json(response);
            res.end();
        } catch (err) {
            next(err);
        };
    },
    deleteController: async (req, res, next) => { 
        try {
            const response = await deleteReward(req.body);
            res.status(200).json(response);
            res.end();
        } catch (err) {
            next(err);
        };
    },
};