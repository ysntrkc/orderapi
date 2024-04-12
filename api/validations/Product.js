import Joi from 'joi';

import ValidationHelper from '../helpers/Validation';

class Product {

	static create(body, lang) {
		const schema = Joi.object({
			name: Joi.string().required(),
			price: Joi.number().required(),
			stock_quantity: Joi.number().required(),
		});

		const { error } = schema.validate(body);
		if (error) {
			return { type: false, message: ValidationHelper.joiEditMessage(error.details[0], lang) };
		}
		return { type: true };
	}

	static updateStock(body, lang) {
		const schema = Joi.object({
			stock_quantity: Joi.number().required(),
		});

		const { error } = schema.validate(body);
		if (error) {
			return { type: false, message: ValidationHelper.joiEditMessage(error.details[0], lang) };
		}
		return { type: true };
	}

}

export default Product;
