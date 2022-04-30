// Config

const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

// dotenv.config();
dotenv.config({ path: "./.env" });

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

// Import Routes

const routeUser = require("./routes/user-route");
const routeBook = require("./routes/book-route");
const routeOwnedBook = require("./routes/owned-book-route");
const routeReward = require("./routes/reward-route");
const routeRewardHistory = require("./routes/reward-history-route");

// Routes

app.get("/", (req, res) => {
    res.status(200).json({
        message: "THIS IS AN API",
    });
});

app.use("/user", routeUser);
app.use("/book", routeBook);
app.use("/owned-book", routeOwnedBook);
app.use("/reward", routeReward);
app.use("/history", routeRewardHistory);

app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 501);
    res.json({
        error: {
            code: err.status || 501,
            message: err.message,
        }
    });
});

// Start PORT

app.listen(PORT, () => {
    console.log("Running on PORT:" + PORT);
});
