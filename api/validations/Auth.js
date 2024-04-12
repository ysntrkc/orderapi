import Joi from 'joi';

import ValidationHelper from '../helpers/Validation';

class Auth {

	static login(data, lang) {
		const schema = Joi.object({
			email: Joi.string().email(),
			isRememberMe: Joi.boolean(),
			password: Joi.string().required().min(8).pattern(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._])[A-Za-z\d@$!%*?&._]{8,}$/,
			),
		});

		const { error } = schema.validate(data);
		if (error) {
			return { type: false, message: ValidationHelper.joiEditMessage(error.details[0], lang) };
		}
		return { type: true };
	}

	static register(data, lang) {
		const schema = Joi.object({
			name: Joi.string().required(),
			surname: Joi.string().required(),
			email: Joi.string().email().required(),
			username: Joi.string().alphanum().min(3).required(),
			password: Joi.string().required().min(8).pattern(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._])[A-Za-z\d@$!%*?&._]{8,}$/,
			),
		});

		const { error } = schema.validate(data);
		if (error) {
			return { type: false, message: ValidationHelper.joiEditMessage(error.details[0], lang) };
		}
		return { type: true };
	}

}

export default Auth;
