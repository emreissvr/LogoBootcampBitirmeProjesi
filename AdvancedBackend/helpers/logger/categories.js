const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'category-service' },  // product-service yaptım
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.File({ filename: 'logs/Categories/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/Categories/error.log', level: 'info' }),    
    new winston.transports.File({ filename: 'logs/Categories/combined.log' }),
  ],
});

module.exports = logger;