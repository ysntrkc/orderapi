class Response {

	static success(message, data) {
		if (data === undefined) {
			return {
				type: true,
				message: message,
			};
		}
		return {
			type: true,
			message: message,
			data: data,
		};
	}

	static error(message) {
		return {
			type: false,
			message: message,
		};
	}

	static response(type, message, data) {
		switch (type) {
		case 'success':
			return this.success(message, data);
		case 'error':
			return this.error(message);
		default:
			return this.error('Invalid response type');
		}
	}

}

export default Response;
