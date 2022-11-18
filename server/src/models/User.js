const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema(
    {
        email: { type: String, unique: true },
        password: String,
        name: String,
        date: { type: Date, default: Date.now },
        picture: {
            type: String,
            default:
                "https://nyrevconnect.com/wp-content/uploads/2017/06/Placeholder_staff_photo-e1505825573317.png",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", User);
