---
title: "리액트 생명 주기 메서드"
date: "2019-11-28T14:00:00.169Z"
template: "post"
draft: false
slug: "/posts/react/react-simple-lifecycle/"
category: "React"
tags:
- "react"
description: "생명 주기 메서드 (초기화 단계 / 업데이트 단계 / 소멸 단계)"
---

<br>

## 리액트 생명 주기 메서드

<br>

![react_lifecycle.jpg](/media/react_lifecycle.jpg)

<br>

위의 출처 - 생명 주기 메서드를 한 장의 페이지로 잘 정리한 사이트 [링크](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

<br>

### constructor 메서드

constructor 메서드 작성이 필요한 대표적인 예는 초기 속성값으로부터 상탯값을 만드는 경우다.

constructor 메서드 내부에서는 반드시 super 함수를 호출해야 한다.
다행히 리액트 개발 모드에서는 super 함수를 호출하지 않는 경우 예외를 발생시킨다.


``` JavaScript
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMovie: props.age < 10 ? '뽀로로' : '어벤져스',
    };
  }
}
```

위의 코드처럼 상탯값을 직접 할당하는 것은 constructor 메서드에서만 허용된다.

다른 생명 주기 메서드에서 상탯값을 변경할 때는 setState 메서드를 사용해야 한다.

참고로 자바스크립트 표준이 될 것이 거의 확실한 클래스 필드(class fields)를 사용하면 constructor 메서드를 사용하지 않고 같은 기능을 구현할 수 있다.

``` JavaScript
class MyComponent extends React.Component {
  state = {
    currentMovie: this.props.age < 10 ? '뽀로로' : '어벤져스',
  };
}
```

<br>

**constructor 메서드에서는 setState 메서드를 호출하지 말자**

setState 메서드 호출은 컴포넌트가 마운트된 이후에만 유효하기 때문에 constructor 메서드 내부에서 호출되는 setState 메서드는 무시된다.

마찬가지로 constructor 메서드에서 비동기로 데이터를 가져온 후 setState 메서드를 호출하는 것도 문제가 될 수 있다.

따라서 데이터를 가져오기 위해 호출하는 API는 이후에 설명할 componentDidMount 메서드 내부에서 호출하는게 적절하다.

<br>
<br>

#### getDerivedStateFromProps 메서드

getDerivedStateFromProps 메서드는 속성값을 이용해서 새로운 상탯값을 만들 때 사용된다. 이 메서드는 render 메서드가 호출되기 직전에 호출된다.

`static getDerivedStateFromProps(props, state)`

정적 메서드이기 때문에 함수 내부에서 this 객체에 접근할 수 없다. 오로지 속성값과 상탯값을 기반으로 새로운 상탯값을 만든다.

getDerivedStateFromProps 메서드는 시간에 따라 변하는 속성값으로부터 상탯값을 계산하기 위해 추가됐다.

보통 애니메이션과 관련된 속성값으로부터 상탯값을 계산할 때 유용하다. 이를테면, 특정 요소의 Y축 위치가 속성값일 때 스크롤 여부를 상탯값으로 저장하는 요도로 사용될 수 있다. 그런데 매개변수에 현재 속성값은 있어도 이전 속성값은 없다. 따라서 이전 속성값을 따로 저장해야 한다.

``` JavaScript
class MyComponent extends React.Component {
  state = {
    //...
    prevSpeed: this.props.speed,
  };
  static getDerivedStateFromProps(props, state) {
    if(props.speed !== state.prevSpeed) {
      //...
      return {
        //...
        prevSpeed: props.speed,
      }
    }
    return null;
  }
}
```

리액트 팀에서 getDerivedStateFromProps 메서드의 매개변수에 이전 속성값을 넣지 않은 이유는 다음과 같다고 한다.

- 이전 속성값을 넣을 경우, 최초에 호출될 때는 이전 속성값이 없기 때문에 항상 null을 검사하는 코드가 필요하다.

- 앞으로 모든 생명 주기 메서드의 매개변수에서 이전 속성값을 제거할 예정이다. 이전 속성값이 필요 없어지면 더 이상 메모리에 담고 있지 않아도 되기 때문에 메모리를 절약할 수 있다.

<br>

**getDerivedStateFromProps 메서드를 잘못 사용하는 대표적인 경우**

- 속성값 변화에 따라 API를 호출해야 하는 경우
- 속성값을 입력으로 하는 메모이제이션(memoization)을 상탯값으로 관리하는 경우
- 속성값이 변경될 때 상탯값을 초기화하는 경우

**getDerivedStateFromProps 메서드가 필요한 경우**

- 이전 속성값과 이후 속성값 모두에 의존적인 상탯값이 필요한 경우

<br>
<br>

### render 메서드

render 메서드는 컴포넌트를 정의할 때 반드시 작성해야 한다.
화면에 보여질 render 메서드의 반환값의 내용을 결정한다.

render 함수는 순수 함수(pure function)로 작성해야 한다.

- 렌더 함수 내부에서 setState를 호출하면 안 된다.
- 렌더 함수의 반환값은 속성값과 상탯값만으로 결정되어야 한다.
- 부수 효과를 발생시키면 안 된다.

서버와 통신하기, 브라우저의 쿠키에 저장하기 등은 부수 효과이므로 렌더 함수 내부에서는 피해야 한다. 부수 효과가 필요하다면 다른 생명 주기 메서드에서 하면 된다.

<br>
<br>

### componentDidMount 메서드

componentDidMount 메서드는 render 메서드의 첫 번째 반환값이 실제 돔에 반영된 직후 호출된다. 따라서 render 메서드에서 반환한 리액트 요소가 돔에 반영되어야 알 수 있는 값을 얻을 수 있다.

componentDidMount 메서드에서 setState 메서드를 호출하면 다시 렌더링된다.

componentDidMount 메서드는 API 호출을 통해 데이터를 가져올 때 적합하다. setState 메서드가 마운트 이후에만 동작하기 때문이다.

<br>
<br>

### shouldComponentUpdate 메서드

shouldComponentUpdate 메서드는 성능 최적화를 위해 존재한다.

`shouldComponentUpdate(nextProps, nextState)`

이 메서드는 불 타입을 반환한다.

만약 참(true)을 반환하면 render 메서드가 호출된다.
반대로 거짓(false)을 반환하면 업데이트 단계는 여기서 멈춘다.

이 메서드는 렌더링 성능 최적화에 사용되는데, 성급하게 성능을 고려해서 개발할 필요는 없다.

성능 이슈가 발생했을 때 shouldComponentUpdate 메서드를 작성해도 늦지 않다.

<br>
<br>

### getSnapshotBeforeUpdate 메서드

getSnapshotBeforeUpdate 메서드는 렌더링 결과가 실제 돔에 반영되기 직전에 호출된다. 따라서 getSnapshotBeforeUpdate 메서드가 호출되는 시점에 이전 돔 요소의 상탯값을 가져오기 좋다. 업데이트 단계에서 실행되는 생명 주기 메서드의 호출 순서를 다시 한번 살펴보자.

- static getDerivedStateFromProps()
- shouldComponentUpdate()
- render()
- getSnapshotBeforeUpdate()
- componentDidUpdate()

getSnapshotBeforeUpdate 메서드와 componentDidUpdate 메서드 사이에서 가상 돔이 실제 돔에 반영된다.

따라서 componentDidUpdate 메서드가 호출될 때는 실제 돔이 새로운 상태로 변경된 상태다.

`getSnapshotBeforeUpdate(prevProps, prevState) => snapshot`

getSnapshotBeforeUpdate 메서드가 반환한 값은 componentDidUpdate 메서드의 세 번째 인자로 들어간다. 따라서 getSnapshotBeforeUpdate 메서드에서 이전 돔의 상탯값을 반환하면, componentDidUpdate 메서드에서는 돔의 이전 상탯값과 이후 상탯값을 모두 알기 때문에 돔의 상탯값 변화를 알 수 있다.

<br>
<br>

### componentDidUpdate 메서드

componentDidUpdate 메서드는 업데이트 단계에서 마지막으로 호출되는 생명 주기 메서드다.

`componentDidUpdate(prevProps, prevState, snapshot)`

componentDidUpdate 메서드는 가상 돔이 실제 돔에 반영된 후 호출된다. 따라서 componentDidUpdate 메서드는 새로 반영된 돔의 상탯값을 가장 빠르게 가져올 수 있는 생명 주기 메서드다.

componentDidUpdate 메서드는 속성값이나 상탯값이 변경된 경우 API를 호출하는 용도로 사용되기도 한다.

<br>
<br>

### componentWillUnmount 메서드

componentWillUnmount 메서드는 소멸 단계에서 호출되는 유일한 생명 주기 메서드다.

끝나지 않은 네트워크 요청을 취소, 타이머 해제, 구독(subscription) 해제 등의 작업을 처리하기 좋다.

컴포넌트에서 componentDidMount 메서드가 호출되면 componentWillUnmount 메서드도 호출되는 것이 보장된다. 따라서 componentDidMount 메서드에서 구독하고 componentWillUnmount 메서드에서 구독을 해제하는 코드가 자주 사용된다.

<br>
<br>

### getDerivedStateFromError, componentDidCatch 메서드

getDerivedStateFromError, componentDidCatch 메서드는 생명 주기 메서드에서 발생한 예외를 처리할 수 있다. 생명 주기 메서드에서 예외가 발생하면 getDerivedStateFromError 또는 componentDidCatch 메서드를 구현한 가장 가까운 부모 컴포넌트를 찾는다.

`- static getDerivedStateFromError(error)`
`- componentDidCatch(error, info)`

error 매개변수는 예외가 발생할 때 전달된 에러 객체다. info 매개변수는 어떤 컴포넌트에서 예외가 발생했는지 알려 준다.

getDerivedStateFromError 정적 메서드는 에러 정보를 상탯값에 저장해서 화면에 나타내는 용도로 사용된다.

componentDidCatch 메서드는 에러 정보를 서버로 전송하는 용도로 사용된다.

> 현재(리액트 버전 16.7)은 componentDidCatch 메서드에서도 에러 정보를 상탯값에 저장해서 화면에 나타낼 수 있지만, 추후 componentDidCatch 메서드에서 setState 호출이 막힐 것으로 보인다.

componentDidCatch 메서드는 렌더링 결과를 돔에 반영한 후에 호출되기 때문에 몇 가지 문제를 안고 있다. 대표적으로 서버사이드 렌더링 시 에러가 발생해도 componentDidCatch 메서드는 호출되지 않는 문제다.

<br>

>**[ componentDidCatch 메서드에서 에러 정보를 서버로 전송하는 이유 ]**
>
> componentDidCatch 메서드를 작성하지 않고 getDerivedStateFromError 메서드에서 에러 정보를 서버로 전송해도 되지 않을까? 그렇게 하지 않는게 좋다.
>
>이는 리액트 버전 16.9부터 도입될 것으로 보이는 비동기 렌더링 때문이다.
>
>리액트에서 데이터 변경에 의한 화면 업데이트는 렌더 단계(render phase)와 커밋 단계(commit phase)를 거친다. 렌더 단계에서는 실제 돔에 반영할 변경 사항을 파악하고, 커밋 단계에서는 파악된 변경 사항을 실제 돔에 반영한다. 비동기 렌더링에서는 렌더 단계에서 실행을 멈췄다가 나중에 실행하는 과정에서 같은 생명 주기 메서드를 여러 번 호출할 수 있다.
>
>- getSnapshotBeforeUpdate
>- componentDidMount
>- componentDidUpdate
>- componentDidCatch
>이 메서드를 제외한 나머지 생명 주기 메서드는 렌더 단계에서 호출된다.
>
>getDerivedStateFromError 메서드는 렌더 단계에서 호출되고, componentDidCatch 메서드는 커밋 단계에서 호출된다. 만약 getDerivedStateFromError 메서드에서 에러 정보를 서버로 전송한다면 같은 에러 정보가 여러 번 전송될 수 있다. 커밋 단계의 생명 주기 메서드는 비동기 렌더링에서도 한 번만 호출되기 때문에 에러 정보는 componentDidCatch 메서드에서 전송하는게 좋다.

<br>


<br>
<br>

출처
- 실전 리액트 프로그래밍 (프로그래밍인사이트-이재승)
