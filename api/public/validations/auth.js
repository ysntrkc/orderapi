import Joi from 'joi';

class AuthValidation {

	static async validateLogin(body) {
		const schema = Joi.object({
			email: Joi.string().email().required(),
			password: Joi.string().required()
		});

		const { error } = schema.validate(body);
		if (error) {
			return { type: false, message: error.details[0].message };
		}
		return { type: true };
	}

	static async validateRegister(body) {
		const schema = Joi.object({
			username: Joi.string().alphanum().min(3).required().messages({
				'string.alphanum': 'Username must contain only letters and numbers',
				'string.min': 'Username must be at least 3 characters long',
				'string.empty': 'Username cannot be empty',
				'any.required': 'Username is required'
			}),
			email: Joi.string().email().required().messages({
				'string.email': 'Invalid email address',
				'string.empty': 'Email is required',
				'any.required': 'Email is required'
			}),
			password: Joi.string().required().min(8).pattern(
				new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&._])[A-Za-z\\d@$!%*?&._]{8,}$')
			).messages({
				'string.min': 'Password must be at least 8 characters long',
				'string.empty': 'Password cannot be empty',
				'string.required': 'Password is required',
				'any.required': 'Password is required'
			})
		});

		const { error } = schema.validate(body);
		if (error) {
			return { type: false, message: error.details[0].message };
		}
		return { type: true };
	}

}

export default AuthValidation;