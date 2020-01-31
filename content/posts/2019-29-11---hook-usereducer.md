---
title: "리액트 훅 - useReducer"
date: "2019-11-29T14:00:00.169Z"
template: "post"
draft: false
slug: "/posts/hook-usereducer/"
category: "React"
tags:
- "hook"
description: "컴포넌트의 상탯값을 리덕스처럼 관리하기"
---

<br>

## useReducer

useReducer 훅을 사용하면 컴포넌트의 상탯값을 리덕스의 리듀서처럼 관리할 수 있다.

**<useReducer 훅의 사용 예>**

``` JavaScript
import React, { useReducer } from 'react';

const INITIAL_STATE = { name: 'empty', age: 0 };
function reducer(state, action) {
  switch (action.type) {
    case 'setName':
      return { ...state, name: action.name };
    case 'setAge':
      return { ...state, age: action.age };
    default:
      return state;
  }
}

function Profile() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  return (
    <div>
      <p>{`name is ${state.name}`}</p>
      <p>{`age is ${state.age}`}</p>
      <input
        type="text"
        value={state.name}
        onChange={e =>
          dispatch({ type: 'setName', name: e.currentTarget.value })
        }
      />
    </div>
  );
}
```

리덕스의 리듀서와 같은 방식으로 작성한 리듀서 함수다. useReducer 훅의 매개변수로 앞에서 작성한 리듀서와 초기 상탯값을 입력한다. useReducer 훅은 상탯값과 dispatch 함수를 차례대로 반환한다. 리덕스의 dispatch 함수와 같은 방식으로 사용한다.

<br>

##### 트리의 깊은 곳으로 이벤트 처리 함수 전달하기

보통 상위 컴포넌트를 컨테이너 컴포넌트로 만들고 상탯값을 관리한다. 이때 자식 컴포넌트로부터 발생한 이벤트에서 컨테이너 컴포넌트의 상탯값을 변경해야 하는 경우가 많다. 이를 위해 컨테이너 컴포넌트에서 트리의 깊은 곳까지 이벤트 처리 함수를 전달한다. 이 작업은 상당히 손이 많이 가고, 코드의 가독성도 떨어진다.

useReducer 훅과 콘텍스트 API를 이용하면 다음과 같이 상위 컴포넌트에서 트리의 깊은 곳으로 이벤트 처리 함수를 쉽게 전달할 수 있다.

**<useReducer 훅과 콘텍스트 API를 이용해서 이벤트 처리 함수를 전달하기>**

``` JavaScript
//...
export const ProfileDispatch = React.createContext(null);
//...
function Profile() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  return (
    <div>
      <p>{`name is ${state.name}`}</p>
      <p>{`age is ${state.age}`}</p>
      <ProfileDispatch.Provider value={dispatch}>
        <SomeComponent />
      </ProfileDispatch.Provider>
    <div>
  );
}
```

dispatch 함수를 전달해 주는 콘텍스트 객체를 생성한다. Provider를 통해서 dispatch 함수를 데이터로 전달한다. SomeComponent 하위에 있는 모든 컴포넌트에서는 콘텍스트를 통해서 dispatch 함수를 호출할 수 있다.

<br>
<br>

출처
- 실전 리액트 프로그래밍 (프로그래밍인사이트-이재승)
