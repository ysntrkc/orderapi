import path from 'path';
import express from 'express';
import General from '../helpers/General';

const app = express();
const basename = path.basename(__filename);

const folderRoute = path.join(__dirname, '../routes');
require('fs')
	.readdirSync(folderRoute)
	.filter(file => !file.startsWith('.') && file !== basename && file.endsWith('.js'))
	.forEach(file => {
		const routeName = General.getFileRoute(file);

		if (routeName === 'auth') {
			app.use(
				`/${routeName}`,
				require(`./${file}`).default,
			);
		}
		else if ([ 'user', 'role', 'permission' ].includes(routeName)) {
			app.use(
				`/${routeName}`,
				General.authorizeBySession,
				General.authorizeSysAdmin,
				require(`./${file}`).default,
			);
		}
		else {
			app.use(
				`/${routeName}`,
				General.authorizeBySession,
				require(`./${file}`).default,
			);
		}
	});

export default app;
