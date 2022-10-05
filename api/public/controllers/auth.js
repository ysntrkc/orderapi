import AuthService from '../services/auth.js';
import AuthValidation from '../validations/auth.js';

class AuthController {

	static async login(req, res) {
		const validate = await AuthValidation.validateLogin(req.body);
		if (validate.type === false) {
			return res.status(500).json({ type: false, message: validate.message });
		}

		const result = await AuthService.login(req, res);
		if (result.type) {
			return res.status(200).json({
				user: result.user,
				type: true, message:
                result.message });
		}
		else {
			return res.status(500).json({ type: false, message: result.message });
		}
	}

	static async register(req, res) {
		const validate = await AuthValidation.validateRegister(req.body);
		if (validate.type === false) {
			return res.status(500).json({ type: false, message: validate.message });
		}

		const result = await AuthService.register(req, res);
		if (result.type) {
			return res.status(200).json({ type: true, message: result.message });
		}
		else {
			return res.status(500).json({ type: false, message: result.message });
		}
	}

	static async logout(req, res) {
		const result = await AuthService.logout(req, res);
		if (result.type) {
			return res.status(200).json({ type: true, message: result.message });
		}
		else {
			return res.status(500).json({ type: false, message: result.message });
		}
	}

}

export default AuthController;