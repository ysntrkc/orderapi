import Joi from 'joi';

import ValidationHelper from '../helpers/Validation';

class Permission {

	static create(data, lang) {
		const schema = Joi.object({
			name: Joi.string().required(),
		});

		const { error } = schema.validate(data);
		if (error) {
			return { type: false, message: ValidationHelper.joiEditMessage(error.details[0], lang) };
		}
		return { type: true };
	}

}

export default Permission;
