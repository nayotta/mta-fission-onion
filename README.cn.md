# mta-fission-onion

[![Build and Lint](https://github.com/nayotta/mta-fission-onion/actions/workflows/build.yml/badge.svg)](https://github.com/nayotta/mta-fission-onion/actions/workflows/build.yml)[![Node.js Package](https://github.com/nayotta/mta-fission-onion/actions/workflows/release.yml/badge.svg)](https://github.com/nayotta/mta-fission-onion/actions/workflows/release.yml)

[EN](./README.md)

> 在 [`fission/node-env`](https://hub.docker.com/r/fission/node-env) 内使用的，仿 [`koajs`](https://koajs.com/) 风格洋葱式中间件处理模块.

## 安装

```sh
$ npm install @nayotta/mta-fission-onion
```

## 使用

```js
// fission function js file
const { Onion } = require('@nayotta/mta-fission-onion')

const onion = new Onion()

onion.use(async (ctx, next) => {
	// TODO: 权限验证
	const authPass = true
	if (!authPass) {
		ctx.status = 401
		ctx.body = 'unauthrization'
		return
	}
	await next()
})

onion.use(async (ctx, next) => {
	// TODO: 处理数据
	// ctx.request即为fission/nodejs提供的express/request对象
	const data = 'hello' + ctx.request.body.name
	ctx.status = 200
	ctx.body = {
		data
	}
})

// 或者批量注入中间件函数
onion.inject([async (ctx, next) => {
	// do something
	await next()
}, () => {
	// do something
	await next()
}])

module.export = onion.go()
```
