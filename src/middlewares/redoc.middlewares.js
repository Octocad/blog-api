// src/middlewares/redoc.middleware.js
const path = require('path');
const redoc = require('redoc-express');

const redocMiddleware = redoc({
  title: 'Documentação da API',
  specUrl: '/docs/openapi.yaml', // caminho que você vai servir no express
  theme: {
    colors: {
      primary: {
        main: '#007bff'
      }
    },
    typography: {
      fontFamily: '"Helvetica Neue", Arial, sans-serif'
    }
  }
});

module.exports = redocMiddleware;
