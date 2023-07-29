import db from '../src/models';
import { RoleTypes } from '../src/enum';

class User {

	static async getAll(req) {
		try {
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
					'username'
				]
			});
			// TODO: add localization
			return { type: true, message: 'Users fetched successfully', data: users };
		}
		catch (error) {
			return { type: false, message: error.message };
		}
	}

	static async get(req) {
		try {
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
					'username'
				]
			});
			// TODO: add localization
			if (!user) {
				return { type: false, message: 'User not found' };
			}
			return { type: true, message: 'User fetched successfully', data: user };
		}
		catch (error) {
			return { type: false, message: error.message };
		}
	}

	static async delete(req) {
		try {
			const { id } = req.params;
			const user = await db.Users.update({
				is_removed: true
			}, {
				where: { id: id }
			});

			// TODO: add localization
			return { type: true, message: 'User deleted successfully' };
		}
		catch (error) {
			return { type: false, message: error.message };
		}
	}

	static async update(req) {
		try {
			const { id } = req.params;
			const data = req.body;
			await db.Users.update(data, { where: { id: id } });

			// TODO: add localization
			return { type: true, message: 'User updated successfully' };
		}
		catch (error) {
			return { type: false, message: error.message };
		}
	}

	static async assignRole(req) {
		try {
			const { user_id, role_id } = req.body;

			// TODO: add localization
			if (role_id === RoleTypes.SYS_ADMIN) {
				return { type: false, message: 'Cannot assign system admin role' };
			}

			const user = await db.Users.findOne({ where: { id: user_id } });
			const role = await db.Roles.findOne({ where: { id: role_id } });

			// TODO: add localization
			if (!user || !role) {
				return { type: false, message: 'User or role not found' };
			}

			const userRole = await db.UserRoles.findOrCreate({
				where: { user_id: user_id, role_id: role_id },
				defaults: { user_id: user_id, role_id: role_id }
			});

			// TODO: add localization
			if (!userRole[1]) {
				return { type: false, message: 'Role already assigned to user' };
			}
			return { type: true, message: 'Role assigned to user', data: userRole[0] };
		}
		catch (error) {
			return { type: false, message: error.message };
		}
	}

}

export default User;