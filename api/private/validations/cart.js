import Joi from "joi";

class Cart {

	static addToCart(body) {
		const schema = Joi.object({
			productId: Joi.string().required(),
			quantity: Joi.string().required(),
			userId: Joi.string().required(),
		});
		const { error } = schema.validate(body);
		if (error) {
			return { type: false, message: error.details[0].message };
		}
		return { type: true };
	}

}

export default Cart;