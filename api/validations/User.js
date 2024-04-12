import Joi from 'joi';

import ValidationHelper from '../helpers/Validation';

class User {

	static update(data, lang) {
		const schema = Joi.object({
			name: Joi.string(),
			surname: Joi.string(),
			email: Joi.string().email(),
			username: Joi.string().alphanum().min(3),
		});

		const { error } = schema.validate(data);
		if (error) {
			return { type: false, message: ValidationHelper.joiEditMessage(error.details[0], lang) };
		}
		return { type: true };
	}

	static assignRole(data, lang) {
		const schema = Joi.object({
			user_id: Joi.number().required(),
			role_id: Joi.number().required(),
		});

		const { error } = schema.validate(data);
		if (error) {
			return { type: false, message: ValidationHelper.joiEditMessage(error.details[0], lang) };
		}
		return { type: true };
	}

}

export default User;
