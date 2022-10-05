require('dotenv').config();

module.exports = {
  "development": {
    "username": "node_user",
    "password": "12345",
    "database": "orderapi",
    "host": "localhost",
    "dialect": "postgres",
  },
  "test": {
    "username": "node_user",
    "password": "12345",
    "database": "orderapi",
    "host": "localhost",
    "dialect": "postgres",
  },
  "production": {
    "username": "node_user",
    "password": "12345",
    "database": "orderapi",
    "host": "localhost",
    "dialect": "postgres",
  }
}