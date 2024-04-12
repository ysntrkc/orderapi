import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import http from 'http';
import session from 'express-session';
import expressSwagger from 'express-swagger-generator';

import routes from './routes';
import options from './src/config/settings';
const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);

expressSwagger(app)(options);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use(session({
	secret: process.env.SESSION_SECRET,
	saveUninitialized: true,
	cookie: {
		maxAge: 1000 * 60 * 60 * 24,	// 1 day
	},
	resave: false,
}));

app.use((req, _res, next) => {
	req.headers.lang = req.headers.lang || 'tr';
	next();
});

app.use('/', routes);

app.get('/health', (_req, res) => {
	return res.json({
		type: true,
		message: 'Server is up and running',
	});
});

server.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

export default app;
