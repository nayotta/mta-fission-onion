import { Onion } from '../src'

test('basic', async () => {
	const onion = new Onion()

	onion.use(async (ctx, next) => {
		ctx.status = 200
		await next()
	})
	onion.use(async (ctx, next) => {
		ctx.body = 'hello world'
		await next()
	})
	const handler = onion.go()
	const res = await handler({})
	expect(res.status).toBe(200)
	expect(res.body).toBe('hello world')
})

test('use context', async () => {
	const onion = new Onion()

	onion.use(async (ctx, next) => {
		if (ctx.request.headers['X-internal-token'] !== 'useful token') {
			ctx.status = 401
			ctx.body = 'unauthrization'
			return
		}
		await next()
	})
	onion.use(async (ctx, next) => {
		ctx.status = 200
		ctx.headers = {
			hello: 'onion'
		}
		ctx.body = 'hello ' + ctx.request.body.name
		await next()
	})
	const handler = onion.go()
	const res = await handler({
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
	expect(res.headers.hello).toBe('onion')
	expect(res.body).toBe('hello onion')
})
