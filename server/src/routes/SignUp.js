const router = require("express").Router();
import React from "react";
import { renderToString } from "react-dom/server";
import SignUp from "../components/pages/SignUp";
const PreventReAuth = require("../middleware/PreventReAuth");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

router.get("/", PreventReAuth, (req, res) => {
    res.render("react-template.html", {
        reactApp: renderToString(<SignUp />),
        email: "",
        password: false,
        emailFound: true,
        redirect: false,
        page: "signupPage",
    });
});

router.post("/", PreventReAuth, async (req, res) => {
    const user = await User.findOne({ email: req.body["email"] });
    if (user)
        res.render("react-template.html", {
            reactApp: renderToString(<SignUp />),
            email: req.body["email"],
            password: false,
            redirect: false,
            emailFound: false,
            page: "signupPage",
            
        });
    const newUser = new User({
        email: req.body["email"],
        password: bcrypt.hashSync(req.body["password"], salt),
        name: req.body["name"],
    });
    newUser.save();
    res.redirect(`/login?redirect=signup&id=${newUser._id}`);
});
module.exports = router;
