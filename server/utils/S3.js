const FormData = require("form-data");

const { Signature } = require("./Signature");
const { Policy } = require("./Policy");
const { xAmzDate, dateYMD } = require("./Date");

const deleteFile = (fileName) => {
  const config = {
    bucketName: process.env.AWS_BUCKET_NAME,
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  };
  const fd = new FormData();
  const url = `https://${process.env.AWS_BUCKET_NAME}.s3-${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
  fd.append("Date", xAmzDate);
  fd.append("X-Amz-Date", xAmzDate);
  fd.append(
    "Authorization",
    Signature.getSignature(config, dateYMD, Policy.getPolicy(config))
  );
  fd.append("Content-Type", "text/plain");

  const date = xAmzDate;
  const amzDate = xAmzDate;
  const signature = Signature.getSignature(
    config,
    dateYMD,
    Policy.getPolicy(config)
  );
  const contentType = "text/plain";

  return {
    date,
    amzDate,
    signature,
    url,
    contentType,
  };
};

module.exports = {
  deleteFile,
};
