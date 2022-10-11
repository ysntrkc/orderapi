import AuthService from '../services/auth.js';
import AuthValidation from '../validations/auth.js';

/**
 * @typedef new_user
 * @property {string} username.required
 * @property {string} email.required
 * @property {string} password.required
 */

/**
 * @typedef login_user
 * @property {string} email.required
 * @property {string} password.required
 * @property {boolean} isRememberMe
 */

class AuthController {

	/**
	 * @route POST /public/auth/login
	 * @group Auth
	 * @param {login_user.model} login_user.body.required
	 * @produces application/json
	 * @consumes application/json
	 * @returns {object} 200 - An array of user info
	 * @returns {object} 401 - Invalid credentials
	 * @returns {object} 500 - Server error
	 */
	static async login(req, res) {
		const validate = await AuthValidation.validateLogin(req, res);
		if (validate.type === false) {
			return res.json({ type: false, message: validate.message });
		}

		const result = await AuthService.login(req, res);
		if (result.type) {
			return res.json({ user: result.user, type: true, message: result.message });
		}
		else {
			return res.json({ type: true, message: result.message });
		}
	}

	/**
	 * @route POST /public/auth/register
	 * @group Auth
	 * @param {new_user.model} new_user.body.required
	 * @produces application/json
	 * @consumes application/json
	 * @returns {object} 200 - An array of user info
	 * @returns {object} 401 - Invalid credentials
	 * @returns {object} 500 - Server error
	 */
	static async register(req, res) {
		const validate = await AuthValidation.validateRegister(req, res);
		if (validate.type === false) {
			return res.json({ type: false, message: validate.message });
		}

		const result = await AuthService.register(req, res);
		if (result.type) {
			return res.json({ type: true, message: result.message });
		}
		else {
			return res.json({ type: false, message: result.message });
		}
	}

	/**
	 * @route POST /public/auth/logout
	 * @group Auth
	 * @returns {object} 200 - An array of user info
	 * @returns {object} 500 - Server error
	 */
	static async logout(req, res) {
		const result = await AuthService.logout(req, res);
		if (result.type) {
			return res.json({ type: true, message: result.message });
		}
		else {
			return res.json({ type: false, message: result.message });
		}
	}

}

export default AuthController;