export default class HttpError extends Error {
	statusCode;
	constructor(statusCode: number, message: string) {
		super(message);
		this.statusCode = statusCode;
	}
}
