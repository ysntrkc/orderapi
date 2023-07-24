import Joi from '@hapi/joi';

class Cart {

	static addToCart(body) {
		const schema = Joi.object({
			product_id: Joi.number().required(),
			quantity: Joi.number().required(),
			user_id: Joi.number().required(),
		});
		const { error } = schema.validate(body);
		if (error) {
			return { type: false, message: error.details[0].message };
		}
		return { type: true };
	}

}

export default Cart;