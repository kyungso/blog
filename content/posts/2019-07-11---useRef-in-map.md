---
title: (React Hooks) 다중 useRef (useRef in map)
date: "2019-11-07T14:00:00.169Z"
template: "post"
draft: false
slug: "/posts/useRef-in-map/"
category: "React"
tags:
- "CSS"
description: "배열의 map 함수를 이용하여 DOM을 생성할 때, useRef를 다루는 방법"
---

<br>

## How target DOM with react useRef in map

``` JavaScript
const Component = () => {

  const items = Array.from({length: 2}, a => useRef(null));

  return (
    <ul>
      {['red', 'orange', 'yellow', 'green', 'blue'].map((el, i)) => (
        <li key={el} ref={items[i]}>{el}</li>
      )}
    </ul>
  )
}
```

ref를 배열로 선언하여, 배열의 map 함수 내의 index를 이용하여 접근할 수 있습니다.

<br>
<br>

(참고) [stackoverflow - how target dom with react useRef in map](https://stackoverflow.com/questions/54940399/how-target-dom-with-react-useref-in-map)
