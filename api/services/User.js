import db from '../src/models';
import { RoleTypes, Lang } from '../src/enum';

class User {

	static async getAll(req) {
		try {
			const { lang } = req.headers;
			const users = await db.Users.findAll({
				where: { is_removed: false },
				attributes: [
					'id',
					[ db.Sequelize.fn('concat',
						db.Sequelize.col('name'),
						' ',
						db.Sequelize.col('surname')),
					'name' ],
					'email',
					'username',
				],
			});
			return { type: true, message: Lang[lang].User.getSuccess, data: users };
		}
		catch (error) {
			return { type: false, message: error.message };
		}
	}

	static async get(req) {
		try {
			const { lang } = req.headers;
			const { id } = req.params;
			const user = await db.Users.findOne({
				where: { id: id, is_removed: false },
				attributes: [
					'id',
					[ db.Sequelize.fn('concat',
						db.Sequelize.col('name'),
						' ',
						db.Sequelize.col('surname')),
					'name' ],
					'email',
					'username',
				],
			});
			if (!user) {
				return { type: false, message: Lang[lang].User.notFound };
			}
			return { type: true, message: Lang[lang].User.getSuccess, data: user };
		}
		catch (error) {
			return { type: false, message: error.message };
		}
	}

	static async delete(req) {
		try {
			const { lang } = req.headers;
			const { id } = req.params;
			await db.Users.update({
				is_removed: true,
			}, {
				where: { id: id },
			});

			return { type: true, message: Lang[lang].User.deleteSuccess };
		}
		catch (error) {
			return { type: false, message: error.message };
		}
	}

	static async update(req) {
		try {
			const { lang } = req.headers;
			const { id } = req.params;
			const data = req.body;
			await db.Users.update(data, { where: { id: id } });

			return { type: true, message: Lang[lang].User.updateSuccess };
		}
		catch (error) {
			return { type: false, message: error.message };
		}
	}

	static async assignRole(req) {
		try {
			const { lang } = req.headers;
			const { user_id, role_id } = req.body;

			if (role_id === RoleTypes.SYS_ADMIN) {
				return { type: false, message: Lang[lang].User.assignRoleError };
			}

			const user = await db.Users.findOne({ where: { id: user_id } });
			const role = await db.Roles.findOne({ where: { id: role_id } });

			if (!user || !role) {
				return { type: false, message: Lang[lang].User.roleOrUserNotFound };
			}

			const userRole = await db.UserRoles.findOrCreate({
				where: { user_id: user_id, role_id: role_id },
				defaults: { user_id: user_id, role_id: role_id },
			});

			if (!userRole[1]) {
				return { type: false, message: Lang[lang].User.roleAlreadyAssigned };
			}
			return { type: true, message: Lang[lang].User.assignRoleSuccess };
		}
		catch (error) {
			return { type: false, message: error.message };
		}
	}

}

export default User;
