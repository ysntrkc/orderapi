import User from '../services/user';

class User {

	static async getAllUsers(req, res) {
		const result = await User.getAllUsers();
		if (result.type) {
			return res.status(200).json({ data: result.data, type: true, message: result.message });
		}
		else {
			return res.status(500).json({ type: false, message: result.message });
		}
	}

	static async getUser(req, res) {
		const result = await User.getUser(req.params.id);
		if (result.type) {
			return res.status(200).json({ data: result.data, type: true, message: result.message });
		}
		else {
			return res.status(500).json({ type: false, message: result.message });
		}
	}

	static async deleteUser(req, res) {
		const result = await User.deleteUser(req.params.id);
		if (result.type) {
			return res.status(200).json({ type: true, message: result.message });
		}
		else {
			return res.status(500).json({ type: false, message: result.message });
		}
	}

	static async createPermission(req, res) {
		const result = await User.createPermission(req.body);
		if (result.type) {
			return res.status(200).json({ type: true, message: result.message });
		}
		else {
			return res.status(500).json({ type: false, message: result.message });
		}
	}

	static async addPermissionToRole(req, res) {
		const result = await User.addPermissionToRole(req.body);
		if (result.type) {
			return res.status(200).json({ type: true, message: result.message });
		}
		else {
			return res.status(500).json({ type: false, message: result.message });
		}
	}

	static async getPermissions(req, res) {
		const result = await User.getPermissions();
		if (result.type) {
			return res.status(200).json({ data: result.data, type: true, message: result.message });
		}
		else {
			return res.status(500).json({ type: false, message: result.message });
		}
	}

	static async addRoleToUser(req, res) {
		const result = await User.addRoleToUser(req.body);
		if (result.type) {
			return res.status(200).json({ type: true, message: result.message });
		}
		else {
			return res.status(500).json({ type: false, message: result.message });
		}
	}

	static async getRoles(req, res) {
		const result = await User.getRoles();
		if (result.type) {
			return res.status(200).json({ data: result.data, type: true, message: result.message });
		}
		else {
			return res.status(500).json({ type: false, message: result.message });
		}
	}

}

export default User;