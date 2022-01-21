import { Context } from './context'

export type TMiddlewareFunc = (ctx: Context, next: () => Promise<void>) => void | Promise<void>

export class Onion {
	private _middlewares: TMiddlewareFunc[] = []

	public use (middleware: TMiddlewareFunc) {
		this._middlewares.push(middleware)
	}

	public inject (middlewares: TMiddlewareFunc[]) {
		this._middlewares = this._middlewares.concat(middlewares)
	}

	public go () {
		return async (context: any) => {
			const ctx = new Context(context)
			await this._handleRequest(ctx, this._middlewares)
			return this._handleResponse(ctx)
		}
	}

	private _handleRequest (ctx: Context, middlewares: TMiddlewareFunc[]) {
		if (middlewares && middlewares.length > 0) {
			const bindedMiddleware: TMiddlewareFunc[] = []
			for (let i = middlewares.length - 1; i >= 0; i--) {
				if (middlewares.length === i + 1) {
					bindedMiddleware.unshift(middlewares[i].bind(this, ctx, Promise.resolve.bind(Promise)))
				} else {
					bindedMiddleware.unshift(middlewares[i].bind(this, ctx, bindedMiddleware[0] as () => Promise<void>))
				}
			}
			return bindedMiddleware[0](ctx, Promise.resolve.bind(Promise))
		} else {
			return Promise.resolve()
		}
	}

	private _handleResponse (ctx: Context) {
		const { status, headers, body } = ctx
		return {
			status,
			headers,
			body
		}
	}
}
