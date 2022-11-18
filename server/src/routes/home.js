const AuthMiddleWare = require("../middleware/AuthMiddleWare");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const User = require("../models/User");
const Entry = require("../models/Entry");
console.log("Reached home.js");

router.get("/", AuthMiddleWare, (req, res) => {
    console.log("Home Reached")
    jwt.verify(
        req.cookies["token"],
        "my_secret_key",
        async (err, decode) => {
            if (err) return res.status(400).send();
            else {
                const user = await User.findById(decode._id);
                const items = await Entry.aggregate([
                    {
                        $match: { uid: decode._id },
                    },
                    {
                        $project: {
                            _id: 1,
                            title: 1,
                            mood: 1,
                            entries: { $size: "$entries" },
                            createdAt: 1,
                            images: 1,
                        },
                    },
                    { $sort: { createdAt: -1 } },
                ]).limit(6);
                const dates = await Entry.find(
                    { uid: decode._id },
                    { createdAt: 1 }
                );
                return res.render("index.html", {
                    page: "home",
                    name: user["name"],
                    profile: user.picture,
                    docs: items,
                    dates: dates,
                });
            }
        }
    );
});

module.exports = router;
