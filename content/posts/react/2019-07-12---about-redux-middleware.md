---
title: "리덕스 미들웨어"
date: "2019-12-07T14:00:00.169Z"
template: "post"
draft: false
slug: "/posts/react/about-redux-middleware/"
category: "React"
tags:
- "미들웨어"
description: "리덕스 미들웨어를 통한 비동기 작업 관리"
---

<br>

## 미들웨어란?

리덕스 미들웨어는 액션을 디스패치했을 때 리듀서에서 이를 처리하기에 앞서 사전에 지정된 작업들을 실행합니다. 미들웨어는 액션과 리듀서 사이의 중간자라고 볼 수 있습니다.

<br>

#### 미들웨어 만들어보기

간단한 미들웨어를 직접 만들어보면서 미들웨어의 작동 방식을 제대로 이해해봅시다!

액션이 디스패치될 때마다 액션의 정보와 액션이 디스패치되기 전후의 상태를 콘솔에 보여주는 로깅 미들웨어를 만듭니다.

``` JavaScript
const loggerMiddleware = store => next => action => {

};

export default loggerMiddleware;
```

<br>

위의 코드를 function 키워드로 풀어서 쓴다면,

``` JavaScript
const loggerMiddleware = function loggerMiddleware(store) {
  return function(next) {
    return function(action) {

    };
  };
};
```

미들웨어는 결국 함수를 반환하는 함수를 반환하는 함수입니다.

- store - 리덕스 스토어 인스턴스

- action - 디스패치된 액션

- next - 함수 형태, store.dispatch와 비슷한 역할

  - next(action)을 호출하면 그다음 처리해야 할 미들웨어에게 액션을 넘겨주고, 만약 그다음 미들웨어가 없다면 리듀서에게 액션을 넘겨줍니다.

<br>

계속해서 미들웨어를 만들어보면,

``` JavaScript
const loggerMiddleware = store => next => action => {
  console.group(action && action.type); // 액션 타입으로 log를 그룹화함
  console.log('이전 상태', store.getState());
  console.log('액션', action);
  next(action); // 다음 미들웨어 혹은 리듀서에게 전달
  console.log('다음 상태', store.getState()); // 업데이트된 상태
  console.groupEnd(); // 그룹 끝
};

export default loggerMiddleware;
```

<br>

미들웨어는 스토어를 생성하는 과정에서 적용하므로, index.js에 추가해줍니다.
createStore 부분에 코드를 추가해줍니다.

``` JavaScript
const store = createStore(rootReducer, applyMiddleware(loggerMiddleware));
```

<br>

#### redux-logger 사용하기

방금 만든 loggerMiddleware보다 훨씬 더 잘 만들어진 오픈 소스 라이브러리입니다.

`$ yarn add redux-logger`

``` JavaScript
...
import { createLogger } from 'redux-logger';

const logger = createLogger();
const store = createStore(rootReducer, applyMiddleware(logger));
...
```

<br>

## 비동기 작업을 처리하는 미들웨어

### redux-thunk

비동기 작업을 처리할 때 가장 많이 사용하는 미들웨어입니다.

객체가 아닌 함수 형태의 액션을 디스패치하여 미들웨어에서 해당 함수에 스토어의 dispatch와 getState를 파라미터로 넣어서 사용하는 원리입니다.

그래서 구현한 thunk 함수 내부에서 원하는 API 요청도 하고, 다른 액션을 디스패치하거나 현재 상태를 조회할 수도 있습니다.

##### Thunk란?

Thunk는 특정 작업을 나중에 할 수 있도록 미루기 위해 함수 형태로 감싼 것을 의미합니다.

``` JavaScript
const addOne = x => x + 1;
addOne(1); // 2
```

이 코드를 실행하면 addOne을 호출했을 때 바로 연산됩니다. 이 연산 작업을 나중에 하도록 미루고 싶다면 아래와 같이 할 수 있습니다.

``` JavaScript
const addOne = x => x + 1;
function addOneThunk(x) {
  const thunk = () => addOne(x);
  return thunk;
}

const fn = addOneThunk(1);
setTimeout(() => {
  const value = fn(); // fn이 실행되는 시점에 연산
  console.log(value);
}, 1000);
```

이렇게 하면 특정 작업을 나중에 하도록 미룰 수 있습니다.

모든 액션에 따른 3가지(action.type, action.type_success, action.type_failure) 타입을 선언해야 하고, 비슷한 패턴의 중복되는 액션 생성 함수를 만들어야하는 코드를 리팩토링하여 redux-thunk 유틸 함수를 만들어보면, 아래와 같습니다.

먼저 로딩 상태를 관리하는 유틸 함수부터 만들어보겠습니다.

**modules/loading.js**

