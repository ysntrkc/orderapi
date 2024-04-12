import Joi from 'joi';

import ValidationHelper from '../helpers/Validation';

class Role {

	static assignPermission(data, lang) {
		const schema = Joi.object({
			role_id: Joi.number().required(),
			permission_id: Joi.number().required(),
		});

		const { error } = schema.validate(data);
		if (error) {
			return { type: false, message: ValidationHelper.joiEditMessage(error.details[0], lang) };
		}
		return { type: true };
	}

}

export default Role;
