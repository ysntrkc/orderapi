import db from '../../src/models';

class User {

	static async getAllUsers() {
		try {
			const users = await db.Users.findAll({ attributes: { exclude: [ 'password' ] } });
			if (users) {
				return { type: true, message: 'Users found', data: JSON.parse(JSON.stringify(users)) };
			}
			else {
				return false;
			}
		}
		catch (error) {
			throw error;
		}
	}

	static async getUser(id) {
		try {
			const user = await db.Users.findOne({ where: { id: Number(id) }, attributes: { exclude: [ 'password' ] } });
			if (user) {
				return { type: true, message: 'User found', data: JSON.parse(JSON.stringify(user)) };
			}
			else {
				return { type: false, message: 'User not found' };
			}
		}
		catch (error) {
			throw error;
		}
	}

	static async deleteUser(id) {
		try {
			const user = await db.Users.findOne({ where: { id: Number(id) }, include: { model: db.Roles } });
			if (user && user.Roles[0].id === 3) {
				await db.UserRoles.destroy({ where: { user_id: Number(id) } });
				await db.Users.destroy({ where: { id: Number(id) } });
				return { type: true, message: 'User deleted' };
			}
			else {
				return { type: false, message: 'User not found' };
			}
		}
		catch (error) {
			throw error;
		}
	}

	static async createPermission(body) {
		try {
			const data = {
				description: body.description,
				createdAt: new Date(),
				updatedAt: new Date()
			};
			const permission = await db.Permissions.create(data);
			return { type: true, message: 'Permission created', data: permission };
		}
		catch (error) {
			throw error;
		}
	}

	static async addPermissionToRole(body) {
		try {
			const data = {
				role_id: body.role_id,
				permission_id: body.permission_id,
				createdAt: new Date(),
				updatedAt: new Date()
			};
			const permission = await db.RolePermissions.create(data);
			return { type: true, message: 'Permission assigned to role', data: permission };
		}
		catch (error) {
			throw error;
		}
	}

	static async getPermissions() {
		try {
			const permissions = await db.Permissions.findAll();
			if (permissions) {
				return { type: true, message: 'Permissions found', data: JSON.parse(JSON.stringify(permissions)) };
			}
			else {
				return { type: false, message: 'Permissions not found' };
			}
		}
		catch (error) {
			throw error;
		}
	}

	static async addRoleToUser(body) {
		try {
			if (body.role_id === 1) {
				return { type: false, message: 'Cannot assign sys_admin role to user' };
			}
			else {
				const data = {
					user_id: body.user_id,
					role_id: body.role_id,
					createdAt: new Date(),
					updatedAt: new Date()
				};
				const userRole = await db.UserRoles.create(data);
				return { type: true, message: 'Role assigned to user', data: userRole };
			}

		}
		catch (error) {
			throw error;
		}
	}

	static async getRoles() {
		try {
			const roles = await db.Roles.findAll({ exclude: [ 'createdAt', 'updatedAt' ] });
			const parsedRoles = JSON.parse(JSON.stringify(roles));
			return { type: true, message: 'Roles found', data: parsedRoles};
		}
		catch (error) {
			throw error;
		}
	}

}

export default User;