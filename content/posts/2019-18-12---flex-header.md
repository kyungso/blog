---
title: "(CSS) flexbox로 만드는 header"
date: "2019-12-18T14:00:00.169Z"
template: "post"
draft: false
slug: "/posts/flex-header/"
category: "HTML/CSS"
tags:
- "flex"
description: "flexbox로 만드는 header 정리"
---

<br>

## header (left & right)

**HTML 파일**

``` HTML
<div class="header">
  <button class="logo">logo</button>
  <button class="login">login</button>
</div>
```

<br>

**CSS 파일**

``` CSS
.header {
  display: flex;
  background-color: gray;
}

.logo, .login {
  padding: 20px 30px;
  background-color: white;
}

.login {
  margin-left: auto;
}
```

<br>

간단하게 설명하면, header에 왼쪽에 로고, 오른쪽에 로그인 버튼이 있는 구조입니다.

로그인버튼이 오른쪽에 위치하게 만들기 위해서, `margin-left: auto`로 설정한다면 로그인 버튼의 왼쪽의 모든 공간을 차지하기 위해 로그인 버튼을 오른쪽으로 밀어내는 효과를 가져 오른쪽에 위치할 수 있습니다.

<br>
<br>

- 참고

  - https://d2.naver.com/helloworld/8540176
