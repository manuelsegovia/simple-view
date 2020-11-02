const { DB } = require('./dbConfig');

const addDocument = async (client, dbCol, data) => {
  try {
    const result = await client.db(DB).collection(dbCol).insertOne(data);
    console.log(result);
    console.log(result.ops[0]);
    return result.ops[0];
  } catch (error) {
    console.log(error.code);
    console.log('from addDrawing', error.message);
    return error.code === 11000
      ? { errorCode: 11000, message: 'document duplicated' }
      : error.message;
  }
};

const getAllDocuments = async (client, dbCol, data) => {
  const cursor = await client.db(DB).collection(dbCol).find(data);
  const result = await cursor.toArray();
  return result;
};

module.exports = {
  addDocument,
  getAllDocuments,
};
