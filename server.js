const express = require("express");
const app = express();

const notificationProcessing = require("./modules/NotificationProcessing");

app.get("/", (req, res) => {
    res.send("Hello");
});

app.get("/heartbeat", (req, res) => {
    res.send("tick");
});

app.get("/execute", async (req, res) => {
    res.send(await notificationProcessing.execute());
});

const port = process.env.PORT || 7350;
app.listen(port, () => {
    console.log("App listening on port " + port);
});