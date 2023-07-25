import Joi from '@hapi/joi';

class Product {

	static create(body) {
		const schema = Joi.object({
			name: Joi.string().required(),
			price: Joi.number().required(),
			stock_quantity: Joi.number().required()
		});

		const { error } = schema.validate(body);
		if (error) {
			return { type: false, message: error.details[0].message };
		}
		return { type: true };
	}

	static updateStock(body) {
		const schema = Joi.object({
			stock_quantity: Joi.number().required()
		});

		const { error } = schema.validate(body);
		if (error) {
			return { type: false, message: error.details[0].message };
		}
		return { type: true };
	}

}

export default Product;