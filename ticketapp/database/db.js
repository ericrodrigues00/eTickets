const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/tex', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erro na conexão com o MongoDB:'));
db.once('open', () => {
  console.log('Conexão com o MongoDB estabelecida.');
});

module.exports = db;
