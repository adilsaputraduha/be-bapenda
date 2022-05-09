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

const appRoute = require("./app/routers/app-router");
app.use("/", appRoute);

app.listen(8080, () => {
    console.log("Server Berjalan di Port : 8080");
});
