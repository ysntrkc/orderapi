import AdminService from "../services/admin";

class AdminController {
    static async getAllUsers(req, res) {
        const result = await AdminService.getAllUsers();
        if (result.type) {
            return res.status(200).json({ data: result.data, type: true, message: result.message });
        } else {
            return res.status(500).json({ type: false, message: result.message });
        }
    }

    static async getUser(req, res) {
        const result = await AdminService.getUser(req.params.id);
        if (result.type) {
            return res.status(200).json({ data: result.data, type: true, message: result.message });
        } else {
            return res.status(500).json({ type: false, message: result.message });
        }
    }

    static async deleteUser(req, res) {
        const result = await AdminService.deleteUser(req.params.id);
        if (result.type) {
            return res.status(200).json({ type: true, message: result.message });
        } else {
            return res.status(500).json({ type: false, message: result.message });
        }
    }

    static async createPermission(req, res) {
        const result = await AdminService.createPermission(req.body);
        if (result.type) {
            return res.status(200).json({ type: true, message: result.message });
        } else {
            return res.status(500).json({ type: false, message: result.message });
        }
    }

    static async addPermissionToRole(req, res) {
        const result = await AdminService.addPermissionToRole(req.body);
        if (result.type) {
            return res.status(200).json({ type: true, message: result.message });
        } else {
            return res.status(500).json({ type: false, message: result.message });
        }
    }

    static async getPermissions(req, res) {
        const result = await AdminService.getPermissions();
        if (result.type) {
            return res.status(200).json({ data: result.data, type: true, message: result.message });
        } else {
            return res.status(500).json({ type: false, message: result.message });
        }
    }

    static async addRoleToUser(req, res) {
        const result = await AdminService.addRoleToUser(req.body);
        if (result.type) {
            return res.status(200).json({ type: true, message: result.message });
        } else {
            return res.status(500).json({ type: false, message: result.message });
        }
    }

    static async getRoles(req, res) {
        const result = await AdminService.getRoles();
        if (result.type) {
            return res.status(200).json({ data: result.data, type: true, message: result.message });
        } else {
            return res.status(500).json({ type: false, message: result.message });
        }
    }
}

export default AdminController;