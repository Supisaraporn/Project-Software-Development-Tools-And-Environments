// Config
const connect = require("../core/connect");
const bcrypt = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const jwt = require("jsonwebtoken");

// Import Schema
const userSchema = require("../schemas/user-schema");

// Import Function

// Create Model
module.exports = {
    checkRegister: async (query) => {
        try {
            let response = await connect().then(async (mongoose) => {
                try {
                    let result = await userSchema.findOne(query);
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

            if (response.success) {
                response = {
                    success: false,
                    payload: {
                        message: "Register failed, data has been used.",
                    },
                };
            } else {
                response = {
                    success: true,
                    payload: {
                        message: "Register pass.",
                    },
                };
            };
            return response;
        } catch (err) {
            console.log(err);
        };
    },
    register: async (data) => {
        try {
            let response = await connect().then(async (mongoose) => {
                try {
                    const password = await bcrypt.hash(data.password, 10);
                    data.password = password;
                    await new userSchema(data).save();
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
                        message: "Register successful.",
                    },
                };
            } else {
                response = {
                    success: false,
                    payload: {
                        message: "Register failed.",
                    },
                };
            };
            return response;
        } catch (err) {
            console.log(err);
        };
    },
    checkLogin: async (query) => {
        try {
            let response = await connect().then(async (mongoose) => {
                try {
                    let result = await userSchema.findOne(query);
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
            if (response.success) {
                response = {
                    success: true,
                    payload: {
                        message: "Login pass.",
                    },
                };
            } else {
                response = {
                    success: false,
                    payload: {
                        message: "Login failed, No data found.",
                    },
                };
            };
            return response;
        } catch (err) {
            console.log(err);
        };
    },
    login: async (query) => {
        try {
            const userData = await connect().then(async (mongoose) => {
                try {
                    let result = await userSchema.findOne({
                        id: query.id,
                    });
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
            const match = await bcrypt.compare(query.password, userData.payload.data.password);
            if (match) {
                const jsonToken = sign({ result: userData.payload.data }, process.env.SECRET, {
                    expiresIn: "1d",
                });
                return {
                    success: true,
                    payload: {
                        message: "Login successfully.",
                        token: jsonToken,
                    },
                };
            } else {
                return {
                    success: false,
                    payload: {
                        message: "Password does not match.",
                    },
                };
            };
        } catch (err) {
            console.log(err);
        };
    },
    pointIncrementer: async (query) => {
        try {
            let response = await connect().then(async (mongoose) => {
                try {
                    let result = await userSchema.updateOne({ id: query.id }, { $inc: { user_point: query.point } });
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
                        message: "Point incremented.",
                    },
                };
            } else {
                response = {
                    success: false,
                    payload: {
                        message: "Failed to incremented.",
                    },
                };
            };
            return response;
        } catch (err) {
            console.log(err);
        };
    },
    deleteUser: async (data) => {
        try {
            let response = await connect().then(async (mongoose) => {
                try {
                    await userSchema.deleteOne({
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
                        message: "User has been unregisted.",
                    },
                };
            } else {
                response = {
                    success: false,
                    payload: {
                        message: "Failed to unregisted.",
                    },
                };
            };
            return response;
        } catch (err) {
            console.log(err);
        };
    },
    getUserData: async (data) => {
        try {
            const response = await connect().then(async (mongoose) => {
                try {
                    const id = jwt.verify(
                        data,
                        process.env.SECRET,
                        (err, authData) => {
                            return authData.result.id;
                        },
                    );
                    let result = await userSchema.find({
                        id: id,
                    });
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
                                data: result[0],
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