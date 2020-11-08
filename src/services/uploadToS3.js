const AWS = require('aws-sdk');

// const bucketName = 'drawing-repo';

const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  // params: { Bucket: bucketName },
});
const options = { partSize: 10 * 1024 * 1024, queueSize: 5 };

const myUpload = async (params) => {
  const fileRespo = await s3.upload(params, options).promise();
  return fileRespo;
};

module.exports = {
  myUpload,
};
