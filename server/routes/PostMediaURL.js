const { s3 } = require("../server");

const PostMediaURL = async (req, res) => {
  try {
    if (!req.params.key) {
      res.status(400).send({ error: "please provide key" });
    } else {
      try {
        const headers = s3.createPresignedPost({
          Bucket: process.env.AWS_BUCKET_NAME,
          Fields: {
            Key: req.params.key,
          },
          Expires: 60 * 30,
        });
        res.send({
          headers,
        });
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
  PostMediaURL,
};
