const express = require("express");
const session = require("express-session");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const flash = require("req-flash");

const app = express();

app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);
app.use(bodyParser.json());
app.use(cors());

app.use(
    session({
        resave: false,
        saveUninitialized: false,
        secret: "t@1k0ch3ng",
        name: "secretName",
        cookie: {
            sameSite: true,
            maxAge: 10000000,
        },
    })
);
app.use(flash());

app.get("/", (req, res) => {
    res.send("API Version : 3");
});

app.set("views", path.join(__dirname, "app/views"));
app.set("view engine", "ejs");

app.use("/assets", express.static(path.join(__dirname, "app/assets")));

const appRoute = require("./app/routers/app-route");
const adminRoute = require("./app/routers/admin-route");
const loginRoute = require("./app/routers/login-route");

app.use("/", appRoute);
app.use("/administrator", adminRoute);
app.use("/administrator/login", loginRoute);

app.listen(8080, () => {
    console.log("Server Berjalan di Port : 8080");
});
