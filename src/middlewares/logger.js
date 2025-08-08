// middlewares/logger.js
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next(); // segue para o próximo middleware ou rota
};

module.exports = logger;
