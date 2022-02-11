# mta-fission-onion

[![Build and Lint](https://github.com/nayotta/mta-fission-onion/actions/workflows/build.yml/badge.svg)](https://github.com/nayotta/mta-fission-onion/actions/workflows/build.yml)[![Node.js Package](https://github.com/nayotta/mta-fission-onion/actions/workflows/release.yml/badge.svg)](https://github.com/nayotta/mta-fission-onion/actions/workflows/release.yml)

[简体中文](./README.cn.md)

> Used in [`fission/node-env`](https://hub.docker.com/r/fission/node-env) , like [`koajs`](https://koajs.com/) onion code style middleware module.

## Install

```sh
$ npm install @nayotta/mta-fission-onion
```

## How to use it ?

```js
// fission function js file
const { Onion } = require('@nayotta/mta-fission-onion')

const onion = new Onion()

onion.use(async (ctx, next) => {
	// TODO: authrization
	const authPass = true
	if (!authPass) {
		ctx.status = 401
		ctx.body = 'unauthrization'
		return
	}
	await next()
})

onion.use(async (ctx, next) => {
	// TODO: deal with data
	// ctx.context -> fission/nodejs express/request object
	const data = 'hello' + ctx.request.body.name
	ctx.status = 200
	ctx.body = {
		data
	}
})

// or inject middlewares funcs
onion.inject([async (ctx, next) => {
	// do something
	await next()
}, () => {
	// do something
	await next()
}])

module.export = onion.go()
```
