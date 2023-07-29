import db from '../src/models';

class Role {

	static async get(req) {
		try {
			const roles = await db.Roles.findAll({
				where: { is_removed: false }
			});

			// TODO: add localization
			return { type: true, message: 'Roles fetched successfully', data: roles };
		}
		catch (error) {
			return { type: false, message: error.message };
		}
	}

	static async assignPermission(req) {
		try {
			const { role_id, permission_id } = req.body;

			const role = await db.Roles.findOne({ where: { id: role_id } });
			const permission = await db.Permissions.findOne({ where: { id: permission_id } });

			// TODO: add localization
			if (!role || !permission) {
				return { type: false, message: 'Role or permission not found' };
			}

			const rolePermission = await db.RolePermissions.findOrCreate({
				where: { role_id: role_id, permission_id: permission_id },
				defaults: { role_id: role_id, permission_id: permission_id }
			});

			// TODO: add localization
			if (!rolePermission[1]) {
				return { type: false, message: 'Permission already assigned to role' };
			}
			return { type: true, message: 'Permission assigned to role', data: rolePermission[0] };
		}
		catch (error) {
			return { type: false, message: error.message };
		}
	}

}

export default Role;