// Config

const express = require("express");
const path = require("path");
const cookieSession = require("cookie-session");
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config({ path: "./.env" });

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");

app.use(express.static('public'));

app.use("/css", express.static(__dirname + "public/css"));
app.use("/script", express.static(__dirname + "public/script"));
app.use("/layouts", express.static(__dirname + "/views/layouts"));

app.use(
    cookieSession({
        name: "session",
        keys: [ process.env.cookieKey ],
        maxAge: 24 * 60 * 60 * 1000,
    }),
);

// Route

const {
    ifNotLoggedIn,
    ifLoggedIn,
    login,
    getUserData,
    checkAdmin,
} = require("./functions/functions");

// Get - All User

app.get("/register", (req, res, next) => {
    res.render("layouts/register", {
        nowOnPage: "register",
        title: "Read Like a Book | Register",
        error: null,
        message: null,
    });
});

app.get("/login", ifLoggedIn, (req, res, next) => {
    res.render("layouts/login", {
        nowOnPage: "login",
        title: "Read Like a Book | Login",
        error: null,
        message: null,
    });
});

// Get - User

app.get("/", ifNotLoggedIn, async (req, res, next) => {
    const response = await getUserData(req.session.token);
    res.render("layouts/home", {
        nowOnPage: "home",
        title: "Read Like a Book | Home",
        userData: response.data.payload.data,
    });
});

app.get("/myaccount", ifNotLoggedIn, async (req, res, next) => {
    const response = await getUserData(req.session.token);
    res.render("layouts/profile", {
        nowOnPage: "profile",
        title: "Read Like a Book | User Profile",
        userData: response.data.payload.data,
    });
});

app.get("/rewards", ifNotLoggedIn, async (req, res, next) => {
    const response = await getUserData(req.session.token);
    res.render("layouts/rewards", {
        nowOnPage: "rewards",
        title: "Read Like a Book | Rewards",
        userData: response.data.payload.data,
    });
});

app.get("/history", ifNotLoggedIn, async (req, res, next) => {
    const response = await getUserData(req.session.token);
    res.render("layouts/history", {
        nowOnPage: "history",
        title: "Read Like a Book | Redeem History",
        userData: response.data.payload.data,
    });
});

app.get("/bookshelf", ifNotLoggedIn, async (req, res, next) => {
    const response = await getUserData(req.session.token);
    res.render("layouts/owned-book", {
        nowOnPage: "owned-book",
        title: "Read Like a Book | Bookshelf",
        userData: response.data.payload.data,
    });
});

app.get("/book/", ifNotLoggedIn, async (req, res, next) => {
    const response = await getUserData(req.session.token);
    res.render("layouts/login", {
        nowOnPage: "book",
        title: "Test | Home",
        data: req.query.search,
    });
});

// Get - Admin

app.get("/admin/dashboard", ifNotLoggedIn, async (req, res, next) => {
    const response = await checkAdmin(req.session.token);
    if (response.success) {
        return res.render("layouts/admin-dashboard", {
            nowOnPage: "admin-dashboard",
            title: "Read Like a Book | Admin Dashboard",
            userData: response.payload.data,
        });
    } else {
        return res.render("layouts/no-access-permission", {
            nowOnPage: "access-denied",
            title: "Read Like a Book | Access Denied",
        });
    }
});

app.get("/admin", ifNotLoggedIn, async (req, res, next) => {
    const response = await checkAdmin(req.session.token);
    if (response.success) {
        return res.render("layouts/admin-dashboard", {
            nowOnPage: "admin-dashboard",
            title: "Read Like a Book | Admin Dashboard",
            userData: response.payload.data,
        });
    } else {
        return res.render("layouts/no-access-permission", {
            nowOnPage: "access-denied",
            title: "Read Like a Book | Access Denied",
        });
    }
});

app.get("/admin/modifier", ifNotLoggedIn, async (req, res, next) => {
    const response = await checkAdmin(req.session.token);
    if (response.success) {
        return res.render("layouts/admin-database-modifier", {
            nowOnPage: "admin-dashboard",
            title: "Read Like a Book | Admin Dashboard",
            userData: response.payload.data,
        });
    } else {
        return res.render("layouts/no-access-permission", {
            nowOnPage: "access-denied",
            title: "Read Like a Book | Access Denied",
        });
    }
});

app.get("/admin/modifier/book", ifNotLoggedIn, async (req, res, next) => {
    const response = await checkAdmin(req.session.token);
    if (response.success) {
        return res.render("layouts/admin-book-modifier", {
            nowOnPage: "admin-book-modifier",
            title: "Read Like a Book | Admin Book Modifier",
            userData: response.payload.data,
        });
    } else {
        return res.render("layouts/no-access-permission", {
            nowOnPage: "access-denied",
            title: "Read Like a Book | Access Denied",
        });
    }
});

app.get("/admin/modifier/reward", ifNotLoggedIn, async (req, res, next) => {
    const response = await checkAdmin(req.session.token);
    if (response.success) {
        return res.render("layouts/admin-reward-modifier", {
            nowOnPage: "admin-reward-modifier",
            title: "Read Like a Book | Admin Reward Modifier",
            userData: response.payload.data,
        });
    } else {
        return res.render("layouts/no-access-permission", {
            nowOnPage: "access-denied",
            title: "Read Like a Book | Access Denied",
        });
    }
});

// Post - All User

app.post("/login", async (req, res, next) => {
    const { username, password } = req.body;
    const response = await login(username, password);
    if (response.success) {
        req.session.isLoggedIn = response.payload.isLoggedIn;
        req.session.token = response.payload.token;
        res.redirect("/");
    } else {
        res.render("layouts/login", {
            nowOnPage: "login",
            title: "Read Like a Book | Login",
            error: response.payload.error,
        });
    };
});

app.post("/register", async (req, res, next) => {
    const { username, password, firstName, lastName, email } = req.body;
    axios({
        method: "POST",
        url: "https://read-like-a-book-api.herokuapp.com/user/register",
        data: {
            id: username,
            password: password,
            name: firstName,
            lastname: lastName,
            user_address: "กดที่รูปปากกาเพื่อแก้ไขข้อมูล",
            email: email,
            user_point: 0,
            role: "user",
        },
    })
    .then(
        (response) => {
            if (response.data.success) {
                return res.render("layouts/login", {
                    nowOnPage: "login",
                    title: "Read Like a Book | Login",
                    error: null,
                    message: response.data.payload.message,
                });
            } else {
                return res.render("layouts/register", {
                    nowOnPage: "register",
                    title: "Read Like a Book | Register",
                    error: response.data.payload.message,
                    message: null,
                });
            };
        },
    );
});

app.post("/buy", async (req, res, next) => {
    const { id } = req.body;
    axios({
        method: "POST",
        url: "https://read-like-a-book-api.herokuapp.com/owned-book/buy",
        headers: {
            authorization: "bearer " + req.session.token,
        },
        data: {
            book_id: id,
        },
    })
    .then(
        (response) => {
            res.redirect('/');
        },
    );
});

app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/");
});

// ETC

app.use((req, res, next) => {
    res.render("layouts/no-page-found", {
        nowOnPage: "no-page-found",
        title: "Read Like a Book | No Page Found",
    });
});

app.listen(PORT, () => {
    console.log("Running on PORT:" + PORT);
});