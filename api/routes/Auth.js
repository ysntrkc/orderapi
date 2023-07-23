import express from 'express';
import AuthController from '../controllers/Auth.js';

const app = express();

app.post('/login', AuthController.login);
app.post('/register', AuthController.register);
app.get('/logout', AuthController.logout);

export default app;