const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
});

const putUpload = async (params) => s3.putObject(params);

module.exports = {
  putUpload,
};
