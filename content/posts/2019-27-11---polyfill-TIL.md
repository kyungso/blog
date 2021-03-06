---
title: "폴리필 (polyfill)"
date: "2019-11-27T14:00:00.169Z"
template: "post"
draft: false
slug: "/posts/polyfill-TIL/"
category: "TIL"
tags:
- "react"
description: "폴리필이란?"
---

<br>

## 폴리필 (Polyfill)

새로운 자바스크립트 표준이 나와도 대다수 사용자의 브라우저에서 지원하지 않으면 사용할 수 없다. 언어 표준에는 새로운 문법도 추가되고 새로운 객체나 함수도 추가된다. 새로운 문법은 대부분의 브라우저에서 지원하지 않더라도 바벨을 이용하면 어느 정도 사용이 가능하다. 바벨을 사용하면 빌드 시점에 코드가 변환된다.

새로운 객체나 함수는 성격이 조금 다르다. 물론 새로운 객체나 함수로 작성한 코드도 빌드 시점에 변환할 수 있다. 하지만 이들은 실행 시점에 주입할 수 있다는 장점이 있다. 따라서 실행 시점에 주입하고자 하는 객체나 함수가 현재 환경에 존재하는지 검사해서 존재하지 않는 경우에만 주입하는 게 좋다. 이렇게 **기능이 존재하는지 검사해서 그 기능이 없을 때만 주입하는 것을 폴리필** 이라고 부른다.

<br>
<br>

출처
- 실전 리액트 프로그래밍 (프로그래밍인사이트-이재승)
