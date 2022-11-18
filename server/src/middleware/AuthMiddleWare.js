const jwt = require("jsonwebtoken");

// Module to check if users are authorized or not
module.exports = function AuthMiddleWare(req, res, next) {

    console.log("Reached Auth middleware");
    const token = req.cookies["token"];
    if (!token) {
        return res.redirect("/login");
    }

    jwt.verify(token, "my_secret_key", (err) => {
        if (err) return res.clearCookie("token").redirect("/login");
        else next();
    });
};
