import express from 'express';
import fs from 'fs';
import General from '../helpers/General';

const app = express();
const routeDir = __dirname + '/routes';

fs.readdirSync(routeDir).filter((file) => {
	return (file.indexOf('.') !== 0) && (file !== 'index.js');
}).forEach((file) => {
	const routeName = file.split('.')[0];
	import(`./routes/${routeName}`).then((route) => {
		app.use(`/${routeName}`, General.authorizeBySession, General.authorizeSysAdmin, route.default);
	});
});

export default app;