const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("API Version : 3");
});

const appRoute = require("./app/routers/app-router");
app.use("/", appRoute);

app.listen(80, () => {
    console.log("Server Berjalan di Port : 80");
});
