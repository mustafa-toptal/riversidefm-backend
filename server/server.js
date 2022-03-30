const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const server = require("http").createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    method: ["GET", "POST"],
  },
});

const apiTimeout = 60 * 60 * 1000;
app.use((req, res, next) => {
  // Set the timeout for all HTTP requests
  req.setTimeout(apiTimeout, () => {
    let err = new Error("Request Timeout");
    err.status = 408;
    next(err);
  });
  // Set the server response timeout for all HTTP requests
  res.setTimeout(apiTimeout, () => {
    let err = new Error("Service Unavailable");
    err.status = 508;
    next(err);
  });
  next();
});

app.use(bodyParser.json({ limit: "5gb" }));

module.exports = {
  app,
  server,
  io,
};
