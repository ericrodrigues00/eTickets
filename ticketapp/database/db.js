const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:adminadmin@cluster0.lcxcczi.mongodb.net/tex', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erro na conexão com o MongoDB:'));
db.once('open', () => {
  console.log('Conexão com o MongoDB estabelecida.');
});

module.exports = db;
