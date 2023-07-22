import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import cors from 'cors';
import http from 'http';
import expressSwagger from 'express-swagger-generator';
import moduleAlias from 'module-alias';

import options from './src/config/settings';
import routes from './routes';

moduleAlias.addAliases({
	'@root': __dirname,
	'@api': __dirname + '/api',
	'@helpers': __dirname + '/api/helpers',
	'@src': __dirname + '/api/src',
	'@models': __dirname + '/api/src/models',
});

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
		maxAge: 1000 * 60 * 60 * 24	// 1 day
	},
	resave: false
}));

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Credentials', true);
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, language');
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
	req.headers.lang = req.headers.lang || 'tr';
	next();
});

app.use('/', routes);

app.get('/health', (req, res) => {
	return res.json({
		type: true,
		message: 'Server is up and running'
	});
});

server.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

export default app;