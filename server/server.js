const express = require("express");
const bodyParser = require("body-parser");
const AWS = require("aws-sdk");

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

const s3 = new AWS.S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

module.exports = {
  app,
  server,
  io,
  s3,
};
