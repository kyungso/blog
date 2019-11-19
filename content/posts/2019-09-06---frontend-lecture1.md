---
title: "프론트엔드의 이해"
date: "2019-06-09T14:00:00.169Z"
template: "post"
draft: false
slug: "/posts/frontend-lecture1/"
category: ""
tags:
- "frontend"
description: ""
---

<br>

> "야곰님의 Youtube" [!(프론트엔드개발자)에게 프론트엔드 개발의 이해를 위한 세미나)](https://youtu.be/gp5LeSxfD8Q)

<br>

#### 플랫폼이란 무엇인가?

소스코드가 돌아가는 곳

안드로이드 - Java
아이폰 - Swift
브라우저 - React

#### 브라우저의 발전

node V8 엔진의 탄생
node.js를 중심으로 프론트엔드 태크스택이 독립적으로 발전할 수 있게됨

#### 개발환경

- **트랜트파일러 - 바벨**
: ECMAScript2015(ES6+) 이전 버전의 언어만 사용하는 브라우저들에게 그들의 언어로 변환해주는 모듈

- **번들러 - 웹팩**
: 내가 사용하는 소스코드만 뽑아서 번들링 해준다. 현재는 버전 4까지 나왔고, 보통 버전 3을 많이 쓴다.
[[참고 링크]](https://goo.gl/Hs7YpP)

- **node 패키지 매니저 - npm**

- **CRA(Create React App)**
: 트랜스파일, 번들 기능을 사용하기 위해 관례적(의례적)인 설정을 재작성하는 불편함 create-react-app my-app 한번으로 해결.

#### 리액트 특징

페이스북에서 '뷰만 담당하는 라이브러리이다'라고 리액트를 정의하고 데이터 바인딩을 1-way로 선택.
리액트가 확대되기 전, angular1이 널리 사용되고 있었는데, angular1은 2-way 바인딩이다.

2-way 바인딩은 누구나 데이터를 바꿀 수 있고,
1-way 바인딩은 누구도 데이터를 바꿀 수 없다라고 쉽게 이해하면 된다.

- **컴포넌트 생명주기**
: 컴포넌트가 생성되고 소멸되기까지 호출되는 함수. Lifecycle API
컴포넌트는 안드로이드 기준으로 액티비티
[[참고링크]](https://goo.gl/A9agGU)

- **데이터 바인딩**
: React에는 state와 props 2가지 데이터 타입이 존재한다.
  - state는 말 그대로 상태. 자기만 가지고, 자기가 핸들링 할 수 있는 것. (mutable)
  - props는 properties를 뜻함. (immutable)

  <br>

  ![react1.jpg](/media/react1.jpg)  

  <br>

  - parent 자신의 state를 child로 내려준다. 이 child는 parent의 state를 props로 받는다.
  - 그럼 이 child 컴포넌트를 parent가 생성을 하면서, 자기가 가진 여러 state 중의 하나를 주입을 한다.
  - 그러면 child는 parent로부터 전달받은 데이터를 props라는 객체를 통해서 접근할 수 있다.
  - child 컴포넌트가 사용자로부터 인식한 이벤트를 parent로 전달하고, parent가 이벤트를 처리하는 구조.

<br>

컴포넌트들은 parent든, child든 state를 가진다. 그래서 리액트에서는 state가 필요하다는 'stateful 컴포넌트', state를 사용하지 않겠다는 'stateless 컴포넌트'가 존재한다.

그렇게 되면, 'stateless 컴포넌트'는 무조건 props만 가지고 있게 됩니다.

**리액트는 state나 props 데이터가 변경되면 'rerendering' 하는 특징을 가지고 있습니다.** Virtual DOM이라는 가상의 DOM 객체를 만들어서 실제 브라우저에 보여지는 물리 DOM을 직접 핸들링하지 않고, 메모리에 있는 값을 swap 하는 형태이다.

처음부터 다시 그려지면 시간, 비용이 비쌀텐데라고 생각이 들텐데, 다시 그려지는건 Virtual DOM만 다시 그려진다. Virtual DOM만 새로 그려지고, 이전에 존재했던 물리적인 DOM 객체와 비교해서 변경된 부분만 주입시키는 것이다.

따라서 rerendering은 메모리에서만 일어나고, 실제로 변경되는 부분은 극히 미미하다.

<br>

#### Redux에서 Mobx로

React를 보다보면 데이터 처리를 어떻게 할 것인지 생각하는게 중요해진다.

Redux는 Flux 패턴을 사용했고, Store라는 하나의 큰 데이터 스토어가 있습니다. 그 데이터 스토어는 Redux라고 불리는 데이터 핸들러에서만 변경이 가능하고, 그 Redux에서 변경된 데이터는 action이라고 불리는 dispatcher를 통해서 전파됩니다. 그 action을 수신하고 있는 컴포넌트가 props로 데이터를 받는 것이다.

Mobx는 Observer 패턴이다.
data와 data를 핸들링할 수 있는 action이라 불리는 함수를 가진다.

<br>
<br>

### < Mobx로 슈퍼마켓 구현하기 >
@Velopert 블로그 시리즈 중 마지막 장의 슈퍼마켓 구현
산타모니카 주문 데이터로 주문목록 구현
[[슈퍼마켓 링크]](http://bitly.kr/63L7uA)

먼저 원하는 곳으로 이동하여, CRA 생성

``` bash
$ npx create-react-app dcode-mobx-seminar
```

dcode-mobx-seminar 부분은 원하는 임의의 이름으로 설정하면 된다.

설치가 완료되면, 생성한 폴더로 이동하여 테스트를 해보자.

``` bash
$ cd dcode-mobx-seminar  
$ yarn start
```

실행되는 것을 볼 수 있다. localhost:3000

이제 WebStorm이나 VSCode IDE에서 생성한 폴더를 열어봅시다.

<br>

##### 1. Counter.js 파일 생성

src 디렉토리에 components 폴더를 생성하고, Counter.js 파일을 생성합니다. 다른 파일에서 import를 할 수 있도록 하기 위해 코드 마지막 부분에 export 시켜줍니다.

<br>

![Counter_js.jpg](/media/Counter_js.jpg)  

<br>

##### 2. App.js 파일 수정

다음으로, App.js 파일에서 header 태그 부분을 삭제하고 Counter를 import 한다.

<br>

![App_js.jpg](/media/App_js.jpg)  

<br>

##### 3. 실행

이제 Terminal 창에서 아래의 명령어를 입력하고, 결과를 확인한다.

``` bash
$ yarn start
```

+1 버튼을 누르면 값이 1씩 증가하고, -1 버튼을 누르면 값이 1씩 감소하는 것을 볼 수 있습니다.

<br>

##### 4. mobx mobx-react 설치

이제 ctrl + c 로 종료하고, mobx mobx-react를 설치할 것입니다.

``` bash
$ yarn add mobx mobx-react
```

mobx는 ES7부터 도입된 decorator라고 불리고, 익히 알고있는 어노테이션('@'로 시작하는)을 활용할 수 있게 되는데, 활용하기 위해선 바벨(babel)을 써야합니다.

##### 5. react-scripts

다시 프로젝트로 돌아가서, package.json 파일에서 'react-scripts'를 제거합니다.

``` bash
$ yarn remove react-scripts   
$ yarn add -D react-scripts@2.1.1
```

<br>

> 참고로 '-D'는 '--dev'랑 동일한 것으로, package.json 파일에서 devDependencies를 의미하는 것입니다.

<br>

##### 6. react-app-rewired

``` bash
$ yarn add react-app-rewired@1.6.2
```

위의 react-app-rewired 는 커스텀 하고자 하는 것만 커스텀 하게 해주는 모듈이다.

##### 7. babel 플러그인

계속해서 babel의 플러그인을 설치해봅시다.

``` bash
$ yarn add -D @babel/plugin-proposal-decorators
```

package.json 파일에 devDependencies에 babel 플러그인과 react-scripts가 들어가 있는 것을 확인할 수 있습니다.

##### 8. 프로젝트 실행

이제 우리는 react-scripts로 프로젝트를 실행시키지 않고, react-app-rewired로 프로젝트를 실행시킬 것입니다.

따라서 package.json 파일에서  scripts 부분의 start와 build 부분을 변경합니다.

``` bash
...

"scripts": {
  "start": "react-app-rewired start",
  "build": "react-app-rewired build",
  "test": "react-scripts test",
  "eject": "react-scripts eject"
},

...
```

변경 후, 'yarn start' 명령어를 다시 실행합니다.

"Error: Cannot find module '/Users/ksjung/frontend_study/dcode-mobx-seminar/config-overrides'" 라는 error가 나타납니다.

프로젝트 root 디렉토리에 config-overrides.js 파일을 생성해줍니다.

<br>

![config_overrides.jpg](/media/config_overrides.jpg)  

<br>

설정 후, 'yarn start' 명령어를 실행합니다.

예전과 동일하게 작동하는 것을 볼 수 있습니다.

<br>

##### 9. mobx의 핵심 store 만들기

src 폴더에 stores 폴더를 생성하고, CounterStore.js 파일을 생성합니다.

<br>

![counterstore_js.jpg](/media/counterstore_js.jpg)  

<br>

class를 생성하면 습관적으로 export를 해줘야 한다. 이번 경우에는 new 연산자를 통해서 생성해줘야 합니다. 그 이유는 이건 리액트 컴포넌트가 아니라 ES6 클래스이기 때문에 사용할 수 있게 인스턴스화 시켜줘야 합니다.

<br>

> **[참고]  
CRA를 활용해서 리액트 프로젝트를 만들면, 앱의 시작점은 index.js, 컴포넌트의 시작점은 App.js**

<br>
