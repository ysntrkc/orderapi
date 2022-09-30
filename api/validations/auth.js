import db from "../../src/models";
import Joi from "joi";

class AuthValidation {
    static async validateLogin(body) {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        });

        const { error } = schema.validate(body);
        if (error) {
            return { type: false, message: error.details[0].message };
        }
        return { type: true };
    }

    static async validateRegister(body) {
        const schema = Joi.object({
            username: Joi.string().alphanum().min(3).required(),
            email: Joi.string().email().required(),
            password: Joi.string().required().min(6).pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
        });

        const { error } = schema.validate(body);
        if (error) {
            return { type: false, message: error.details[0].message };
        }
        return { type: true };
    }
}

export default AuthValidation;