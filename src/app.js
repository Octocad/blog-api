//só configura e (monta rotas e middleware) e exporta o app
const express = require('express');
const dotenv = require('dotenv');
const postRoutes = require('./routes/post.routes');
const logger = require('./middlewares/logger');
const path = require('path');
const redocMiddleware = require('./middlewares/redoc.middlewares.js');

const app = express();
app.use(express.json());
app.use(logger);

app.use('/posts', postRoutes);

app.use('/docs', express.static(path.join(__dirname, 'docs')));

// Servir o arquivo YAML da documentação
//app.use('./docs', express.static(path.join(__dirname, 'src', 'docs')));

// Rota da documentação no Redoc
app.get('/api-docs', redocMiddleware);

const PORT = process.env.PORT || 3020;
app.listen(PORT, () => {
  console.log(`Documentação disponível em http://localhost:${PORT}/api-docs`);
});

app.get('/', (req, res) => {
  res.send('API do Blog rodando!');
});

module.exports = app;
