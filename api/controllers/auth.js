import AuthService from "../services/auth.js";

class AuthController {
    static async login(req, res) {
        const result = await AuthService.login(req, res);
        res.json(result);
    }

    static async register(req, res) {
        const result = await AuthService.register(req, res);
        res.json(result);
    }
}

export default AuthController;