require('dotenv').config();

module.exports = {
  "development": {
    "username": "postgres",
    "password": "postgres",
    "database": "orderapi_dev",
    "host": "127.0.0.1",
    "dialect": "postgres",
  },
  "test": {
    "username": "postgres",
    "password": "postgres",
    "database": "orderapi_test",
    "host": "127.0.0.1",
    "dialect": "postgres",
  },
  "prod": {
    "username": "postgres",
    "password": "postgres",
    "database": "orderapi_prod",
    "host": "127.0.0.1",
    "dialect": "postgres",
  }
}