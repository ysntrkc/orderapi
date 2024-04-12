import db from '../src/models';
import { Lang } from '../src/enum';

class Role {

	static async get(req) {
		try {
			const { lang } = req.headers;
			const roles = await db.Roles.findAll({
				where: { is_removed: false },
				attributes: [ 'id', 'name' ],
			});

			return { type: true, message: Lang[lang].Role.getSuccess, data: roles };
		}
		catch (error) {
			return { type: false, message: error.message };
		}
	}

	static async assignPermission(req) {
		try {
			const { lang } = req.headers;
			const { role_id, permission_id } = req.body;

			const role = await db.Roles.findOne({ where: { id: role_id } });
			const permission = await db.Permissions.findOne({ where: { id: permission_id } });

			if (!role || !permission) {
				return { type: false, message: Lang[lang].RolePermission.notFound };
			}

			const rolePermission = await db.RolePermissions.findOrCreate({
				where: { role_id: role_id, permission_id: permission_id },
				defaults: { role_id: role_id, permission_id: permission_id },
			});

			if (!rolePermission[1]) {
				return { type: false, message: Lang[lang].RolePermission.alreadyExists };
			}
			return { type: true, message: Lang[lang].RolePermission.assignSuccess };
		}
		catch (error) {
			return { type: false, message: error.message };
		}
	}

}

export default Role;
