<div align="center">
	<br>
	<br>
	<img height="220" src="https://raw.githubusercontent.com/boostcamp-2020/Project11-A-Web-FE-Performance-Monitoring-SDK/master/media/santry-1.png" alt="Santry">
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
![](https://img.shields.io/badge/Redux-v4.0.5-%23764ABC?logo=Redux)
![](https://img.shields.io/badge/Swagger-v0.7.5-%2385EA2D?logo=Swagger)
![](https://img.shields.io/badge/MongoDB-v3.6.3-%2347A248?logo=MongoDB)
![](https://img.shields.io/badge/NPM-v6.14.9-%23CB3837?logo=NPM)
![](https://img.shields.io/badge/Nodemon-v2.0.6-%2376D04B?logo=nodemon)
![](https://img.shields.io/badge/JWT-v8.5.1-%23000000?logo=JSON-Web-Tokens)
![](https://img.shields.io/badge/Webpack-v5.8.0-%238DD6F9?logo=webpack)
![](https://img.shields.io/badge/Babel-v7.12.9-%23F9DC3E?logo=Babel)
![](https://img.shields.io/badge/NCP-Server-7ed161?logo=NativeScript)
![](https://img.shields.io/badge/ESLint-v7.14.0-%234B32C3?logo=ESLint)
![](https://img.shields.io/badge/Prettier-v2.2.1-%23F7B93E?logo=Prettier)
![](https://img.shields.io/badge/VSCode-v1.51.1-%23007ACC?logo=Visual-studio-code)
![](https://img.shields.io/badge/Jest-v26.6.3-%23C21325?logo=Jest)


</div>

---

## Repository
- [FrontEnd Repository](https://github.com/boostcamp-2020/Project11-A-Web-FE-Performance-Monitoring-admin)
- [BackEnd Repository](https://github.com/boostcamp-2020/Project11-A-Web-FE-Performance-Monitoring-server)
- [SDK Repository](https://github.com/boostcamp-2020/Project11-A-Web-FE-Performance-Monitoring-SDK)
- [통합 위키](https://github.com/boostcamp-2020/Project11-A-Web-FE-Performance-Monitoring-SDK/wiki)

## Highlights

- [프로젝트 개요](#프로젝트-개요)
- [멤버](#Members)
- [Install](#Install)
- [Usage](#Get-Started)
- [개발환경](#개발환경)

## 프로젝트 개요

[Back](#Highlights)

- 기존에 프로젝트를 운영하면서 에러와 기록을 로그파일로 저장합니다.
- 로그 자체를 CLI로 관리할 경우 가독성이 떨어지며 에러레벨을 구분하기 힘듭니다.

|<img src="https://i.imgur.com/6PkBx5S.png" width=300 height=200 />|<img src="https://i.imgur.com/BDYs557.png" width=300 height=200 />|
:---:|:---:
| 사용 전 | 사용 후 |

- **Santry** 는 오류를 수집하는 SDK를 NPM을 통해서 배포하여, 발생하는 오류들을 모아서 서버에 저장하고, 그에 대한 상황과 통계를 알려주는 Admin 페이지를 제공합니다. 
- 여러분에 Application에서 발생하는 오류들을 찾는 데 도움을 드려 더욱 행복한 개발환경에서 개발하셨으면 좋겠습니다.

## Members

|<img src="https://github.com/kangsukmin.png" width=100 >|<img src="https://github.com/gitdog01.png" width=100 >|<img src="https://github.com/Eunbin-Kim.png" width=100 >|<img src="https://github.com/maong0927.png" width=100 >|
:---:|:---:|:---:|:---:
|[J005 강석민](https://github.com/kangsukmin)|[J049 김원호](https://github.com/gitdog01)|[J050 김은빈](https://github.com/Eunbin-Kim)|[J071 문혜라](https://github.com/maong0927)|


## Install

[Back](#Highlights)

### <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Google_Chrome_icon_%28September_2014%29.svg/768px-Google_Chrome_icon_%28September_2014%29.svg.png" width=20 > [For Browser](https://www.npmjs.com/package/@santry/browser) <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Firefox_logo%2C_2019.svg/131px-Firefox_logo%2C_2019.svg.png" width=20 > 

```
$ npm install @santry/browser
```
### <img src="https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg" width=20 > [For Node.js / Express](https://www.npmjs.com/package/@santry/browser) <img src="https://symbols.getvecta.com/stencil_22/9_nodejs.29834badea.svg" width=20 >
```
$ npm install @santry/node
```

## Get Started

[Back](#Highlights)

### Usage

- Node.js

```jsx
const { init, captureMessage, captureError } = require('@santry/node');
const dsn = [token]@[URL]; // Set Your Project Token
    
init(dsn); // Required!
    
// if you want to get Message
~~Your Code~~
captureMessage("hello I'm SAntry");

// if you want to get Error
try {
  throw new Error('testing Error');
} catch (error) {
  captureError(error);
}
    
```

- Express

```jsx
const express = require('express');
const { init, errorHandler, captureMessage } = require('@santry/node');

const app = express();
const dsn = [token]@[URL]; // Set Your Project Token
    
init(dsn); // Required!

// if you want to get Message
app.get('/', function rootHandler(req, res) {
  captureMessage("hello I'm SAntry");
  res.end('Hello world!');
});

// if you want to get Error
app.get('/debug-sentry', function mainHandler(req, res) {
  console.log(req);
  throw new Error('My second Sentry error get!');
});

app.use(errorHandler());

app.use(function onError(err, req, res, next) {
  res.statusCode = 500;
  res.end('good santry!');
});

app.listen(3000);
    
```

### Set Level

**If you want to set level in message or error. Try using setLevel Function!**

```jsx
const { setLevel, captureMessage } = require('@santry/node');


const testError = () => {
  try {
    throw new Error('Fatal Level Error!');
  } catch (error) {
    setLevel('fatal');
    captureError(error);
  }
};
```

### Set Context

**To leave some messages, Using 'setContext' Function**

```jsx
const { setContext, captureMessage } = require('@santry/node');


const testError = () => {
  try {
    throw new Error('Fatal Level Error!');
  } catch (error) {
    setContext('ExpressDevServer', {
      version: '1.1',
      date: new Date(),
    });
    captureError(error);
  }
};
```

## 개발환경

[Back](#Highlights)

![](https://i.imgur.com/yTffMG0.png)

- 공통
    - Typescript
    - GitHub Repository 모니터링 및 자동 배포
- SDK
    - Lerna를 통한 Mono Repo 개발
    - NPM Package 배포
- Server
    - Mongoose & MongoDB 사용
    - Jest와 RESTClient를 통한 테스트 안정화
- Client
    - React & Redux
    - Babel, Tsc, Webpack 직접 설정
    - Recharts를 통한 차트 구성
