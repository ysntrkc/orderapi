import Joi from 'joi';

class Permission {

	static create(data, lang) {
		const schema = Joi.object({
			name: Joi.string().required()
		});

		const { error } = schema.validate(data);
		if (error) {
			return { type: false, message: error.details[0].message };
		}
		return { type: true };
	}

}

export default Permission;