export class Context {
	private _context: any
	private _status: number = 404
	private _body: any = null

	private _headers: {
		[key: string]: any
	} = {}

	constructor (context: any) {
		this._context = context || {}
	}

	set status (status) {
		this._status = status
	}

	get status () {
		return this._status
	}

	set headers (headers: {
		[key: string]: any
	}) {
		this._headers = headers
	}

	get headers () {
		return this._headers
	}

	set body (body) {
		this._body = body
	}

	get body () {
		return this._body
	}

	get context () {
		return this._context
	}
}
