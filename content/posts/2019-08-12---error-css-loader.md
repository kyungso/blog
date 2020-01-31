---
title: "ValidationError: Invalid options object. CSS Loader has been initialised using an options object that does not match the API schema"
date: "2019-12-08T14:00:00.169Z"
template: "post"
draft: false
slug: "/posts/error-css-loader/"
category: "Error"
tags:
- "error"
description: "css-loader 다운그레이드로 해결"
---

<br>

```
ERROR in ./src/components/Red.css
Module build failed (from ./node_modules/css-loader/dist/cjs.js):
ValidationError: Invalid options object. CSS Loader has been initialised using an options object that does not match the API schema.
- options has an unknown property 'exportOnlyLocals'. These properties are valid:
  object { url?, import?, modules?, sourceMap?, importLoaders?, localsConvention?, onlyLocals? }
   at validate (/Users/ksjung/frontend_study/velopert_book/ssr-tutorial/node_modules/schema-utils/dist/validate.js:85:11)
   at Object.loader (/Users/ksjung/frontend_study/velopert_book/ssr-tutorial/node_modules/css-loader/dist/index.js:34:28)
@ ./src/components/Red.js 2:0-19
@ ./src/pages/RedPage.js
@ ./src/App.js
@ ./src/index.server.js
```

```
ERROR in ./src/components/Blue.css
Module build failed (from ./node_modules/css-loader/dist/cjs.js):
ValidationError: Invalid options object. CSS Loader has been initialised using an options object that does not match the API schema.
- options has an unknown property 'exportOnlyLocals'. These properties are valid:
  object { url?, import?, modules?, sourceMap?, importLoaders?, localsConvention?, onlyLocals? }
   at validate (/Users/ksjung/frontend_study/velopert_book/ssr-tutorial/node_modules/schema-utils/dist/validate.js:85:11)
   at Object.loader (/Users/ksjung/frontend_study/velopert_book/ssr-tutorial/node_modules/css-loader/dist/index.js:34:28)
```

이렇게 css-loader에 관한 에러가 발생한다.

css-loder@2.1.1 로 다운그레이드 하면 해결

현재 CRA 프로젝트에서 css-loader@3.x.x 버전에선 어떻게 하면 되는지 생각중..
