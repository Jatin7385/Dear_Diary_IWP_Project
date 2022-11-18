const router = require("express").Router();
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const AuthMiddleWare = require("../../middleware/AuthMiddleWare");
const jwt = require("jsonwebtoken");
const Entry = require("../../models/Entry");
const salt = bcrypt.genSaltSync(10);
router.post("/deleteAccount", AuthMiddleWare, (req, res) => {
    jwt.verify(
        req.cookies["token"],
        "my_secret_key",
        async (err, decode) => {
            if (err) return res.status(400).send();
            const user = await User.findById(decode._id);
            if (!bcrypt.compareSync(req.body.password, user.password))
                return res.status(200).json({ ok: false });
            User.deleteOne({ _id: decode._id }, (err, doc) => {
                if (err) return res.status(400).json({ ok: false });
                Entry.deleteMany({ uid: decode._id }, (err) => {
                    if (err) return res.status(400).json({ ok: false });
                    else return res.status(200).json({ ok: true });
                });
            });
        }
    );
});

module.exports = router;
