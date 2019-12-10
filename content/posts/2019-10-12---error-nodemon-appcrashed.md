---
title: "[nodemon] app crashed - waiting for file changes before starting..."
date: "2019-12-10T14:00:00.169Z"
template: "post"
draft: false
slug: "/posts/error-nodemon-appcrashed/"
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
