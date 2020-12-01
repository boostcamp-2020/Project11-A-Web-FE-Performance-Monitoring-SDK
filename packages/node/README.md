<div align="center">
	<br>
	<br>
	<img height="220" src="media/santry-1.png" alt="Santry">
	<h2 align="center">에러 및 로그 모니터링 플랫폼
	</h2>
	<p align="center"><sup>Thanks for BoostCamp2020</sup></p>
	<br>
	<br>

<!--레포 정보-->
![](https://img.shields.io/github/commit-activity/w/boostcamp-2020/Project11-A-Web-FE-Performance-Monitoring-SDK)
![](https://img.shields.io/github/repo-size/boostcamp-2020/Project11-A-Web-FE-Performance-Monitoring-SDK)
![](https://img.shields.io/github/languages/code-size/boostcamp-2020/Project11-A-Web-FE-Performance-Monitoring-SDK)
![](https://img.shields.io/github/issues/boostcamp-2020/Project11-A-Web-FE-Performance-Monitoring-SDK)
![](https://img.shields.io/github/last-commit/boostcamp-2020/Project11-A-Web-FE-Performance-Monitoring-SDK)

![](https://i.imgur.com/j94i246.png)

<!--기술 스택-->
![](https://img.shields.io/badge/TypeScript-v4.1.2-%23007ACC?logo=TypeScript) 
![](https://img.shields.io/badge/React-v17.0.1-%2361DAFB?logo=React) 
![](https://img.shields.io/badge/Swagger-v0.7.5-%2385EA2D?logo=Swagger)
![](https://img.shields.io/badge/MongoDB-v3.6.3-%2347A248?logo=MongoDB)
![](https://img.shields.io/badge/NPM-v6.14.9-%23CB3837?logo=NPM)
![](https://img.shields.io/badge/JWT-v8.5.1-%23000000?logo=JSON-Web-Tokens)
![](https://img.shields.io/badge/Webpack-v5.8.0-%238DD6F9?logo=webpack)
![](https://img.shields.io/badge/Babel-v7.12.9-%23F9DC3E?logo=Babel)
![](https://img.shields.io/badge/NCP-Server-7ed161?logo=NativeScript)
![](https://img.shields.io/badge/ESLint-v7.14.0-%234B32C3?logo=ESLint)
![](https://img.shields.io/badge/Prettier-v2.2.1-%23F7B93E?logo=Prettier)
![](https://img.shields.io/badge/VSCode-v1.51.1-%23007ACC?logo=Visual-studio-code)

</div>

---
## @santry/browser

clone project of sentry 

## Usage

After generating an error, place the function in the catch.

```jsx
const { init, captureError } = require('@santry/node');

const dsn = '[token]@[url]';

init(dsn);

const testError = () => {
  try {
    throw new Error('testing Error');
  } catch (error) {
    captureError(error);
  }
};

testError();
```

### To use Express

Use errorHandler function as middleware.

```jsx
// All controllers should live here
const express = require('express');
const { init, errorHandler } = require('@santry/node');

const app = express();
const dsn = '[token]@[url]';

init(dsn);

app.get('/', function rootHandler(req, res) {
  res.end('Hello world!');
});

app.get('/debug-sentry', function mainHandler(req, res) {
  console.log(req);
  throw new Error('My second Sentry error get!');
});

app.post('/debug-sentry', function mainHandler(req, res) {
  console.log(req);
  throw new Error('My second Sentry error get!');
});
// The error handler must be before any other error middleware and after all controllers
app.use(errorHandler());
// Optional fallthrough error handler
app.use(function onError(err, req, res, next) {
  res.statusCode = 500;
  res.end('good santry!');
});

app.listen(3000);
```

### init([dsn],[options])

If you want to use functions, use it first.

### options

- `traceSampleRate` : set number between 0 and 1. With this option set, every transaction created will have that percentage chance of being sent to Santry.
- `release` : write the release version of the code.
- `environment` : write your environment ( ex / production , development )