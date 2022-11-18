const router = require("express").Router();
import React from "react";
import { renderToString } from "react-dom/server";
import LoginPage from "../components/pages/LoginPage";
const PreventReAuth = require("../middleware/PreventReAuth");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

console.log("Reached LogIn.js")

router.get("/", PreventReAuth, async (req, res) => {
    console.log("LogIn.js -> GET / Reguest")
    const redirect = req.query["redirect"];
    const id = req.query["id"];
    if (redirect && id) {
        const user = await User.findById(id);
        if (user) {
            return res.render("react-template.html", {
                reactApp: renderToString(<LoginPage />),
                email: user.email,
                emailFound: true,
                password: false,
                redirect: true,
                page: "loginPage",
            });
        }
    }
    return res.render("react-template.html", {
        reactApp: renderToString(<LoginPage />),
        email: "",
        emailFound: true,
        password: false,
        redirect: false,
        page: "loginPage",
    });
});

router.post("/", PreventReAuth, async (req, res) => {
    console.log("Reached Login -> POST / Request")
    const { email, password, remember } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
        console.log("!user")
        return res.render("react-template.html", {
            reactApp: renderToString(<LoginPage />),
            email: email,
            emailFound: false,
            password: false,
            redirect: false,
            page: "loginPage",
        });
    }
    if (!bcrypt.compareSync(password, user.password)) {
        console.log("Password didn't match")
        return res.render("react-template.html", {
            reactApp: renderToString(<LoginPage />),
            email: email,
            emailFound: true,
            password: true,
            redirect: false,
            page: "loginPage",
        });
    }
    console.log("Redirecting to /")
    return res
        .cookie(
            "token",
            jwt.sign(
                { email: req.body["email"], _id: user._id },
                "my_secret_key",
                { expiresIn: remember === "on" ? "30 days" : "30m" }
            ),
            { maxAge: remember === "on" ? 30 * 86400000 : 30 * 60000 }
        )
        .redirect("/");
        
});

module.exports = router;
