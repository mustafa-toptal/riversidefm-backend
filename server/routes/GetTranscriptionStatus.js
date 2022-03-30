const { Service } = require("../utils/AxiosService");
const { decodeToken } = require("../utils/Helpers");

const getTranscriptionStatusById = (req, res) => {
  try {
    if (!req.params.id) {
      res.status(400).send({ error: "please provide task Id" });
    } else if (!req.headers.authorization) {
      res.status(401).send({ error: "Unauthenticated" });
    } else {
      const token = decodeToken(req.headers.authorization);

      const service = new Service();
      service
        .get(`/${req.params.id}`, token)
        .then((response) => {
          console.log("response: ", response);
          const { data } = response;
          const responseData = {
            id: data.id,
            createdAt: data.created_on,
            completedOn: data.completed_on,
            fileName: data.name,
            status: data.status,
            duration: data.duration_seconds,
            type: data.type,
            language: data.language,
            transcriber: data.transcriber,
          };
          res.send(responseData);
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
    console.log("error: ", error);
    res.status(400).send({ error: "Bad request" });
  }
};

module.exports = {
  getTranscriptionStatusById,
};
