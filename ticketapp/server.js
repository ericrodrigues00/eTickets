const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database/db'); // Importa o arquivo de conexão com o MongoDB
const routes = require('./routes/routes');

const app = express();
const port = 2000;

app.use(bodyParser.json());

// Defina suas rotas aqui
app.use('/', routes);

app.listen(port, () => {
  console.log(`Servidor Express rodando na porta ${port}`);
});
