//só configura e (monta rotas e middleware) e exporta o app
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const postRoutes = require('./routes/post.routes');
const logger = require('./middlewares/logger');
const path = require('path');
const redocMiddleware = require('./middlewares/redoc.middlewares.js');


const app = express();
const allowedOrigins = (process.env.FRONT_URLS || 'http://localhost:5173,http://localhost:8002')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);

function isLocalhostOrigin(origin) {
  try {
    const url = new URL(origin);
    return url.hostname === 'localhost' || url.hostname === '127.0.0.1';
  } catch (e) {
    return false;
  }
}

app.use(cors({ origin: function(origin, callback) {
  if (!origin) return callback(null, true); // server-to-server or tools without Origin
  if (allowedOrigins.indexOf(origin) !== -1) return callback(null, true);
  if (isLocalhostOrigin(origin)) return callback(null, true);
  return callback(new Error('CORS policy: origin not allowed'));
}}));
app.use(express.json());
app.use(logger);

app.use('/posts', postRoutes);

app.use('/docs', express.static(path.join(__dirname, 'docs')));

// Servir o arquivo YAML da documentação
//app.use('./docs', express.static(path.join(__dirname, 'src', 'docs')));

// Rota da documentação no Redoc
app.get('/api-docs', redocMiddleware);

// O servidor é iniciado em `src/server.js`. Apenas exportamos o app aqui.

app.get('/', (req, res) => {
  res.send('API do Blog rodando!');
});

// Middleware global de tratamento de erros
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err && err.stack ? err.stack : err);
  if (err && String(err.message).toLowerCase().includes('cors')) {
    return res.status(403).json({ error: err.message || 'CORS error' });
  }
  res.status(err && err.status ? err.status : 500).json({ error: err.message || 'Internal Server Error' });
});

module.exports = app;
