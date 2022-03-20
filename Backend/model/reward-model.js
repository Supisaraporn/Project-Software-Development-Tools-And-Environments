// Config

const connect = require("../core/connect");
const bcrypt = require("bcryptjs");
const { sign } = require("jsonwebtoken");

// Import Schema
const rewardSchema = require("../schemas/reward-schema");

// Import Function

// Create Model
module.exports = {
    getAllReward: async () => {
        try {
            const response = await connect().then(async (mongoose) => {
                try {
                    let result = await rewardSchema.find({});
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
    getRewardById: async (query) => {
        try {
            const response = await connect().then(async (mongoose) => {
                try {
                    let result = await rewardSchema.findOne(query);
                    if (result == null) {
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
    insertReward: async (data) => {
        try {
            let response = await connect().then(async (mongoose) => {
                try {
                    await new rewardSchema(data).save();
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
                        message: "Insert successful.",
                    },
                };
            } else {
                response = {
                    success: false,
                    payload: {
                        message: "Insert failed.",
                    },
                };
            };
            return response;
        } catch (err) {
            console.log(err);
        };
    },
    updateReward: async (data) => {
        try {
            let response = await connect().then(async (mongoose) => {
                try {
                    await rewardSchema.findOneAndUpdate(
                        {
                            id: data.oldId,
                        },
                        {
                            id: data.id,
                            cover_img: data.cover_img,
                            name: data.name,
                            price: data.price,
                            in_stock: data.in_stock,
                        },
                    );
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
                        message: "Update successful.",
                    },
                };
            } else {
                response = {
                    success: false,
                    payload: {
                        message: "Update failed.",
                    },
                };
            };
            return response;
        } catch (err) {
            console.log(err);
        };
    },
    deleteReward: async (data) => {
        try {
            let response = await connect().then(async (mongoose) => {
                try {
                    await rewardSchema.deleteOne({
                        id: data.id,
                    });
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
                        message: "Delete successful.",
                    },
                };
            } else {
                response = {
                    success: false,
                    payload: {
                        message: "Delete failed.",
                    },
                };
            };
            return response;
        } catch (err) {
            console.log(err);
        };
    },
};