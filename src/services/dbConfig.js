const DB = 'dwg-specs';
const DB_URI = `mongodb+srv://msegovia:Chiquito57@cluster0.pwboz.mongodb.net/dwg-specs?retryWrites=true&w=majority`;
const DB_OPTIONS = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

module.exports = {
  DB_URI,
  DB_OPTIONS,
  DB,
};
