# OrderAPI

## Description

This is a Node.js-based RESTful API for managing orders. It uses the Express framework and PostgreSQL for data storage.

## Installation

1. Clone the repository:

`git clone https://github.com/ysntrkc/orderapi.git`

2. Install dependencies:

`npm install`

3. Create database:

```
npx sequelize-cli db:create
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

4. Create .env file in the root directory and add the following:

```
PORT=3000
NODE_ENV=development
HOST=localhost
SEQUELIZE_LOGGING=false

SESSION_SECRET=<your-session-secret>
JWT_SECRET=<your-jwt-secret>
PASSWORD_SALT=<your-password-salt>
```

1. Run the server:

`npm start`

## Usage

You can see endpoints by running the server and going to `http://localhost:3000/api-docs/`.