const { Service } = require("../utils/AxiosService");
const { decodeToken } = require("../utils/Helpers");

const deleteTranscription = (req, res) => {
  try {
    if (!req.params.id) {
      res.status(400).send({ error: "please provide task Id" });
    } else if (!req.headers.authorization) {
      res.status(401).send({ error: "Unauthenticated" });
    } else {
      const token = decodeToken(req.headers.authorization);

      const service = new Service();
      service
        .delete(`/${req.params.id}?force=true`, token)
        .then((response) => {
          const { data } = response;
          res.send(data);
        })
        .catch((error) => {
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
  } catch (err) {
    res.status(400).send({ error: "Bad Request" });
  }
};

module.exports = {
  deleteTranscription,
};
