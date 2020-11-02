const {
  addReference,
  listOfReferences,
} = require('../handlers/referenceHandler');

module.exports = [
  {
    method: 'GET',
    path: '/api/v1/references',
    handler: listOfReferences,
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
