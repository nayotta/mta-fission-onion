const { Onion } = require('../lib')

const onion = new Onion()

onion.use(async (ctx, next) => {
	ctx.status = 200
	ctx.body = 'hello world!'
	await next()
})

module.exports = onion.go()
