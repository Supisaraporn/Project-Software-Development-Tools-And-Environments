// Config

const mongoose = require("mongoose");

const reqString = {
    type: String,
    required: true,
};

const reqArray = {
    type: Array,
    required: true,
};

const reqNumber = {
    type: Number,
    required: true,
};

const userSchema = mongoose.Schema({
    id: reqString,
    password: reqString,
    name: reqString,
    lastname: reqString,
    user_address: reqString,
    email: reqString,
    user_point: reqNumber,
    role: reqString,
});

module.exports = mongoose.model("users", userSchema);