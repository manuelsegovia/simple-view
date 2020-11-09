const {
  addReference,
  listOfReferences,
  getPdf,
} = require('../handlers/referenceHandler');

module.exports = [
  {
    method: 'GET',
    path: '/api/v1/references',
    handler: listOfReferences,
  },
  {
    method: 'GET',
    path: '/api/v1/references/{referenceNumber}',
    handler: getPdf,
  },
  {
    method: 'POST',
    path: '/api/v1/references',
    options: {
      payload: {
        output: 'stream',
        parse: true,
        multipart: true,
        maxBytes: 10 * 1024 * 1024,
      },
      handler: addReference,
    },
  },
];
