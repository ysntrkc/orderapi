import Joi from "joi";

class Order {

	static createOrder(body) {
		const schema = Joi.object({
			userId: Joi.number().required(),
			total: Joi.number().required(),
			status: Joi.string().required()
		});

		const { error } = schema.validate(body);
		if (error) {
			return { type: false, message: error.details[0].message };
		}
		return { type: true };
	}

	static updateOrderStatus(body) {
		const schema = Joi.object({
			status: Joi.string().required()
		});

		const { error } = schema.validate(body);
		if (error) {
			return { type: false, message: error.details[0].message };
		}
		return { type: true };
	}

}

export default Order;