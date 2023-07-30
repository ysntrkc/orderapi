import Joi from 'joi';

class Auth {

	// TODO: Add localization to all validations and fix this file
	static login(data, lang) {
		const schema = Joi.object({
			email: Joi.string().email(),
			isRememberMe: Joi.boolean(),
			password: Joi.string().required().min(8).pattern(
				new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&._])[A-Za-z\\d@$!%*?&._]{8,}$')
			)
		});

		const { error } = schema.validate(data);
		if (error) {
			return { type: false, message: error.details[0].message };
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
				new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&._])[A-Za-z\\d@$!%*?&._]{8,}$')
			)
		});

		const { error } = schema.validate(data);
		if (error) {
			return { type: false, message: error.details[0].message };
		}
		return { type: true };
	}

}

export default Auth;