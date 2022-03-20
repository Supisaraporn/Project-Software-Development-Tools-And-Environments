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

const bookSchema = mongoose.Schema({
    id: reqString,
    name: reqString,
    story: reqString,
    synopsis: reqString,
    publisher: reqString,
    author: reqArray,
    price: reqString,
    cover_img: reqString,
});

module.exports = mongoose.model("books", bookSchema);