---
title: "메모이제이션(memoization)"
date: "2019-11-28T14:00:00.169Z"
template: "post"
draft: false
slug: "/posts/react/react-memoization/"
category: "React"
tags:
- "react"
description: ""
---

### 1. 로다시 memoize

### 2. 메모이제이션 훅 : useMemo, useCallback

<br>


## 1. 로다시(lodash) memoize 함수

#### 메모이제이션(memoization) 이용하기

메모이제이션이란 무엇일까? 우선 위키피디아의 메모이제이션 정의를 읽어보면,

- 메모이제이션(memoization)은 컴퓨터 프로그램이 같은 계산을 반복해야 할 때, 이전에 계산한 값을 메모리에 저장함으로써 같은 계산의 반복 수행을 제거하여 프로그램 실행 속도를 빠르게 하는 기술이다.

메모이제이션의 구현체는 많지만 이 책에서는 로다시(lodash)의 memoize 함수를 이용해서 설명한다. memoize 함수의 첫 번째 매개변수에는 메모이제이션을 적용하고자 하는 함수가 들어간다.

**<메모이제이션 사용 예>**

```  JavaScript
import memoize from 'lodash/memoize';

function sort(arr) {
  //...
  return sortedArr;
}

const sort2 = memoize(sort);

const inputArr1 = [/**/];
const output1 = sort(inputArr1);
const output2 = sort(inputArr1);

output1 === output2; // true

const inputArr2 = [/**/];
const output3 = sort(inputArr2);

output1 !== output3; // true
```

정렬 함수는 계산량이 많은 대표적인 함수이다. 입력된 배열의 크기가 클수록 계산량은 큰 폭으로 증가한다.

메모이제이션을 적용한 sort2 함수를 이용하면 입력된 배열의 크기가 아무리 크더라도 같은 배열을 입력하면 변수 한 번의 비교로 우리가 원하는 값이 반환된다.

output1 변수의 값을 얻기 위해서 sort 함수가 호출되지만, output2 변수의 값은 정렬 함수로 입력되는 값이 같기 때문에 sort 함수 호출 없이 이전에 계산했던 output1 변수의 값이 반환된다.

반대로 output3 변수의 값은 정렬 함수로 입력되는 값이 다르기 때문에 sort 함수가 호출된다.

렌더 함수 내부에서는 크기가 큰 배열을 이용해서 새로운 배열을 만드는 일이 제법 있다. 이때 메모이제이션을 이용하면 렌더링 성능을 올릴 수 있다. 예를 들어, 렌더 함수 내부의 서울 시민 배열에서 양재동에 사는 시민만 추출하여 배열로 만드는 작업을 한다고 가정해 보자. 서울 시민이라는 입력값이 자주 변하지 않는 값이라는 전제하에 한 번 계산된 값을 이후에 재사용하면 효율이 높아진다.

한 가지 주의할 점은 **memoize 함수는 기본적으로 입력된 값이 변경됐는지 확인하기 위해 단순 비교를 한다는 점** 이다. 따라서 함수에 입력되는 변수가 객체라면 불변 객체로 관리해야 한다. 그렇지 않으면 배열이 변경됐음에도 정렬 결과가 이전과 같은 뜻밖의 버그를 만나게 된다.

**<메모이제이션의 잘못된 사용 예>**

``` JavaScript
const inputArr1 = [/**/];
const output1 = sort(inputArr1);
inputArr1.push('jone');

const output2 = sort(inputArr1);

output1 === output2 // true
```

<br>
<br>

## 2. 메모이제이션 훅
### useMemo, useCallback

useMemo와 useCallback은 이전 값을 기억해서 성능을 최적화하는 용도로 사용된다.

#### useMemo

useMemo 훅은 계산량이 많은 함수의 반환값을 재활용하는 용도로 사용된다.

**<useMemo 훅의 사용 예>**

``` JavaScript
import React, { useMemo } from 'react';
import { runExpensiveJob } from './util';

function MyComponent({ v1, v2 }) {
  const value = useMemo(() => runExpensiveJob(v1, v2), [v1, v2]);
  return <p>{`value is ${value}`}</p>;
}
```

useMemo 훅의 첫 번째 매개변수로 함수를 입력한다. useMemo 훅은 이 함수가 반환한 값을 기억한다. **useMemo 훅의 두 번째 매개변수로 입력된 배열의 값이 변경되지 않으면 이전에 반환된 값을 재사용한다.** 만약 배열의 값이 변경됐으면 첫 번째 매개변수로 입력된 함수를 실행하고 그 반환값을 기억한다.

<br>

#### useCallback

useMemo 훅은 위에서 설명한 로다시 같은 라이브러리에서 제공해 주는 메모이제이션과 비슷하다. 반면에 useCallback은 리액트의 렌더링 성능을 위해 제공되는 훅이다.

훅을 사용하게 되면서 컴포넌트가 렌더링될 때마다 함수를 생성해서 자식 컴포넌트의 속성값으로 입력하는 경우가 많다. 리액트 팀에서는 최근의 브라우저에서 함수 생성이 성능에 미치는 영향을 작다고 주장한다. 그보다는 속성값이 매번 변경되기 때문에 자식 컴포넌트에서 PureComponent나 React.memo를 사용해도 불필요한 렌더링이 발생한다는 문제점이 있다. 리액트에서는 이 문제를 해결하기 위해 useCallback 훅을 제공한다.

**<useCallback 훅이 필요한 예>**

``` JavaScript
import React, { useState } from 'react';
import { saveToServer } from './api';
import UserEdit from './UserEdit';

function Profile() {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  return (
    <div>
      <p>{`name is ${name}`}</p>
      <p>{`age is ${age}`}</p>
      <UserEdit
        onSave={() => saveToServer(name, age)}
        setName={setName}
        setAge={setAge}
      />
    </div>
  );
}
```

Profile 컴포넌트가 렌더링될 때마다 UserEdit 컴포넌트의 onSave 속성값으로 새로운 함수가 입력된다. 따라서 UserEdit 컴포넌트에서 PureComponent 혹은 React.memo를 사용해도 onSave 속성값은 항상 변경되기 때문에 불필요한 렌더링이 발생한다. onSave 속성값은 name이나 age 값이 변경되지 않으면 항상 같아야 한다.

useCallback 훅을 사용하면 불필요한 렌더링을 막을 수 있다.

**<useCallback 훅 사용하기>**

``` JavaScript
//...
function Profile() {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const onSave = useCallback(() => saveToServer(name, age), [name, age]);
  return (
    <div>
      <p>{`name is ${name}`}</p>
      <p>{`age is ${age}`}</p>
      <UserEdit onSave={onSave} setName={setName} setAge={setAge}/>
    </div>
  );
}
```

이전에 onSave 속성값으로 전달했던 것과 같은 함수를 useCallback 훅의 첫 번째 매개변수로 입력한다. 두 번째 매개변수로 전달한 배열의 값이 변경되지 않으면 이전에 생성한 함수가 재사용된다. 따라서 name과 age값이 변경되지 않으면, UserEdit 컴포넌트의 onSave 속성값으로 항상 같은 함수가 전달된다.

<br>
<br>

출처
- 실전 리액트 프로그래밍 (프로그래밍인사이트-이재승)
