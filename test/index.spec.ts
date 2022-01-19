import { MtaFissionOnion } from '../src'

test('basic', async () => {
	const onion = new MtaFissionOnion()

	onion.use(async (ctx, next) => {
		ctx.status = 200
		await next()
	})
	onion.use(async (ctx, next) => {
		ctx.body = 'hello world'
		await next()
	})
	const res = await onion.go({})
	expect(res.status).toBe(200)
	expect(res.body).toBe('hello world')
})

test('use context', async () => {
	const onion = new MtaFissionOnion()

	onion.use(async (ctx, next) => {
		if (ctx.context.request.headers['X-internal-token'] !== 'useful token') {
			ctx.status = 401
			ctx.body = 'unauthrization'
			return
		}
		await next()
	})
	onion.use(async (ctx, next) => {
		ctx.status = 200
		ctx.body = 'hello ' + ctx.context.request.body.name
		await next()
	})
	const res = await onion.go({
		request: {
			headers: {
				'X-internal-token': 'useful token'
			},
			body: {
				name: 'onion'
			}
		}
	})
	expect(res.status).toBe(200)
	expect(res.body).toBe('hello onion')
})
