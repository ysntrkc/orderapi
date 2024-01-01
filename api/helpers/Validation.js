/* eslint-disable max-len */
import { Lang } from '../src/enum';

class Validation {

	static joiEditMessage(data, language) {
		const splitMessage = data.message.split('"');

		if (splitMessage.indexOf(' fails to match the required pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&._])[A-Za-z\\d@$!%*?&._]{8,}$/') > -1) {
			return Lang[language].Joi.password;
		}

		let replaceMessage = Lang[language].Joi[data.type].replace('{{#label}}', data.context.label);

		if (data.context.limit?.root) {
			replaceMessage = replaceMessage.replace('{{#limit}}', data.context.limit.root);
		}
		if (data.context.limit === 0 || data.context.limit) {
			replaceMessage = replaceMessage.replace('{{#limit}}', data.context.limit);
		}
		return replaceMessage;
	}

}

export default Validation;