export class HTTPError extends Error {
	constructor(
		public override message: string,
		public status: number,
	) {
		super(message);
	}
}
