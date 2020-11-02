const DB = 'dwg-specs';
const DB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@cluster0.pwboz.mongodb.net/${DB}?retryWrites=true&w=majority`;
const DB_OPTIONS = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

module.exports = {
  DB_URI,
  DB_OPTIONS,
  DB,
};

// mongodb+srv://<username>:<password>@cluster0.pwboz.mongodb.net/<dbname>?retryWrites=true&w=majority
