const { s3 } = require("../server");
const { deleteFile } = require("../utils/S3");

const DeleteMediaS3 = async (req, res) => {
  try {
    if (!req.params.key) {
      res.status(400).send({ error: "please provide key" });
    } else {
      try {
        res.send({ headers: deleteFile(req.params.key) });
      } catch (error) {
        console.log("error: ", error);
        if (error && error.response) {
          res.status(error.response.status).send({
            error: error.response.data,
            status: error.response.status,
          });
        } else {
          res.status(400).send({ error: "Bad Request" });
        }
      }
    }
  } catch (error) {
    console.log("error: ", error);
    res.status(400).send({ error: "Bad request" });
  }
};

module.exports = {
  DeleteMediaS3,
};
