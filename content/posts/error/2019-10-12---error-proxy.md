---
title: "리액트 프록시 설정"
date: "2019-12-10T14:00:00.169Z"
template: "post"
draft: false
slug: "/posts/error/error-proxy/"
category: "Error"
tags:
- "error"
description: ""
---

<br>

## 프록시 설정

백엔드 서버 4000 포트

리액트 개발 서버 3000 포트로 열려 있을 때, 별도의 설정 없이 API를 호출하려고 하면 오류가 발생합니다.

이 오류를 **CORS(Cross Origin Request) 오류** 라고 합니다.

네트워크 요청을 할 때 주소가 다른 경우에 발생합니다.

웹팩 개발 서버에서 지원하는 프록시(proxy) 기능을 사용하여 해결할 수 있습니다.

이 기능은 개발 서버로 요청하는 API들을 우리가 프록시로 정해 둔 서버로 그대로 전달해 주고 그 응답을 웹애플리케이션에서 사용할 수 있게 해줍니다.

**package.json**

``` JSON
(...)
  "proxy": "http://localhost:4000/"
}
```

<br>
<br>

출처
- 김민준, 리액트를 다루는 기술(개정판)
