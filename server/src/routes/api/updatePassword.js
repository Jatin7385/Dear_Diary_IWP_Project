const router = require("express").Router();
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const AuthMiddleWare = require("../../middleware/AuthMiddleWare");
const jwt = require("jsonwebtoken");
const salt = bcrypt.genSaltSync(10);
router.post("/updatePassword", AuthMiddleWare, (req, res) => {
    jwt.verify(
        req.cookies["token"],
        "my_secret_key",
        async (err, decode) => {
            if (err) return res.status(400).send();
            const user = await User.findById(decode._id);
            if (!bcrypt.compareSync(req.body.oldPass, user.password))
                return res.status(400).json({ ok: false });
            user.password = bcrypt.hashSync(req.body.newPass, salt);
            user.save((err) => {
                if (err) return res.status(400).json({ ok: false });
                return res.status(200).json({ ok: true });
            });
        }
    );
});

module.exports = router;
