// Config

const connect = require("../core/connect");
const bcrypt = require("bcryptjs");
const { sign } = require("jsonwebtoken");

// Import Schema
const ownedBookSchema = require("../schemas/owned-book-schema");
const { pointIncrementer } = require("./user-model");

// Import Function

// Create Model
module.exports = {
    getOwnedBook: async (query) => {
        try {
            const response = await connect().then(async (mongoose) => {
                try {
                    let result = await ownedBookSchema.aggregate([
                        {
                            $match: {
                                user_id: query,
                            },
                        },
                        {
                            $lookup: {
                                from: "books",
                                localField: "book_id",
                                foreignField: "id",
                                as: "book_data",
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
    buyBook: async (data, point) => {
        try {
            await pointIncrementer({
                id: data.user_id,
                point: point,
            });
            let response = await connect().then(async (mongoose) => {
                try {
                    for (let i=0; i<data.book_id.length; i++) {
                        await new ownedBookSchema({
                            book_id: data.book_id[i],
                            user_id: data.user_id,
                        }).save();
                    }
                    
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
                        message: "Successfully buy a book.",
                    },
                };
            } else {
                response = {
                    success: false,
                    payload: {
                        message: "Failed to buy a book.",
                    },
                };
            };
            return response;
        } catch (err) {
            console.log(err);
        };
    },


    testGetOwnedBook: async (query) => {
        try {
            const response = await connect().then(async (mongoose) => {
                try {
                    let result = await ownedBookSchema.aggregate([
                        {
                            $match: {
                                user_id: query,
                            },
                        },
                        {
                            $lookup: {
                                from: "books",
                                localField: "book_id",
                                foreignField: "id",
                                as: "book_data",
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
    testBuyBook: async (data, point) => {
        try {
            await pointIncrementer({
                id: data.user_id,
                point: point,
            });
            let response = await connect().then(async (mongoose) => {
                try {
                    for (let i=0; i<data.book_id.length; i++) {
                        await new ownedBookSchema({
                            book_id: data.book_id[i],
                            user_id: data.user_id,
                        }).save();
                    }
                    
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
                        message: "Successfully buy a book.",
                    },
                };
            } else {
                response = {
                    success: false,
                    payload: {
                        message: "Failed to buy a book.",
                    },
                };
            };
            return response;
        } catch (err) {
            console.log(err);
        };
    },
};