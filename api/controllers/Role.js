/**
 * @typedef AssignPermission
 * @property {integer} role_id.required
 * @property {integer} permission_id.required
 */

import RoleSevice from '../services/Role';
import RoleValidation from '../validations/Role';
import Response from '../helpers/Response';
import { ResponseTypes } from '../src/enum';

class Role {

	/**
	 * @route GET /role
	 * @group Role - Operations about role
	 * @summary Get all roles
	 * @returns {object} 200 - Success
	 * @returns {Error}  default - Unexpected error
	 */
	static async get(req, res) {
		try {
			const result = await RoleSevice.get(req, res);
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
	 * @route POST /role/assign-permission
	 * @group Role - Operations about role
	 * @summary Assign permission to role
	 * @param {AssignPermission.model} role.body.required
	 * @returns {object} 200 - Success message
	 * @returns {Error}  default - Unexpected error
	 */
	static async assignPermission(req, res) {
		try {
			const validationResult = RoleValidation.assignPermission(req.body);
			if (!validationResult.type) {
				return res.json(Response.response(ResponseTypes.ERROR, validationResult.message));
			}
			const result = await RoleSevice.assignPermission(req, res);
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

export default Role;