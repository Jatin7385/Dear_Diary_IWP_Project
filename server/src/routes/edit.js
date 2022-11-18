const router = require("express").Router();
const jwt = require("jsonwebtoken");
const AuthMiddleWare = require("../middleware/AuthMiddleWare");
const Entry = require("../models/Entry");
const User = require("../models/User");

router.get("/:id", AuthMiddleWare, (req, res) => {
    console.log("Reached Edit.js");
    jwt.verify(
        req.cookies["token"],
        "my_secret_key",
        async (err, decode) => {
            if (err) return res.status(400).send();
            else {
                const user = await User.findById(decode._id);
                if (req.params.id == "new") {
                    Entry.findOne(
                        {
                            uid: decode._id,
                            createdAt: {
                                $gt: new Date(new Date().toDateString()),
                            },
                        },
                        (err, doc) => {
                            if (!doc) {
                                new Entry({
                                    title: new Date()
                                        .toDateString()
                                        .split(" ")
                                        .splice(1)
                                        .join(" "),
                                    uid: decode._id,
                                }).save((err, newD) => {
                                    return res.redirect(`/edit/${newD._id}`);
                                });
                            } else {
                                res.redirect(`/edit/${doc._id}`);
                            }
                        }
                    );
                } else {
                    
                    Entry.findOne(
                        {
                            uid: decode._id,
                            _id: req.params.id,
                        },
                        (err, doc) => {
                            if (!doc) return res.status(404).send();
                            return res.render("index.html", {
                                page: "edit",
                                name: user.name,
                                profile: user.picture,
                                doc: doc,
                            });
                        }
                    );
                }
            }
        }
    );
});

router.post("/:id", AuthMiddleWare, (req, res) => {
    jwt.verify(
        req.cookies["token"],
        "my_secret_key",
        async (err, decode) => {
            if (err) return res.status(400).send();
            else {
                const user = await User.findById(decode._id);
                Entry.findOne(
                    {
                        uid: decode._id,
                        _id: req.params.id,
                    },
                    (err, doc) => {
                        if (!doc) return res.status(404).send();
                        doc.title = req.body.title;
                        doc.weather = req.body.weather;
                        doc.location = req.body.location;
                        doc.mood = req.body.mood;
                        for (let i = 0; i < req.body.oldEntry?.length; i++) {
                            if (
                                Math.floor(
                                    new Date(doc.entries[i].time).getTime() /
                                        1000
                                ) ==
                                new Date(req.body.oldEntry[i].time).getTime() /
                                    1000
                            ) {
                                doc.entries[i].data =
                                    req.body.oldEntry[i].entry;
                            }
                        }
                        doc.entries = doc.entries.filter((el) => el.data);
                        if (req.body.newEntry)
                            doc.entries.push({ data: req.body.newEntry });
                        if (req.body.newImage)
                            doc.images.push(...req.body.newImage);
                        doc.save((err, d) => {
                            return res.send(err || d._id);
                        });
                    }
                );
            }
        }
    );
});
module.exports = router;
