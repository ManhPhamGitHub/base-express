require("dotenv").config();

const domains = {
  CURRENT_URL: process.env.CURRENT_URL || 'http://localhost:3008',
}

const store = {
  IMAGE_ASSET: __dirname + '/public/images',
  IMAGE_FOLDER: __dirname + '/public/api/v1/images',
  EXPORT_FOLDER: __dirname + '/public/api/v1/exports',
  IMAGE_URL: domains.CURRENT_URL + '/api/v1/images',
  EXPORT_URL: domains.CURRENT_URL + '/api/v1/exports',
};

const dbMongo = {
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/base-express',
  IS_AUTH: process.env.IS_AUTH || false,
};

const server = {
  JWT_KEY: process.env.JWT_KEY || 'jWtkeymInhPvd3vel0pment',
  JWT_TOKEN_LIFETIME: process.env.JWT_TOKEN_LIFETIME || '1d',
  API_VERSION: process.env.API_VERSION || "/api/v1",
};

const mail = {
  PORT_MAIL: process.env.PORT_MAIL || 465,
  HOST_MAIL: process.env.HOST_MAIL || "smtp.gmail.com",
  USER_MAIL: process.env.USER_MAIL || "noreply.fvision@gmail.com",
  PASS_MAIL: process.env.PASS_MAIL || "qlsyltbebgxgmkzk",
  SECURE_MAIL: process.env.SECURE_MAIL || true,
  SENDER_MAIL: process.env.SENDER_MAIL || 'Corgi Token Support',
  SERVICE_MAIL: process.env.SERVICE_MAIL || 'gmail',
};


module.exports = {
  dbMongo,
  server,
  mail,
  store,
};
