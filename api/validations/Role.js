import Joi from 'joi';

class Role {

	static assignPermission(data, lang) {
		const schema = Joi.object({
			role_id: Joi.number().required(),
			permission_id: Joi.number().required()
		});

		const { error } = schema.validate(data);
		if (error) {
			return { type: false, message: error.details[0].message };
		}
		return { type: true };
	}

}

export default Role;