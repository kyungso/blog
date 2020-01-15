---
title: "ref 객체의 current 속성 주의"
date: "2019-11-28T14:00:00.169Z"
template: "post"
draft: false
slug: "/posts/react/react-ref-current/"
category: "React"
tags:
- "react"
description: "ref 속성값 사용 시 주의할 점"
---

<br>

### ref 속성값 사용 시 주의할 점

컴포넌트가 마운트 된 이후라고 하더라도 ref 객체의 current 속성이 없을 수 있기 때문에 주의해야 한다.

``` JavaScript
class Form extends React.Component {
  state = {
    showText: true,
  };
  textRef = React.createRef();
  onClickFocus = () => {
    this.textRef.current.focus();
  };
  onClickVisible = () => {
    const { showText } = this.state;
    this.setState({ showText: !showText });
  };
  render() {
    const { showText } = this.state;
    return (
      <div>
        {showText && <input type="text" ref={this.textRef} />}
        <button onClick={this.onClickFocus}>텍스트로 이동</button>
        <button onClick={this.onClickVisible}>텍스트 보이기/가리기</button>
      </div>
    );
  }
}
```

ref 속성값을 입력한 input 요소는 **showText 상탯값에 따라** 존재하지 않을 수 있다. 이렇게 조건부 렌더링을 하는 경우에는 컴포넌트가 마운트된 이후라 하더라도 ref 객체를 사용할 때 주의해야 한다.

input 요소가 존재하지 않는 상태에서 onClickFocus 메서드가 호출되면 textRef 객체의 current 속성은 존재하지 않기 때문에 에러가 발생한다.

따라서 조건부 렌더링이 사용된 요소의 ref 객체는 current 속성을 검사하는 코드가 필요하다.

<current 속성이 존재하는지 검사하기>

``` JavaScript
onClickFocus = () => {
  if(this.textRef.current) {
    this.textRef.current.focus();
  }
};
```

<br>
<br>

출처
- 실전 리액트 프로그래밍 (프로그래밍인사이트-이재승)
