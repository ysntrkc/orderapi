import Joi from 'joi';

import ValidationHelper from '../helpers/Validation';

class Cart {

	static addToCart(body, lang) {
		const schema = Joi.object({
			product_id: Joi.number().required(),
			quantity: Joi.number().required(),
		});
		const { error } = schema.validate(body);
		if (error) {
			return { type: false, message: ValidationHelper.joiEditMessage(error.details[0], lang) };
		}
		return { type: true };
	}

}

export default Cart;
