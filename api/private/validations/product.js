import Joi from "joi";

class Product {
	
	static product(body) {
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

}

export default Product;