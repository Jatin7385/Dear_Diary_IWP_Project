const jwt = require("jsonwebtoken");

module.exports = function PreventReAuth(req, res, next) {
    const token = req.cookies["token"];
    if (!token) {
        return next();
    }
    jwt.verify(token, "my_secret_key", (err) => {
        if (err) return res.clearCookie("token");
        else return res.redirect("/");
    });
};
