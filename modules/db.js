const configs = require('../configs');
const mongoose = require('mongoose');

// db options
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

if (configs.dbMongo.IS_AUTH) {
  const fs = require('fs');
  const ca = fs.readFileSync(`${__dirname}/rds-combined-ca-bundle.pem`);
  options.sslValidate = true;
  options.sslCA = ca;
  options.ssl = true;
}


const connect = (canConnectWhenError = true) => {
  // const uri = process.env.NODE_ENV === 'test'? configs.dbMongo.MONGO_URI_TEST : configs.dbMongo.MONGO_URI;
  const uri = configs.dbMongo.MONGO_URI;
  mongoose.connect(uri, options)
    .then(() => {
      console.log(`Connected mongodb successfully: ${uri}`);
      mongoose.connection.on('disconnected', function (e) {
        setTimeout(function () {
          console.log('reconnect with mongodb');
          connect(false);
        }, 2000);
      });

    }, err => {
      console.log(`Error while connecting to mongodb\n${err}`);
      if (canConnectWhenError) {
        setTimeout(function () {
          connect(true);
        }, 2000);
      }
    });
};

module.exports = {
  connect,
};