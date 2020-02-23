---
title: "[javascript] break문 대신 some 사용하기"
date: "2020-02-23T14:00:00.169Z"
template: "post"
draft: false
slug: "/posts/some-forEach/"
category: "JavaScript"
tags:
- "some"
description: "forEach에 break 대신 some 사용하기"
---

### forEach 문

자바스크립트에서 배열이나 객체의 모든 요소를 순회하는 함수인 forEach문은 있지만 break문은 없다.

예를 들면,

``` JavaScript
[1,2,3,4,5].forEach((i) => {
  if(i == 3) console.log(i);
})
```

위의 예제는 배열 요소 중 값이 3인 경우에 출력한다.
위의 예제는 단순한 예제이지만, 3인 경우 출력한 후에 불필요하게 4,5도 순회한다.

복잡한 예제나 배열의 크기가 큰 경우에 성능을 위해서 break문을 사용하여 해당 조건이 만족했을 때, for문을 탈출하여 불필요한 순회를 없앱니다.

하지만 자바스크립트의 경우 break문이 없기 떄문에 사용자 정의로 오류 객체를 정의하여 사용해야합니다.

``` JavaScript
var Break = new Error('Break');

try {
  [1,2,3,4,5].forEach((i) => {
    if(** == 3) {
      conosle.log('i:', i);
      throw Break;
    }
  });
} catch(e) {
  if(e != Break) throw Break;
}
```

다른 블로그의 참고 예제로 Break라는 사용자 오류객체를 정의해서 순회하다가 멈춰야하는 곳에서 예외를 던져 순회를 멈춰 break 기능을 할 수 있다.

이는 try-catch문을 교묘히 이용해서 원하는 동작을 하도록 하는 것이지만, 원하는 것에 비해서 코드가 너무 지저분해져서 가독성이 좋지 않다.

여기서 some 함수를 사용하면 break 기능을 사용할 수 있다.

<br>

### some 함수

some은 배열 안의 요소 중 최소 1개라도 조건을 만족시키는지 검사하는 함수이다. 빈 배열에서 호출하면 무조건 false를 반환한다.

``` JavaScript
[1,2,3,4,5].forEach((i) => {
  if(i == 3) console.log(i);
  return (i == 3);
});
```

위의 예제를 some을 사용하여 바꿔봤다.
some 함수는 조건이 true가 되는 순간 순회를 멈춘다.

<br>
<br>

참고

- https://blog.outsider.ne.kr/847
