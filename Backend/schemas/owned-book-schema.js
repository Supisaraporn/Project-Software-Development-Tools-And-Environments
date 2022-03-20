// Config

const mongoose = require("mongoose");

const reqString = {
    type: String,
    required: true,
};

const ownedBookSchema = mongoose.Schema({
    book_id: reqString,
    user_id: reqString,
});

module.exports = mongoose.model("owned_books", ownedBookSchema);