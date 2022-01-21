const { Onion } = require('../lib')
const url = require('url')

const onion = new Onion()

const getURLSearchParams = (ctx) => {
	const wholeUrl = ctx.request.protocol + '://' + ctx.request.headers.host
	const URLSearchParams = new url.URL(ctx.request.url, wholeUrl).searchParams
	return URLSearchParams
}

onion.use(async (ctx, next) => {
	const URLSearchParams = getURLSearchParams(ctx)
	const name = URLSearchParams.get('name')
	if (!name) {
		ctx.status = 400
		ctx.body = 'bad request'
		return
	}
	await next()
})

onion.use(async (ctx, next) => {
	const URLSearchParams = getURLSearchParams(ctx)
	const name = URLSearchParams.get('name')
	ctx.status = 200
	ctx.body = 'hello ' + name
	await next()
})

module.exports = onion.go()