``` JavaScript
import { createAction, handleActions } from 'redux-actions';

const START_LOADING = 'loading/START_LOADING';
const FINISH_LOADING = 'loading/FINISH_LOADING';

export const startLoading = createAction(
  START_LOADING,
  requestType => requestType
);

export const finishLoading = createAction(
  FINISH_LOADING,
  requestType => requestType
);

const initialState = {};

const loading = handleActions(
  {
    [START_LOADING]: (state, action) => ({
      ...state,
      [action.payload]: true
    }),
    [FINISH_LOADING]: (state, action) => ({
      ...state,
      [action.payload]: false
    })
  },
  initialState
);

export default loading;
```

<br>

**lib/createRequestThunk.js**

``` JavaScript
import { startLoading, finishLoading } from '../modules/loading';

export default function createRequestThunk(type, request) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return params => async dispatch => {
    dispatch({ type }); // 시작
    dispatch(startLoading(type));
    try {
      const response = await request(params);
      dispatch({
        type: SUCCESS,
        payload: response.data
      }); // 성공
      dispatch(finishLoading(type));
    } catch(e) {
      dispatch({
        type: FAILURE,
        payload: e,
        error: true
      }); // 에러 발생
      dispatch(startLoading(type));
      throw e;
    }
  };
}

// 사용법 : createRequestThunk('GET_USES', api.getUsers);
```

<br>
<br>

### redux-saga

redux-thunk 다음으로 가장 많이 사용되는 비동기 작업 관련 미들웨어 라이브러리입니다. 특정 액션이 디스패치되었을 때 정해진 로직에 따라 다른 액션을 디스패치시키는 규칙을 작성하여 비동기 작업을 처리할 수 있게 해줍니다.

redux-thunk보다 좀 더 까다로운 상황에서 유용합니다.

- 기존 요청을 취소 처리해야 할 때(불필요한 중복 요청 방지)

- 특정 액션이 발생했을 때 다른 액션을 발생시키거나, API 요청 등 리덕스와 관계없는 코드를 실행할 때

- 웹소켓을 사용할 때

- API 요청 실패 시 재요청해야 할 때

redux-saga는 제너레이터 함수 문법을 기반으로 비동기 작업을 관리해 줍니다.
좀 더 이해하기 쉽게 설명하면, 우리가 디스패치하는 액션을 모니터링해서 그에 따라 필요한 작업을 따로 수행할 수 있는 미들웨어입니다.

<br>

#### 비동기 카운터 만들기

**modules/counter.js**

``` JavaScript
import { createAction, handleActions } from 'redux-actions';
import { delay, put, takeEvery, takeLatest } from 'redux-saga/effects';

const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';
const INCREASE_ASYNC = 'counter/INCREASE_ASYNC';
const DECREASE_ASYNC = 'counter/DECREASE_ASYNC';

export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

export const increaseAsync = createAction(INCREASE_ASYNC, () => undefined);
export const decreaseAsync = createAction(DECREASE_ASYNC, () => undefined);

function* increaseSaga() {
  yield delay(1000); // 1초 기다림
  yield put(increase()); // 특정 액션을 디스패치
}

function* decreaseSaga() {
  yield delay(1000);
  yield put(decrease());
}

export function* counterSaga() {
  // takeEvery는 들어오는 모든 액션에 대해 특정 작업을 처리해 줍니다.
  yield takeEvery(INCREASE_ASYNC, increaseSaga);
  // takeLatest는 기존에 진행 중이던 작업이 있다면 취소하고,
  // 가장 마지막으로 실행된 작업만 수행합니다.
  yield takeLatest(DECREASE_ASYNC, decreaseSaga);
}

const initialState = 0;

const counter = handleActions(
  {
    [INCREASE]: state => state + 1,
    [DECREASE]: state => state - 1
  },
  initialState
);

export default counter;
```

<br>

루트 리듀서를 만들었던 것처럼 루트 사가도 만들어 주어야 합니다.

**modules/index.js**

``` JavaScript
...
import counter, { counterSaga } from './counter';
...

const rootReducer = combineReducers({
  ...
});

export function* rootSaga() {
  // all 함수는 여러 사가를 합쳐 주는 역할
  yield all([counterSaga()]);
}
...
```

<br>

다음으로, 이제 스토어에 redux-saga 미들웨어를 적용해 줍니다.

**index.js**

``` JavaScript
...
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);
...
```

<br>

##### 리덕스 개발자 도구 사용하기

`$ yarn add redux-devtools-extension`

**index.js**

``` JavaScript
...
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
)
...
```

<br>

**select**
사가 내부에서 현재 상태를 참조해야 하는 상황에서 사용

**throttle**
사가가 실행되는 주기를 제한하는 방법
(예를 들면, 사가가 n초에 단 한 번만 호출되도록 설정)

<br>
<br>

출처
- 김민준, 리액트를 다루는 기술(개정판)
