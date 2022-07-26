const { s3 } = require("../server");

const GetMediaURL = async (req, res) => {
  try {
    if (!req.params.key) {
      res.status(400).send({ error: "please provide key" });
    } else {
      try {
        const url = s3.getSignedUrl("getObject", {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: req.params.key,
          Expires: 60 * 30,
        });
        res.send({ url });
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
  GetMediaURL,
};
