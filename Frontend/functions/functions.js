const axios = require("axios");

module.exports = {
    ifNotLoggedIn: (req, res, next) => {
        if (!req.session.isLoggedIn) {
            return res.redirect('/login');
        };
        next();
    },
    
    ifLoggedIn: (req, res, next) => {
        if (req.session.isLoggedIn) {
            return res.redirect('/');
        };
        next();
    },
    login: async (username, password) => {
        const response = await axios({
            method: "POST",
            url: "https://read-like-a-book-api.herokuapp.com/user/login",
            data: {
                id: username,
                password: password,
            },
        })
        .then(
            (response) => {
                if (response.data.success) {
                    return {
                        success: true,
                        payload: {
                            isLoggedIn: true,
                            token: response.data.payload.token,
                        },
                    };
                } else {
                    return {
                        success: false,
                        payload: {
                            error: response.data.payload.message,
                        },
                    };
                };
            },
        );
        return response;
    },
    checkAdmin: async (token) => {
        const response = await axios({
            method: "GET",
            url: "https://read-like-a-book-api.herokuapp.com/user/get/data",
            headers: {
                authorization: "bearer " + token,
            },
        })
        .then(
            (response) => {
                if (response.data.success) {
                    if (response.data.payload.data.role == "admin") {
                        return {
                            success: true,
                            payload: {
                                data: response.data.payload.data,
                            },
                        };
                    } else {
                        return {
                            success: false,
                            payload: {
                                data: "Access Denied.",
                            },
                        };
                    }
                    
                } else {
                    return {
                        success: false,
                        payload: {
                            data: response.data.payload.message,
                        },
                    };
                };
            },
        );
        return response;
    },
    getUserData: async (token) => {
        const response = await axios({
            method: "GET",
            url: "https://read-like-a-book-api.herokuapp.com/user/get/data",
            headers: {
                authorization: "bearer " + token,
            },
        })
        .then(
            (response) => {
                return response;
            },
        );
        return response;
    },
};
