// Config

const mongoose = require("mongoose");

const reqString = {
    type: String,
    required: true,
};

const reqNumber = {
    type: Number,
    required: true,
};

const rewardSchema = mongoose.Schema({
    id: reqString,
    name: reqString,
    price: reqString,
    cover_img: reqString,
    in_stock: reqNumber,
});

module.exports = mongoose.model("rewards", rewardSchema);