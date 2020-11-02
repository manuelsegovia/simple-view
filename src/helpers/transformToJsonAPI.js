const apiStd = (data) => ({
  type: 'references',
  id: data._id,
  attributes: {
    referenceNumber: data.referenceNumber,
    referenceRevision: data.referenceRevision,
  },
  links: {
    self: `api/v1/references/${data._id}`,
    refFile: `${process.env.S3_LOCATION}${data.fileNameAWS}`,
  },
});

module.exports = {
  apiStd,
};
