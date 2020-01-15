---
title: "Error: dlopen(~/node_modules/bcrypt/lib/binding/bcrypt_lib.node, 1): no suitable image found. Did find:..."
date: "2019-12-30T14:00:00.169Z"
template: "post"
draft: false
slug: "/posts/error/error-nodemodules/"
category: "Error"
tags:
- "error"
- "node_modules"
description: ""
---

<br>

### Error: dlopen(~/node_modules/bcrypt/lib/binding/bcrypt_lib.node, 1): no suitable image found. Did find:...

##### 문제

위의 bcrypt 모듈이 아니더라도 node_modules 에러가 나타날 수 있다.

저는 linux 환경에서 node_modules를 설치한 것을 git 원격 저장소에 push 하고 나니, macOS 로컬 환경에서 개발하려고 하니 충돌이 난것으로 보입니다. linux 환경에 맞는 node_modules을 설치했기 때문이죠.

##### 해결방법

따라서 node_modules 폴더를 삭제하고, 다시 설치하면 해결됩니다!

`$ rm -rf node_modules`

`$ npm install` 혹은 `yarn install`

`$ yarn start`

실행하면 오류 해결

<br>
<br>

참고

- https://stackoverflow.com/questions/11718813/error-running-a-nodejs-server-on-a-mac-no-suitable-image-found
