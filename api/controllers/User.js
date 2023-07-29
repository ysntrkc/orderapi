/**
 * @typedef UpdateUser
 * @property {string} name
 * @property {string} surname
 * @property {string} email
 * @property {string} username
 */

/**
 * @typedef AssignRole
 * @property {integer} user_id.required
 * @property {integer} role_id.required
 */

import UserSevice from '../services/User';
import UserValidation from '../validations/User';
import Response from '../helpers/Response';
import { ResponseTypes } from '../src/enum';

class User {

	/**
	 * @route GET /user/all
	 * @group User - Operations about user
	 * @summary Get all users
	 * @returns {object} 200 - Success
	 * @returns {Error}  default - Unexpected error
	 */
	static async getAll(req, res) {
		try {
			const result = await UserSevice.getAll(req, res);
			if (!result.type) {
				return res.json(Response.response(ResponseTypes.ERROR, result.message));
			}
			return res.json(Response.response(ResponseTypes.SUCCESS, result.message, result.data));
		}
		catch (error) {
			return res.json(Response.response(ResponseTypes.ERROR, error.message));
		}
	}

	/**
	 * @route GET /user/{id}
	 * @group User - Operations about user
	 * @summary Get user by id
	 * @param {integer} id.path.required
	 * @returns {object} 200 - Success
	 * @returns {Error}  default - Unexpected error
	 */
	static async get(req, res) {
		try {
			const result = await UserSevice.get(req, res);
			if (!result.type) {
				return res.json(Response.response(ResponseTypes.ERROR, result.message));
			}
			return res.json(Response.response(ResponseTypes.SUCCESS, result.message, result.data));
		}
		catch (error) {
			return res.json(Response.response(ResponseTypes.ERROR, error.message));
		}
	}

	/**
	 * @route DELETE /user/{id}
	 * @group User - Operations about user
	 * @summary Delete user by id
	 * @param {integer} id.path.required
	 * @returns {object} 200 - Success
	 * @returns {Error}  default - Unexpected error
	 */
	static async delete(req, res) {
		try {
			const result = await UserSevice.delete(req, res);
			if (!result.type) {
				return res.json(Response.response(ResponseTypes.ERROR, result.message));
			}
			return res.json(Response.response(ResponseTypes.SUCCESS, result.message, result.data));
		}
		catch (error) {
			return res.json(Response.response(ResponseTypes.ERROR, error.message));
		}
	}

	/**
	 * @route PUT /user
	 * @group User - Operations about user
	 * @summary Update user
	 * @param {UpdateUser.model} user.body.required
	 * @returns {object} 200 - Success
	 * @returns {Error}  default - Unexpected error
	 */
	static async update(req, res) {
		try {
			const validationResult = UserValidation.update(req.body);
			if (!validationResult.type) {
				return res.json(Response.response(ResponseTypes.ERROR, validationResult.message));
			}
			const result = await UserSevice.update(req, res);
			if (!result.type) {
				return res.json(Response.response(ResponseTypes.ERROR, result.message));
			}
			return res.json(Response.response(ResponseTypes.SUCCESS, result.message, result.data));
		}
		catch (error) {
			return res.json(Response.response(ResponseTypes.ERROR, error.message));
		}
	}

	/**
	 * @route POST /user/assign-role
	 * @group User - Operations about user
	 * @summary Assign role to user
	 * @param {AssignRole.model} user.body.required
	 * @returns {object} 200 - Success
	 * @returns {Error}  default - Unexpected error
	 */
	static async assignRole(req, res) {
		try {
			const validationResult = UserValidation.assignRole(req.body);
			if (!validationResult.type) {
				return res.json(Response.response(ResponseTypes.ERROR, validationResult.message));
			}
			const result = await UserSevice.assignRole(req, res);
			if (!result.type) {
				return res.json(Response.response(ResponseTypes.ERROR, result.message));
			}
			return res.json(Response.response(ResponseTypes.SUCCESS, result.message, result.data));
		}
		catch (error) {
			return res.json(Response.response(ResponseTypes.ERROR, error.message));
		}
	}

}

export default User;