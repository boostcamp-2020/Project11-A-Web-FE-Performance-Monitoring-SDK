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

</div>

---
## @santry/browser
---

clone project of sentry 

## Install
---
```jsx
npm install @santry/browser
```

## Usage
---
After generating an error, place the function in the catch.

```jsx
const { init, captureError } = require('@santry/browser');

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

## Functions
---
### init([dsn] [, options])
If you want to use functions, use it first.

#### options
- **traceSampleRate** Set the percentage to collect errors or messages. This can be a number between 0 and 1.
- **release** Set the release version of your code.
- **environment** Set the environment of your code.
- **unhandleRejectionLevel** Set the level when an unhandleRejection error occurs. This is the setting for the whole unhandleRejection error.
- **uncaughtExceptionLevel** Set the level when an uncaughtException error occurs. This is the setting for the whole uncaughtException error.

### captureError([error] [, level])
Errors can be collected.

### setContext([context])
Set context of error or mesaage

