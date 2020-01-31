---
title: "자바스크립트 for in와 for of 반복문"
date: "2020-01-20T14:00:00.169Z"
template: "post"
draft: false
slug: "/posts/javascript-forin/"
category: "JavaScript"
tags:
- "javascript"
description: "for of vs for in"
---

<br>

## for of vs for in

### for of 반복문

배열인 경우, 배열의 값 가져옴

``` JavaScript
var n3 = ['a', 'b', 'c', 'd'];

for(var i of n3) {
  console.log(i) // 'a' 'b' 'c' 'd'
}
```

<br>

### for in 반복문

배열인 경우, 배열의 index 가져옴

``` JavaScript
var n3 = ['a', 'b', 'c', 'd'];

for(var i in n3) {
  console.log(i) // 0 1 2 3
}
```
