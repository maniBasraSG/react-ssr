require('dotenv').config();

const config = {
  API: {
    url: process.env.BASE_API,
  },
  MODE: process.env.MODE,
};

module.exports = config;
