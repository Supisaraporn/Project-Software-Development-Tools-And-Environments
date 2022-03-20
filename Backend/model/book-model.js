// Config

const connect = require("../core/connect");
const bcrypt = require("bcryptjs");
const { sign } = require("jsonwebtoken");

// Import Schema
const bookSchema = require("../schemas/book-schema");

// Import Function

// Create Model
module.exports = {
    getAllBook: async () => {
        try {
            const response = await connect().then(async (mongoose) => {
                try {
                    let result = await bookSchema.find({});
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
    getBookById: async (query) => {
        try {
            const response = await connect().then(async (mongoose) => {
                try {
                    let result = await bookSchema.findOne(query);
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
    insertBook: async (data) => {
        try {
            let response = await connect().then(async (mongoose) => {
                try {
                    await new bookSchema(data).save();
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
    updateBook: async (data) => {
        try {
            let response = await connect().then(async (mongoose) => {
                try {
                    await bookSchema.findOneAndUpdate(
                        {
                            id: data.oldId,
                        },
                        {
                            id: data.id,
                            author: data.author,
                            cover_img: data.cover_img,
                            name: data.name,
                            price: data.price,
                            publisher: data.publisher,
                            story: data.story,
                            synopsis: data.synopsis,
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
    deleteBook: async (data) => {
        try {
            let response = await connect().then(async (mongoose) => {
                try {
                    await bookSchema.deleteOne({
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