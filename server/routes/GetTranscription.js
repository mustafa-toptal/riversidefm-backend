const { Service } = require("../utils/AxiosService");
const {
  decodeToken,
  isSpecialCharacter,
  formatTime,
} = require("../utils/Helpers");

const getTranscription = (req, res) => {
  try {
    if (!req.params.id) {
      res.status(400).send({ error: "please provide task Id" });
    } else if (!req.headers.authorization) {
      res.status(401).send({ error: "Unauthenticated" });
    } else {
      let type = req.query.type;
      let accept = "text/plain";
      if (type == "srt") {
        type = "captions";
        accept = "application/x-subrip";
      } else if (type === "vtt") {
        type = "captions";
        accept = "text/vtt";
      }
      const token = decodeToken(req.headers.authorization);
      const extraHeaders = {
        Accept: accept,
      };
      const service = new Service();
      service
        .get(`/${req.params.id}/${type}`, token, extraHeaders)
        .then((response) => {
          const { data } = response;
          res.send(data);
        })
        .catch((error) => {
          console.log("error: ", error);
          if (error && error.response) {
            res.status(error.response.status).send({
              error: error.response.data,
              status: error.response.status,
            });
          } else {
            res.status(400).send({ error: "Bad Request" });
          }
        });
    }
  } catch (error) {
    res.status(400).send({ error: "Bad request" });
    console.log("error: ", error);
  }
};

module.exports = {
  getTranscription,
};
