import db from '../src/models';

class Permission {

	static async create(req) {
		try {
			const data = req.body;
			await db.Permissions.create(data);

			// TODO: add localization
			return { type: true, message: 'Permission created' };
		}
		catch (error) {
			return { type: false, message: error.message };
		}
	}

	static async get(req) {
		try {
			const permissions = await db.Permissions.findAll({
				where: { is_removed: false },
				attributes: [ 'id', 'name' ]
			});

			// TODO: add localization
			return { type: true, message: 'Permissions fetched successfully', data: permissions };
		}
		catch (error) {
			return { type: false, message: error.message };
		}
	}

}

export default Permission;