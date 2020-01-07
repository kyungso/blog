---
title: "SASS 조건문, 삼항연산자"
date: "2020-01-07T14:00:00.169Z"
template: "post"
draft: false
slug: "/posts/sass-conditional-statement/"
category: "HTML/CSS"
tags:
- "CSS"
- "SaSS"
description: ""
---

<br>

## SASS 조건문, 삼항연산자

**index.html**

``` HTML
(...)
<body>
  <div class="box1">작은 박스입니다.</div>
  <div class="box2">큰 박스입니다.</div>
</body>
```

**css/style.scss**

``` CSS
$medium: 500px; // 중간값

@maxin calcSize($width) {
  @if $medium > $width {
    background: pink;
  } @else {
    background: blue;
  }
}

%box {
  height: 200px;
  background: red;
}

.box1 {
  @extend %box;
  @include calcBox(200px);
}

.box1 {
  @extend %box;
  @include calcBox(600px);
}
```
