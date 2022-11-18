const AuthMiddleWare = require("../middleware/AuthMiddleWare");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const User = require("../models/User");
router.get("/", AuthMiddleWare, (req, res) => {
    jwt.verify(
        req.cookies["token"],
        "my_secret_key",
        async (err, decode) => {
            if (err) return res.status(400).send();
            const user = await User.findById(decode._id);
            return res.render("index.html", {
                page: "acc",
                updated: user.updatedAt || user.date,
                name: user.name,
                profile: user.picture,
                email: user.email,
                _id: user._id,
            });
        }
    );
});

module.exports = router;
