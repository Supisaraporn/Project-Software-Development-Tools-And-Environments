// Config
const connect = require("../core/connect");
const jwt = require("jsonwebtoken");

// Import Schema
const historySchema = require("../schemas/reward-history-schema");

// Import Function

// Create Model
module.exports = {
    getAllUserHistory: async (query) => {
        try {
            let response = await connect().then(async (mongoose) => {
                try {
                    const userId = jwt.verify(
                        query,
                        process.env.SECRET,
                        (err, authData) => {
                            return {
                                user_id: authData.result.id,
                            };
                        },
                    );
                    let result = await historySchema.aggregate([
                        {
                            $match: userId,
                        },
                        {
                            $lookup: {
                                from: "rewards",
                                localField: "reward_id",
                                foreignField: "id",
                                as: "reward_info",
                            },
                        },
                    ]);
                    if (result.length == 0) {
                        result = {
                            success: false,
                            payload: {
                                message: "No data found.",
                            },
                        };
                    } else {
                        result = {
                            success: true,
                            payload: {
                                data: result,
                            },
                        };
                    };
                    return result;
                } finally {
                    mongoose.connection.close();
                };
            });
            return response;
        } catch (err) {
            console.log(err);
        };
    },
    addHistory: async (data) => {
        try {
            let response = await connect().then(async (mongoose) => {
                try {
                    await new historySchema(data).save();
                    return result = {
                        success: true,
                    };
                } catch (err) {
                    return result = {
                        success: false,
                    };
                } finally {
                    mongoose.connection.close();
                };
            });
            if (response.success) {
                response = {
                    success: true,
                    payload: {
                        message: "Redeem successful.",
                    },
                };
            } else {
                response = {
                    success: false,
                    payload: {
                        message: "Failed to redeem.",
                    },
                };
            };
            return response;
        } catch (err) {
            console.log(err);
        };
    },
    getAllHistory: async () => {
        try {
            const response = await connect().then(async (mongoose) => {
                try {
                    let result = await historySchema.find({});
                    if (result.length == 0) {
                        result = {
                            success: false,
                            payload: {
                                message: "No data found.",
                            },
                        };
                    } else {
                        result = {
                            success: true,
                            payload: {
                                data: result,
                            },
                        };
                    };
                    return result;
                } finally {
                    mongoose.connection.close();
                };
            });
            return response;
        } catch (err) {
            console.log(err);
        };
    },
    testGetAllUserHistory: async (query) => {
        try {
            let response = await connect().then(async (mongoose) => {
                try {
                    const userId = jwt.verify(
                        query,
                        process.env.SECRET,
                        (err, authData) => {
                            return {
                                user_id: authData.result.id,
                            };
                        },
                    );
                    let result = await historySchema.aggregate([
                        {
                            $match: userId,
                        },
                        {
                            $lookup: {
                                from: "rewards",
                                localField: "reward_id",
                                foreignField: "id",
                                as: "reward_info",
                            },
                        },
                    ]);
                    if (result.length == 0) {
                        result = {
                            success: false,
                            payload: {
                                message: "No data found.",
                            },
                        };
                    } else {
                        result = {
                            success: true,
                            payload: {
                                data: result,
                            },
                        };
                    };
                    return result;
                } finally {
                    mongoose.connection.close();
                };
            });
            return response;
        } catch (err) {
            console.log(err);
        };
    },
    testAddHistory: async (data) => {
        try {
            let response = await connect().then(async (mongoose) => {
                try {
                    await new historySchema(data).save();
                    return result = {
                        success: true,
                    };
                } catch (err) {
                    return result = {
                        success: false,
                    };
                } finally {
                    mongoose.connection.close();
                };
            });
            if (response.success) {
                response = {
                    success: true,
                    payload: {
                        message: "Redeem successful.",
                    },
                };
            } else {
                response = {
                    success: false,
                    payload: {
                        message: "Failed to redeem.",
                    },
                };
            };
            return response;
        } catch (err) {
            console.log(err);
        };
    },
    testGetAllHistory: async () => {
        try {
            const response = await connect().then(async (mongoose) => {
                try {
                    let result = await historySchema.find({});
                    if (result.length == 0) {
                        result = {
                            success: false,
                            payload: {
                                message: "No data found.",
                            },
                        };
                    } else {
                        result = {
                            success: true,
                            payload: {
                                data: result,
                            },
                        };
                    };
                    return result;
                } finally {
                    mongoose.connection.close();
                };
            });
            return response;
        } catch (err) {
            console.log(err);
        };
    },
};