import Joi from 'joi';

class User {

	static update(data, lang) {
		const schema = Joi.object({
			name: Joi.string(),
			surname: Joi.string(),
			email: Joi.string().email(),
			username: Joi.string().alphanum().min(3)
		});

		const { error } = schema.validate(data);
		if (error) {
			return { type: false, message: error.details[0].message };
		}
		return { type: true };
	}

	static assignRole(data, lang) {
		const schema = Joi.object({
			user_id: Joi.number().required(),
			role_id: Joi.number().required()
		});

		const { error } = schema.validate(data);
		if (error) {
			return { type: false, message: error.details[0].message };
		}
		return { type: true };
	}

}

export default User;