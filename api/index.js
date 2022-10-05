import express from 'express';
import parser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import pub from './public';
import priv from './private';
import admin from './admin';

const PORT = process.env.PORT || 3000;
const oneDay = 1000 * 60 * 60 * 24;

const app = express();

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(session({
	secret: process.env.SESSION_SECRET,
	saveUninitialized: true,
	cookie: { maxAge: oneDay },
	resave: false
}));
app.use(cookieParser());

app.use('/public', pub);
app.use('/private', priv);
app.use('/', admin);

app.get('/health', (req, res) => {
	return res.json({ type: true, message: 'Server is up and running' });
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

export default app;