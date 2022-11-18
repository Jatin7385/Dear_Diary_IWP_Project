const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect("mongodb+srv://Jatin7385:Jatin7385@cluster0.g9ig8ku.mongodb.net/dearDiaryDB?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

const connection = mongoose.connection;

connection.once("open", () => {
    console.log("MongoDB connection successfull");
});
connection.on("error", (err) => {
    console.log("MongoDB failed with:", err);
});

app.use(bodyParser.json({ limit: "50mb" })); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json());
app.use(cookieParser());

app.set("views", "views");
app.engine("html", require("ejs").renderFile);
app.use(express.static("static"));

console.log("Reached before app.use(/)");
app.use("/", require("./routes/home"));
app.use("/edit", require("./routes/edit"));
app.use("/login", require("./routes/LogIn"));
app.use("/signup", require("./routes/SignUp"));
app.use("/logout", require("./routes/logout"));
app.use("/account", require("./routes/account"));
app.use("/api", require("./routes/api/updatePassword"));
app.use("/api", require("./routes/api/updateProfile"));
app.use("/api", require("./routes/api/updatePhoto"));
app.use("/api", require("./routes/api/deleteAccount"));

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
