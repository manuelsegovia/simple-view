const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  // params: { Bucket: bucketName },
});

const options = { partSize: 10 * 1024 * 1024, queueSize: 5 };

const myUpload = async (params) => {
  // console.log(params);
  const fileRespo = await s3.upload(params, options).promise();
  // console.log(fileRespo);
  return fileRespo;
};

module.exports = {
  myUpload,
};
