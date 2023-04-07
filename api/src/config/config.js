require('dotenv').config();

module.exports = {
  "development": {
    "username": "postgres",
    "password": "postgres",
    "database": "orderapi_dev",
    "host": "localhost",
    "dialect": "postgres",
  },
  "test": {
    "username": "postgres",
    "password": "postgres",
    "database": "orderapi_test",
    "host": "localhost",
    "dialect": "postgres",
  },
  "prod": {
    "username": "postgres",
    "password": "postgres",
    "database": "orderapi_prod",
    "host": "localhost",
    "dialect": "postgres",
  }
}