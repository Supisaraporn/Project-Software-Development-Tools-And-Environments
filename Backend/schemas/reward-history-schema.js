// Config

const mongoose = require("mongoose");

const reqString = {
    type: String,
    required: true,
};

const reqDate = {
    type: Date,
    required: true,
};

const rewardHistorySchema = mongoose.Schema({
    user_id: reqString,
    reward_id: reqString,
    time_exchange: reqDate,
});

module.exports = mongoose.model("reward_historys", rewardHistorySchema);