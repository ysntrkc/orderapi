import Joi from "joi";

class Cart {

	static addToCart(body) {
		const schema = Joi.object({
			product_id: Joi.string().required(),
			quantity: Joi.string().required(),
			user_id: Joi.string().required(),
		});
		const { error } = schema.validate(body);
		if (error) {
			return { type: false, message: error.details[0].message };
		}
		return { type: true };
	}

}

export default Cart;