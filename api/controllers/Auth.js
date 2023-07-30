/**
 * @typedef LoginUser
 * @property {string} email.required
 * @property {string} password.required
 * @property {boolean} isRememberMe
 */

/**
 * @typedef RegisterUser
 * @property {string} name.required
 * @property {string} surname.required
 * @property {string} email.required
 * @property {string} username.required
 * @property {string} password.required
 */

import AuthService from '../services/Auth';
import AuthValidation from '../validations/Auth';
import Response from '../helpers/Response';
import { ResponseTypes } from '../src/enum';

class Auth {

	/**
	 * @route POST /auth/login
	 * @group Auth
	 * @description Login user
	 * @param {LoginUser.model} LoginUser.body.required
	 * @returns {object} 200 - Success response
	 * @returns {object} 401 - Invalid credentials
	 * @returns {object} 500 - Server error
	 */
	static async login(req, res) {
		try {
			const validationResult = AuthValidation.login(req.body, req.headers.lang);
			if (!validationResult.type) {
				return res.json(Response.response(ResponseTypes.ERROR, validationResult.message));
			}
			const result = await AuthService.login(req, res);
			if (!result.type) {
				return res.json(Response.response(ResponseTypes.ERROR, result.message));
			}
			return res.json(Response.response(ResponseTypes.SUCCESS, result.message, result.user));
		}
		catch (error) {
			return res.json(Response.response(ResponseTypes.ERROR, error.message));
		}
	}

	/**
	 * @route POST /auth/register
	 * @group Auth
	 * @description Register user
	 * @param {RegisterUser.model} RegisterUser.body.required
	 * @returns {object} 200 - Success response
	 * @returns {object} 500 - Server error
	 */
	static async register(req, res) {
		try {
			const validationResult = AuthValidation.register(req.body, req.headers.lang);
			if (!validationResult.type) {
				return res.json(Response.response(ResponseTypes.ERROR, validationResult.message));
			}
			const result = await AuthService.register(req, res);
			if (!result.type) {
				return res.json(Response.response(ResponseTypes.ERROR, result.message));
			}
			return res.json(Response.response(ResponseTypes.SUCCESS, result.message));
		}
		catch (error) {
			return res.json(Response.response(ResponseTypes.ERROR, error.message));
		}
	}

	/**
	 * @route GET /auth/logout
	 * @group Auth
	 * @description Logout user
	 * @returns {object} 200 - Success response
	 * @returns {object} 500 - Server error
	 */
	static async logout(req, res) {
		try {
			const result = await AuthService.logout(req, res);
			if (!result.type) {
				return res.json(Response.response(ResponseTypes.ERROR, result.message));
			}
			return res.json(Response.response(ResponseTypes.SUCCESS, result.message));
		}
		catch (error) {
			return res.json(Response.response(ResponseTypes.ERROR, error.message));
		}
	}

}

export default Auth;