---
title: "데이트 세트(dataset)로 이벤트 처리 함수에 값 전달하기"
date: "2019-11-28T14:00:00.169Z"
template: "post"
draft: false
slug: "/posts/react/react-dataset-state/"
category: "React"
tags:
- "react"
description: "데이터 세트를 이용하면 돔 요소에 값을 저장하고 자바스크립트 코드에서 그 값을 읽어 들일 수 있다."
---

<br>

### 데이트 세트(dataset)로 이벤트 처리 함수에 값 전달하기

데이터 세트(dataset)는 HTML 표준에 정의된 기능이다. 데이터 세트를 이용하면 돔 요소에 값을 저장하고 자바스크립트 코드에서 그 값을 읽어 들일 수 있다.

이벤트 처리 함수가 호출될 때 특정 값을 전달해야 하는 경우가 종종 발생한다. 데이터 세트를 이용하면 렌더 함수 내부에서 새로운 함수를 생성하지 않고 값을 전달할 수 있다.

**<데이트 세트가 필요한 예>**

``` JavaScript
class MyComponent extends Component {
  state = {
    selectedName: 'mike',
  };
  onClickMike = () => {
    this.setState({ selectedName: 'mike' });
  };
  onClickJone = () => {
    this.setState({ selectedName: 'jone' });
  };
  render() {
    const { selectedName } = this.state;
    return (
      <div>
        <button onClick={this.onClickMike}>mike</button>
        <button onClick={this.onClickJone}>jone</button>
        {`selectedName is ${selectedName}`}
      </div>
    );
  }
}
```

selectedName 상탯값을 변경하기 위해 두 개의 이벤트(onClickMike, onClickJone) 처리 메서드를 정의했다. 새로운 이름이 추가되는 만큼 메서드도 추가해야 하는 비효율적인 구조이므로 개선이 필요하다. 한 가지 방법은 다음과 같이 렌더 함수 내부에서 새로운 함수를 생성하는 것이다.

<br>

**<함수 생성으로 매개변수 전달하기>**

``` JavaScript
class MyComponent extends Component {
  state = {
    selectedName: 'mike',
  };
  onClick = selectedName => {
    this.setState({ selectedName });
  };
  render() {
    const { selectedName } = this.state;
    return (
      <div>
        <button onClick={() => this.onClick('mike'))}>mike</button>
        <button onClick={() => this.onClick('jone')}>jone</button>
        {`selectedName is ${selectedName}`}
      </div>
    );
  }
}
```

onClick 메서드에서 이름을 매개변수로 받는다. 처음의 코드보다는 나아졌지만, 렌더 함수에서 함수를 생성하면 성능에 안 좋다고는 하지만 두개 정도는 티가 안 날 것 같다. 그러나 저 버튼이 수십, 수백 개가 된다면 얘기가 달라질 것이다. 데이터 세트를 사용하면 렌더 함수 내부에서 새로운 함수를 생성하지 않고, 비슷한 양의 코드로 같은 기능을 구현할 수 있다.

<br>

**<데이터 세트로 매개변수 전달하기>**

``` JavaScript
class MyComponent extends Component {
  state = {
    selectedName: 'mike',
  };
  onClick = e => {
    const selectedName = e.currentTarget.dataset.name;
    this.setState({ selectedName });
  };
  render() {
    const { selectedName } = this.state;
    return (
      <div>
        <button onClick={this.onClick} data-name="mike">mike</button>
        <button onClick={this.onClick} data-name="jone">jone</button>
        {`selectedName is ${selectedName}`}
      </div>
    );
  }
}
```

돔 요소에 `data-` 로 시작하는 속성값을 입력한다. `e.currentTarget.dataset.name`으로 돔 요소에 입력했던 데이터는 dataset 속성을 통해 가져온다.

한 가지 주의할 점은 숫자를 입력해도 데이터 세트로 가져올 때는 문자열이라는 점이다. 따라서 원래의 타입이 문자열이 아니었다면 타입 변환을 한 번 해야 한다.

<br>

데이터 세트 이름에는 대문자가 들어갈 수 없다. 대신 단어 사이에 -를 넣어 주면 자바스크립트 코드에서는 카멜 케이스(camel case)로 읽을 수 있다.

**<데이터 세트에서 카멜 케이스 사용하기>**

``` JavaScript
// 값을 저장할 때
<div data-your-name="mike" data-my-favorite-drink="coffee" />;

// 값을 읽어 올 때
const yourName = e.currentTarget.dataset.yourName;
const myFavoriteDrink = e.currentTarget.dataset.myFavoriteDrink;
```

<br>

<br>
<br>

출처
- 실전 리액트 프로그래밍 (프로그래밍인사이트-이재승)
