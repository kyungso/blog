---
title: "TypeScript란 (2)"
date: "2020-02-26T14:00:00.169Z"
template: "post"
draft: false
slug: "/posts/typescript_2/"
category: "JavaScript"
tags:
- "Typescript"
description: "타입스크립트 설치"
---

## 타입스크립트 설치

#### 1) Node.js 설치

Node.js 홈페이지에 들어가서 LTS 버전으로 설치해줍니다.

Node.js를 설치하면 npm을 포함하고 있습니다.

npm을 이용하면 서드파티 라이브러리 모듈을 내려받거나 개발에 필요한 빌드, 테스트 도구 등을 설치할 수 있습니다.

##### package.json 파일 만들기

`$ npm init`

<br>

#### 2) 타입스크립트 설치

`$ npm install -g typescript`

`$ tsc -v`

<br>

**업데이트**

타입스크립트는 버전이 올라갈수록 최신 특징을 자주 반영하기 때문에 최신 버전을 유지하는 것이 좋습니다.

`$ npm outdated -g typescript`

outdated 옵션을 이용해 설치된 패키지가 최신 버전인지를 확인하고,

```
$ npm uninstall -g typescript
$ npm cache clean
$ npm install -g typescript
```

uninstall로 제거한 후, cache clean 명령어로 기존 설치에 사용됐던 패키지 설치 관련 파일을 삭제하고 install로 새로 설치해 업데이트를 완료합니다.



<br>
<br>

참고

- 타입스크립트 퀵스타트 (정진욱 지음)
