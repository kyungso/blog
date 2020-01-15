---
title: "[nodemon] app crashed - waiting for file changes before starting..."
date: "2019-12-10T14:00:00.169Z"
template: "post"
draft: false
slug: "/posts/error/error-nodemon-appcrashed/"
category: "Error"
tags:
- "error"
description: "Node.js v12 ES Module 에러"
---

<br>

`esm` 라이브러리의 도움을 받아 import/export 문법을 사용해야 했지만, Node.js v12부터 ES Module이 정식 지원됩니다.

사용법으로는

**package.json**

``` JavaScript
 (...)
 "scripts": {
   "start": "node src",
   "start:dev": "nodemon --watch src/ src/index.js"
 },
 "type": "module"
}
```

`"type": "module"`을 추가하면 ES Module을 바로 사용할 수 있다고 했지만,

`$ yarn start:dev` 명령어로 서버를 재시작하니,

[nodemon] app crashed - waiting for file changes before starting...

에러를 만나게 됩니다.

<br>

#### Solution

> Node.js v12 or later

<br>

``` JavaScript
 (...)
 "scripts": {
   "start": "node src",
   "start:dev": "nodemon --watch --experimental-modules src/ src/index.js"
 },
 "type": "module"
}
```

`--experimental-modules` 를 추가해주면 에러가 해결됩니다! 짠!

<br>

#### + 추가로 계속 에러가 나신다면...

##### esm 라이브러리 사용

- 1) `$ yarn add esm`

<br>

- 2) 기존의 src/index.js 파일의 이름을 main.js로 변경

<br>

- 3) 새로 src/index.js을 생성 후,

  ``` JavaScript
  /* eslint-disable no-global-assign */

  require = require('esm')(module /*, options*/);
  module.exports = require('./main.js');
  ```

<br>

- 4) package.json 내용 수정

  ``` JavaScript
  "scripts": {
    "start": "node -r esm src",
    "start:dev": "nodemon --watch src/ -r esm src/index.js"
  }
  ```

  <br>

- 5) .eslintrc.json

  eslint를 설정하셨다면 추가해주시고, 아니면 skip 하면됩니다.

  ``` json
  {
    (...)
    "parserOptions": {
      "ecmaVersion": 2018,
      "sourceType": "module"
    }
  }
  ```

 <br>


기존에 실행 중이던 서버는 종료하고, 다시 서버를 시작하면,

이제 프로젝트에서 import/export 구문을 자유롭게 사용할 수 있을 것입니다.
