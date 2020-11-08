const { main } = require('../services/connectDB');
const { addDocument, getAllDocuments } = require('../services/methodsDB');
const { stdName } = require('../helpers/stdFileName');
const { myUpload } = require('../services/uploadToS3');
const { apiStd } = require('../helpers/transformToJsonAPI');
const { putUpload } = require('../services/putS3');

const DB_COL = 'references';
const bucketName = process.env.S3_BUCKET_NAME;
// Insert Document to Mongo and Upload to S3
const addReference = async (request, h) => {
  const thePayload = request.payload.fileRef;
  const referenceRevision =
    request.payload.referenceRevision.toUpperCase() || 'New';
  const theFname = thePayload.hapi.filename;
  const validFileData = stdName(theFname, referenceRevision);
  // check if file is valid (PDF,  or Image)
  if (validFileData.mimeType === 'invalid') {
    return validFileData;
  }
  // Send data to MongoDb
  const dataForMonogo = {
    referenceNumber: validFileData.theBase,
    referenceRevision,
    fileNameAWS: validFileData.newFileName,
    uploadDate: Date.now(),
  };
  const add = await main(addDocument, DB_COL, dataForMonogo);
  if (add.errorCode) {
    return add;
  }
  // Upload file to S3,
  const paramsForS3 = {
    Bucket: bucketName,
    ContentDisposition: 'inline',
    ContentType: validFileData.mimeType,
    ACL: 'public-read-write',
    Key: validFileData.newFileName,
    Body: thePayload,
  };
  const toS3 = await myUpload(paramsForS3);
  console.log(toS3);
  return toS3;
  // try {
  //   const toS3 = await putUpload(paramsForS3);
  //   console.log(toS3);
  //   return toS3;
  // } catch (error) {
  //   console.log(error);
  // }
};
//++++++++++++++++++++++++++++
const listOfReferences = async (request, h) => {
  const results = await main(getAllDocuments, DB_COL, {});
  // const data = { results };
  // console.log(apiStd(data.results[0]));
  return { data: results.map(apiStd) };
};
module.exports = {
  addReference,
  listOfReferences,
};
