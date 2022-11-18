const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Entry = new Schema(
    {
        title: String,
        location: String,
        weather: String,
        uid: String,
        mood: String,
        entries: [
            {
                time: { type: Date, default: Date.now },
                data: String,
            },
        ],
        images: [String],
        userHash: String,
    },
    { timestamps: true }
);

module.exports = mongoose.model("Entry", Entry);
