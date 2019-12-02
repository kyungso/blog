---
title: "리덕스 사가(redux-saga)"
date: "2019-11-13T14:00:00.169Z"
template: "post"
draft: false
slug: "/posts/redux-saga/"
category: "React"
tags:
- "React"
- "Test"
description: "비동기 처리 미들웨어인 redux-saga / 사가 함수 테스트하기"
---

<br>

> 참고 사이트 - [redux-saga](https://github.com/reactkr/learn-react-in-korean/blob/master/translated/deal-with-async-process-by-redux-saga.md)

<br>


Redux는 단일 Store, 불변적인 State, Side effect가 없는 Reducer의 3가지 원칙을 내세운 Flux 프레임워크입니다. 하지만 비동기 처리를 지원하지 않습니다. redux-thunk, redux-promise 등 여러 미들웨어 중 redux-saga를 알아보려고 합니다.

<br>

## redux-saga

**redux-saga** 는 "Task"라는 개념을 Redux로 가져오기 위한 지원 라이브러리입니다. 여기서 말하는 Task란 일의 절차와 같은 독립적인 실행 단윌로써, 각각 평행적으로 작동합니다. redux-saga는 이 Task의 실행환경을 제공합니다. 더불어 비동기처리를 Task로써 기술하기 위한 준비물인 "Effect"와 비동기처리를 동기적으로 표현하는 방법을 제공하고 있습니다. Effect란 Task를 기술하기 위한 커맨드(명령, Primitive)와 같은 것으로, 아래와 같은 것들을 Effect라고 합니다.

- `select` : State로부터 필요한 데이터를 꺼낸다.

- `put` : Action을 dispatch한다.

- `take` : Action을 기다린다. 이벤트의 발생을 기다린다.

- `call` : Promise의 완료를 기다린다.

- `fork` : 다른 Task를 시작한다.

- `join` : 다른 Task의 종료를 기다린다.

- ...

saga는 애플리케이션에서 사이드 이펙트만을 담당하는 별도의 쓰레드와 같은 것으로 보면 됩니다. `redux-saga` 는 리덕스 미들웨어입니다. 따라서 앞서 말한 쓰레드가 메인 애플리케이션에서 일반적인 리덕스 액션을 통해 실행되고, 멈추고, 취소될 수 있게 합니다. 또한 모든 리덕스 애플리케이션의 상태에 접근할 수 있고 리덕스 액션 또한 dispatch할 수 있습니다.

<br>

#### 샘플 코드

``` JavaScript
function* handleRequestUser() {
  while (true) {
    const action = yield take(REQUEST_USER);
    const { payload, error } = yield call(API.user, action.payload);
    if (payload && !error) {
      yield put(successUser(payload));
    } else {
      yield put(failureUser(error));
    }
  }
}

export default function* rootSaga() {
  yield fork(handleRequestUser);
}
```

> 1. redux-saga의 Middleware가 `rootSaga` Task를 시작시킨다.
> 2. `fork` Effect로 인해 `handleRequestUser` Task가 시작된다.
> 3. `take` Effect로 `REQUEST_USER` Action이 dispatch되길 기다린다.
> 4. (누군가가 `REQUEST_USER` Action을 dispatch한다.)
> 5. `call` Effect로 `API.user` 함수를 불러와서 통신처리의 완료를 기다린다.
> 6. (통신처리가 완료된다.)
> 7. `put` Effect를 사용하여 `SUCCESS_USER` 혹은 `FAILURE_USER` Action을 dispatch한다.
> 8. while 루프에 따라 3번으로 돌아간다.

<br>

Action을 기다리기 위해 `take` Effect를 부르는 이 행동이 **비동기처리를 동기적으로 쓴다** 라는 특징적인 Task의 표현으로 이어집니다.

redux-saga의 Task를 Generator 함수로 쓰는 이유는 `yield` 에 따라 처리의 흐름을 일시정지하기 때문입니다. 이러한 체계 덕분에 싱글 스레드의 Javascript로 복수의 Task를 만들어, 각각 특정한 Action을 기다리거나, 통신처리의 결과를 기다려도 처리가 밀리지 않게 됩니다.

샘플 코드를 보면 하나의 Task는 전체가 while문으로된 무한 루프로 감싸여 있는 것을 볼 수 있습니다. 그 결과 `put` Effect로 Action을 dispatch한 후, 루프의 처음으로 돌아가서 다시 한번 `take` Effect로 Action을 기다리게 됩니다.

즉, Action을 기다려 통신처리를 할 뿐인 Task가 됩니다.


<br>

#### 장점

- Mock 코드를 많이 쓰지 않아도 된다.

- 작은 코드로 더 분할할 수 있다.

- 재이용이 가능해진다.

<br>
<br>

## redux-saga 적용 (redux-actions)

redux-saga를 쓸 땐 2가지를 합니다.

하나는 Store에 Middleware를 집어넣고, 다른 하나는 Task를 정의합니다.

`store.js`

``` JavaScript
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import modules from './modules';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(modules, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(rootSaga);

export default store;
```

<br>

처음에 나온 통신처리의 샘플 코드는 큰 문제를 지니고 있습니다.

통신처리의 완료를 기다리는 동안 dispatch되는 Action을 흘려보내 버립니다.

#### 흘림방지 대책

문제는 `call`로 `API.suggest`의 결과를 기다리는 곳입니다. 이것이 불러지는걸 기다리지 않고 `take`로 돌아가면 또 다른 Action을 흘려보내지 않게 됩니다. 그렇다면 아래와 같이 `fork`로 새로운 Task를 기동시키도록 합시다.

``` JavaScript
function* runRequestSuggest(text) {
  const { data, error } = yield call(API.suggest, text);
  if(data && !error) {
    yield put(successSuggest({ data }));
  } else {
    yield put(failureSuggest({ error }));
  }
}

function* handleRequestSuggest() {
  while(true) {
    const { payload } = yield take(REQUEST_SUGGEST);
    yield fork(runRequestSuggest, payload);
  }
}

export default function* rootSaga() {
  yield fork(handleRequestSuggest);
}
```

<br>

이것으로 `handleRequestSuggest` Task로 통신처리까지 핸들링하고 있지만, `call` 이후의 부분을 따로 Task로 나누었습니다.

이렇게 Action을 감시하는 Task와 통신처리를 하는 Task를 나누는 것이 좋아보입니다.

<br>

#### 다른 해결방법

위의 패턴이 빈번하게 나오기 때문에 `takeEvery`가 준비되어 있습니다.

`sagas.js`

``` JavaScript
import { call, put, fork, takeEvery } from 'redux-saga/effects';

function* runRequestSuggest(action) {
  const { data, error } = yield call(API.suggest, action.payload);
  if(data && !error) {
    yield put(successSuggest({ data }));
  } else {
    yield put(failureSuggest({ error }));
  }
}

function* handleRequestSuggest() {
  yield takeEvery(REQUEST_SUGGEST, runRequestSuggest);
}

export default function* rootSaga() {
  yield fork(handleRequestSuggest);
}
```

<br>

`takeEvery`는 지정한 Action의 dispatch를 기다려, 그 Action을 인수로써 Task를 기동합니다.

<br>
<br>

### 사가 함수 테스트하기

리덕스 사가는 특히 테스트 코드를 작성할 때 빛을 발한다. 일반적으로 API 통신과 같은 비동기 코드를 테스트하려면 모조(mock) 객체를 생성해야 하지만 리덕스 사가에서는 모조 객체가 필요 없다. 이는 부수 효과 함수를 호출한 결과가 간단한 자바스크립트 객체이기 때문이다.

`npm install @redux-saga/testing-utils`

**<fetchData 함수>**

``` JavaScript
export function* fetchData() {
  while(true) {
    const { timeline } = yield take(types.REQUEST_LIKE);
    yield put(actions.setLoading(true));
    yield put(actions.addLike(timeline.id, 1));
    try {
      yield call(callApiLike);
    } catch(error) {
      yield put(actions.setError(error));
      yield put(actions.addLike(timeline.id, -1));
    }
    yield put(actions.setLoading(false));
  }
}
```

예외가 발생하는 경우와 발생하지 않은 경우를 각각 테스트할 것이다.

**<state/saga.test.js 파일의 내용>**

``` JavaScript
import  { take, put, call } from 'redux-saga/effects';
import { cloneableGenerator } from "@redux-saga/testing-utils";
import { types, action } from './index';
import { fetchData } from './saga';
import { callApiLike } from '../../common/api';

describe("fetchData", () => {
  const timeline = { id: 1 };
  const action = actions.requestLike(timeline);
  const gen = cloneableGenerator(fetchData)();
  expect(gen.next().value).toEqual(take(types.REQREQUEST_LIKE));
  expect(gen.next(action).value).toEqual(put(actions.setLoading(true)));
  expect(gen.next().value).toEqual(put(actions.addLike(timeline.id, 1)));
  expect(gen.next(aciton).value).toEqual(put(actions.setError('')));
  expect(gen.next().value).toEqual(call(callApiLike));
  it("on fail callApiLike", () => {
    const gen2 = gen.clone();
    const errorMsg = "error";
    expect(gen2.throw(errorMsg).value).toEqual(put(actions.setError(errorMsg)));
    expect(gen2.next().value).toEqual(put(actions.aaddLike(timeline.id, -1)));
  });
  it("on success callApiLike", () => {
    const gen2 = gen.close();
    expect(gen2.next(Promise.resolve()).value).toEqual(
      put(actions.setLoading(false))
    );
    expect(gen2.next().value).toEqual(take(types.REQUEST_LIKE));
  });
});
```

cloneableGenerator 함수를 이용하면 복사가 가능한 제네레이터 객체를 만들 수 있따. 제너레이터 객체를 복사하면 다양한 경우를 테스트하기 좋다.

callApiLike 함수에서 프로미스 객체를 거부됨 상태로 만드는 경우를 테스트하는 부분은, 프로미스 객체가 처리됨 상태가 되는 경우도 테스트해야 하므로 제너레이터 객체를 복사한다. 제너레이터 객체의 next 함수 대신에 throw 함수를 호출하면 예외를 발생시킬 수 있다.
<br>
<br>

> 참고

  - [리액트 사가 사용하기](http://jeonghwan-kim.github.io/dev/2019/07/29/react-saga-ts-2.html)

  - [왜 리덕스 사가인가?](https://gracefullight.dev/2017/12/06/Why-redux-saga/)
