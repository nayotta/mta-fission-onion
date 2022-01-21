import { Request, Response } from 'express'

export class Context {
	public status: number | undefined
	public body: any = null

	private _request: Request
	private _response: Response

	public headers: {
		[key: string]: any
	} = {}

	constructor (context: {
		request: Request,
		response: Response
	}) {
		this._request = context.request
		this._response = context.response
	}

	get req () {
		return this._request
	}

	get request () {
		return this._request
	}

	get res () {
		return this._response
	}

	get response () {
		return this._response
	}
}
