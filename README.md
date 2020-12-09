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

# Members
|J005|J049|J050|J071|
|----|----|----|----|
|[강석민](https://github.com/kangsukmin)|[김원호](https://github.com/gitdog01)|[김은빈](https://github.com/Eunbin-Kim)|[문혜라](https://github.com/maong0927)|

### 저장소 주소
[FrontEnd Repository](https://github.com/boostcamp-2020/Project11-A-Web-FE-Performance-Monitoring-admin)<br>
[BackEnd Repository](https://github.com/boostcamp-2020/Project11-A-Web-FE-Performance-Monitoring-server)<br>
[SDK Repository](https://github.com/boostcamp-2020/Project11-A-Web-FE-Performance-Monitoring-SDK)<br>
[통합 위키](https://github.com/boostcamp-2020/Project11-A-Web-FE-Performance-Monitoring-SDK/wiki)<br>


## 프로젝트 설명
&nbsp;**Santry** 는 오류를 수집하는 SDK를 NPM을 통해서 배포하여, 발생하는 오류들을 모아서 서버에 저장하고, 그에 대한 상황과 통계를 알려주는 Admin 페이지를 제공합니다. 
&nbsp;여러분에 Application에서 발생하는 오류들을 찾는 데 도움을 드려 더욱 행복한 개발환경에서 개발하셨으면 좋겠습니다.
 

&nbsp;[함께 시작해볼까요 ?](https://www.npmjs.com/package/@santry/browser)
```
$ npm install @santry/browser
```
## 제공하는 기능

- 다양한 종류의 ErrorCatch을 위한 도구 제공
```javascript=
// 기본적인 에러 Catch 부터
  try {
    throw new Error('testing Error');
  } catch (error) {
    captureError(error);
  }
  
// 로그의 기능으로 사용하는 메세지를 저장할 수도 있고,
  captureMessage("hello I'm Hera");
  
// UncaughtException , UnhandledRejection 도 잡을 수 있도록 세팅해 두었습니다.
  onUnhandledRejection();
  onUncaughtException();

// 나만의 다른 정보도 수집해 보세요.
  setContext("Login");

// express 에 제공하는 errorHandler middleware
  app.use(errorHandler());


```

- 프로젝트 단위로 관리를 할 수 있습니다.<br>
![](https://i.imgur.com/76x1vlR.jpg)

- 같은 에러들을 하나의 이슈로 묶어서 관리할 수 있습니다.

- 이슈 관리에서는 하나의 오류 정보부터, Tag의 통계, 이슈에 대해 커뮤니케이션을 할 수 있는 comment 기능등을 지원합니다.
 
 
 

