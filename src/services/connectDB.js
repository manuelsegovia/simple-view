const { MongoClient } = require('mongodb');
const { DB_URI, DB_OPTIONS } = require('./dbConfig');

const main = async (crud, col, data) => {
  const client = new MongoClient(DB_URI, DB_OPTIONS);
  try {
    await client.connect();
    const result = await crud(client, col, data);
    return result;
  } catch (e) {
    console.log(e.message);
  } finally {
    await client.close();
  }
};

module.exports = {
  main,
};
