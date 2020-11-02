require('dotenv').config();
const Hapi = require('@hapi/hapi');
const referenceRoute = require('./routes/referenceRoute');

const router = [...referenceRoute];

const init = async () => {
  const server = Hapi.server({
    port: process.env.port || 3000,
    host: 'localhost',
  });
  server.route(router);

  await server.start();
  console.log('Server running on %s', server.info.uri);
  server.events.on('response', (request) => {
    console.log(
      `${request.info.remoteAddress}: cycle:${
        request.info.completed - request.info.received
      }ms : ${request.method.toUpperCase()} -->${request.path}-->status code: ${
        request.response.statusCode
      }`
    );
  });
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
