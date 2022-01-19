# mta-fission-onion

[![Build and Lint](https://github.com/nayotta/mta-fission-onion/actions/workflows/build.yml/badge.svg)](https://github.com/nayotta/mta-fission-onion/actions/workflows/build.yml)[![Node.js Package](https://github.com/nayotta/mta-fission-onion/actions/workflows/release.yml/badge.svg)](https://github.com/nayotta/mta-fission-onion/actions/workflows/release.yml)

[简体中文](./README.cn.md)

> Used in [`fission/nodejs`](https://fission.io/docs/usage/languages/nodejs/) , like [`koajs`](https://koajs.com/) onion code style middleware module.

## Install

```sh
$ npm install @nayotta/mta-fission-onion
```

## How to use it ?

```js
// fission function js file
const { MtaFissionOnion } = require('@nayotta/mta-fission-onion')

const onion = new MtaFissionOnion()

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
	// ctx.context -> fission/nodejs context object
	const data = 'hello' + ctx.context.request.body.name
	ctx.status = 200
	ctx.body = {
		data
	}
})

module.export = onion.go()
```
