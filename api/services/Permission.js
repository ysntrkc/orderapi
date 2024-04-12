import db from '../src/models';
import { Lang } from '../src/enum';

class Permission {

	static async create(req) {
		try {
			const { lang } = req.headers;
			const data = req.body;
			await db.Permissions.create(data);

			return { type: true, message: Lang[lang].Permission.createSuccess };
		}
		catch (error) {
			return { type: false, message: error.message };
		}
	}

	static async get(req) {
		try {
			const { lang } = req.headers;
			const permissions = await db.Permissions.findAll({
				where: { is_removed: false },
				attributes: [ 'id', 'name' ],
			});

			return { type: true, message: Lang[lang].Permission.getSuccess, data: permissions };
		}
		catch (error) {
			return { type: false, message: error.message };
		}
	}

}

export default Permission;
