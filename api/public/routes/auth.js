import express from 'express';
import AuthController from '../controllers/auth.js';

const app = express();

app.post('/login', AuthController.login);
app.post('/register', AuthController.register);
app.post('/logout', AuthController.logout);
app.post('/loginWU', AuthController.loginWithUsername);

export default app;