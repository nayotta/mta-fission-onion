const { Onion } = require('../lib')

const onion = new Onion()

onion.use(async (ctx, next) => {
	console.log('body: ', ctx.request.body)
	const username = ctx.request.body.username
	const email = ctx.request.body.email
	const nickname = ctx.request.body.nickname
	if (!username || !email || !nickname) {
		ctx.status = 400
		ctx.body = 'bad request'
		return
	}
	await next()
})

onion.use(async (ctx, next) => {
	const username = ctx.request.body.username
	const email = ctx.request.body.email
	const nickname = ctx.request.body.nickname
	// TODO create account by body data
	console.log(`------
	username: ${username}
	nickname: ${nickname}
	email: ${email}
	-----`)

	ctx.status = 201
	ctx.body = 'created'
	await next()
})

module.exports = onion.go()
