/**
 * @typedef CreatePermission
 * @property {string} name.required
 */

import PermissionSevice from '../services/Permission';
import PermissionValidation from '../validations/Permission';
import Response from '../helpers/Response';
import { ResponseTypes } from '../src/enum';

class Permission {

	/**
	 * @route POST /permission
	 * @group Permission - Operations about permission
	 * @summary Create a new permission
	 * @param {CreatePermission.model} permission.body.required
	 * @returns {object} 200 - Success message
	 * @returns {Error}  default - Unexpected error
	 */
	static async create(req, res) {
		try {
			const validationResult = PermissionValidation.create(req.body);
			if (!validationResult.type) {
				return res.json(Response.response(ResponseTypes.ERROR, validationResult.message));
			}
			const result = await PermissionSevice.create(req, res);
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
	 * @route GET /permission
	 * @group Permission - Operations about permission
	 * @summary Get all permissions
	 * @returns {object} 200 - Success
	 * @returns {Error}  default - Unexpected error
	 */
	static async get(req, res) {
		try {
			const result = await PermissionSevice.get(req, res);
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

export default Permission;