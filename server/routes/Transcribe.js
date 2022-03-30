const FormData = require("form-data");
const { v4: uuidv4 } = require("uuid");

const { io } = require("../server");
const { Service } = require("../utils/AxiosService");
const { decodeToken } = require("../utils/Helpers");

const transcribe = (req, res) => {
  try {
    if (!req.headers.authorization) {
      res.status(401).send({ error: "Unauthenticated" });
    } else {
      const token = decodeToken(req.headers.authorization);
      const service = new Service();
      const config = {
        transcriber: "machine_v2",
        language: "en",
      };
      const fileRecievedFromClient = req.file;
      let form = new FormData();
      form.append(
        "media",
        fileRecievedFromClient.buffer,
        fileRecievedFromClient.originalname
      );
      form.append("options", JSON.stringify(config));
      const eventName = uuidv4();
      // console.log("eventName: ", eventName);

      service
        .post(``, form, token)
        .then((response) => {
          res.send({ id: response.data.id });

          console.log("response.data.id: ", response.data.id);
          // io.emit(eventName, response.data.id);
        })
        .catch((error) => {
          // io.emit(eventName, "error");
          if (error && error.response) {
            res.status(error.response.status).send({
              error: error.response.data,
              status: error.response.status,
            });
          } else {
            res.status(400).send({ error: "Bad Request" });
          }
        });
      // res.send({ id: eventName });
    }
  } catch (error) {
    res.status(400).send({ error: "Bad request" });
    console.log("error: ", error);
  }
};

module.exports = {
  transcribe,
};
