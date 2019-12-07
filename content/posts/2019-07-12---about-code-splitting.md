---
title: "코드 스플리팅"
date: "2019-12-07T14:00:00.169Z"
template: "post"
draft: false
slug: "/posts/about-code-splitting/"
category: "React"
tags:
- "코드 스플리팅"
description: ""
---

<br>

## 코드 스플리팅

### 리액트 프로젝트 빌드하기

리액트 프로젝트를 완성하여 사용자에게 제공할 때는 빌드 작업을 거쳐서 배포해야 합니다.

빌드 작업을 통해 프로젝트에서 사용되는 자바스크립트 파일 안에서 불필요한 주석, 경고 메시지, 공백 등을 제거하여 파일 크기를 최소화하기도 하고, 브라우저에서 JSX 문법이나 다른 최신 자바스크립트 문법이 원활하게 실행되도록 코드의 트랜스파일 작업도 할 수 있습니다. 만약 프로젝트 내에 이미지와 같은 정적 파일이 있다면 해당 파일을 위한 경로도 설정된다.

이 작업은 웹팩(webpack)이라는 도구가 담당합니다.
웹팩에서 별도의 설정을 하지 않으면 프로젝트에서 사용 중인 모든 자바스크립트 파일이 하나의 파일로 합쳐지고, 모든 CSS 파일도 하나의 파일로 합쳐집니다.

CRA 프로젝트를 빌드할 경우 최소 두 개 이상의 자바스크립트 파일이 생성되는데요.

> CRA = 'create react app으로 만든 프로젝트

CRA의 기본 웹팩 설정에는 SplitChunks라는 기능이 적용되어 node_modules에서 불러온 파일, 일정 크기 이상의 파일, 여러 파일 간에 공유된 파일을 자동으로 따로 분리시켜서 캐싱의 효과를 제대로 누릴 수 있게 해 줍니다.

리액트 프로젝트를 생성해서 빌드를 하면, 밑에 그림과 같이 나옵니다.

![code_splitting_1.jpg](/media/code_splitting_1.jpg)   

파일 이름을 보면 '5f512216' 같은 해시(hash) 값이 포함되어 있습니다.
이 값은 빌드하는 과정에서 해당 파일의 내용에 따라 생성되며, 이를 통해 브라우저가 새로 파일을 받아야 할지 받지 말아야 할지를 알 수 있습니다.

<br>

- **2로 시작하는 파일** 에는 React, ReactDOM 등 node_modules에서 불러온 라이브러리 관련 코드가 들어 있습니다.

<br>

- **main으로 시작하는 파일** 에는 직접 프로젝트에 작성하는 App 같은 컴포넌트에 대한 코드가 들어 있습니다.

<br>

2로 시작하는 파일은 코드가 엄청나게 긴 반면, main으로 시작하는 파일은 코드가 매우 짧을 것입니다.

SplitChunks라는 웹팩 기능을 통해 자주 바뀌지 않는 코드들이 2로 시작하는 파일에 들어 있기 때문에 캐싱의 이점을 더 오래 누릴 수 있습니다.

App.js의 코드를 마음대로 변경해 보세요.

**App.js**

``` JavaScript
...
<p>Hello React!</p>
...
```

변경하고 다시 `yarn build` 명령어로 프로젝트를 다시 빌드해 보세요.

빌드 후 build/static 디렉터리를 다시 열어 보면 기존에 node_modules에서 불러온 라이브러리가 들어 있던 2로 시작하는 파일의 이름은 바뀌지 않았고, 작성하는 컴포넌트 관련 코드가 들어 있던 main으로 시작하는 파일의 이름은 바뀐 것을 확인할 수 있습니다.

<br>

이렇게 파일을 분리하는 작업을 코드 스플리팅이라고 합니다.
프로젝트에 기본 탑재된 SplitChunks 기능을 통한 코드 스플리팅은 단순히 효율적인 캐싱 효과만 있을 뿐입니다.

예를 들어 페이지 A, B, C로 구성된 싱글 페이지 애플리케이션(SPA)을 개발한다고 가정해 봅시다. 사용자가 A 페이지에 방문했다면 B 페이지와 C 페이지에서 사용하는 컴포넌트 정보는 필요하지 않습니다. 사용자가 실제로 B 혹은 C 페이지로 이동하려고 할 때만 필요하겠죠.

하지만 리액트 프로젝트에 별도로 설정하지 않으면 A, B, C 컴포넌트에 대한 코드가 모두 한 파일(main)에 저장되어 버립니다. 만약 애플리케이션의 규모가 커지면 지금 당장 필요하지 않은 컴포넌트 정보도 모두 불러오면서 파일 크기가 매우 커집니다. 그러면 로딩이 오래 걸리기 때문에 사용자 경험도 안 좋아지고 트래픽도 많이 나오겠지요.

이러한 문제점을 해결해 줄 수 있는 방법이 바로 **코드 비동기 로딩** 입니다. 이 또한 코드 스플리팅 방법 중 하나입니다. 코드 비동기 로딩을 통해 자바스크립트 함수, 객체, 혹은 컴포넌트를 처음에는 불러오지 않고 필요한 시점에 불러와서 사용할 수 있습니다.

<br>
<br>

### 자바스크립트 함수 비동기 로딩

컴포넌트 코드 스플리팅 전에, 자바스크립트 함수를 스플리팅 먼저 해봅시다!

**src/notify.js**

``` JavaScript
export default function notify() {
  alert('안녕하세요!');
}
```

Hello React! 문구를 누르면 notify 함수가 실행되도록 수정합니다.

**src/App.js**

``` JavaScript
...
function App() {
  const onClick = () => {
    import('./notify').then(result => result.default());
  };
  return (
    ...
    <p onClick={onClick}>Hello React!</p>
    ...
  );
}
...
```

**import를 상단에 하지 않고, import() 함수 형태로 메서드 안에서 사용하면, 빌드 후 파일을 따로 분리시켜서 저장합니다.**

<br>

import를 함수로 사용하면 Promise를 반환합니다.

import를 함수로 사용하는 문법은 현재 표준 자바스크립트가 아니지만, stage-3 단계에 있는 dynamic import라는 문법이라고 합니다.

다시 `yarn build` 빌드 해보면, 3으로 시작하는 파일이 생겼고, 그 파일 안엔 notify 관련 코드가 들어있습니다.

<br>
<br>

### React.lazy와 Suspense를 통한 컴포넌트 코드 스플리팅

리액트 v16.6 버전부터 도입
이전 버전에서는 import 함수를 통해 불러온 다음, 컴포넌트 자체를 state에 넣는 방식으로 구현해야 합니다.

<br>

####  (v16.6 이전) state를 사용한 코드 스플리팅

<br>

**SplitMe.js**

``` JavaScript
import React from 'react';

const SplitMe = () => {
  return <div>SplitMe</div>
};

export default SplitMe;
```

<br>

**App.js**

``` JavaScript
import React, { Component } from 'react';
...
class App extends Component {
  state = {
    SplitMe: null
  };
  handleClick = async () => {
    const loadedModule = await import('./SplitMe');
    this.setState({
      SplitMe: loadedModule.default
    });
  };
  render(){
    const { SplitMe } = this.state;
    ...
    {SplitMe && <SplitMe />}
  }
}
...
```

state를 사용하여 컴포넌트 코드 스플리팅을 하는 것이 그렇게 어렵지는 않지만, 매번 state를 선언해 주어야 한다는 점이 조금 불편합니다.

<br>


#### React.lazy와 Suspense 사용하기

이것을 사용하면 코드 스플리팅을 하기 위해 state를 따로 선언하지 않고도 정말 간편하게 컴포넌트 코드 스플리팅을 할 수 있습니다.

- **React.lazy** : 컴포넌트를 렌더링하는 시점에서 비동기적으로 로딩할 수 있게 해주는 유틸 함수

  ``` JavaScript
  const SplitMe = React.lazy(() => import('./SplitMe'));
  ```

<br>

- **Suspense** : 리액트 내장 컴포넌트로서 코드 스플리팅된 컴포넌트를 로딩하도록 발동시킬 수 있고, 로딩이 끝나지 않았을 때 보여 줄 UI를 설정할 수 있습니다.

  ``` JavaScript
  import React, { Suspense } from 'react';

  (...)
  <Suspense fallback={<div>loading...</div>}
    <SplitMe />
  </Suspense>
  ```

  Suspense에서 fallback props를 통해 로딩 중에 보여 줄 JSX를 지정할 수 있습니다.

<br>

**App.js**

``` JavaScript
import React, { useState, Suspense } from 'react';
...

const SplitMe = React.lazy(() => import('./SplitMe'));

function App() {
  const [visible, setVisible] = useState(false);
  const onClick = () => {
    setVisible(true);
  };
  return (
    ...
    <Suspense fallback={<div>loading...</div>}>
      {visible && <SplitMe />}
    </Suspense>
  );
}
...
```

다시 `yarn build` 빌드 후, `yarn start`로 실행합니다.

개발자 도구의 Network 탭에서 Online을 클릭하여 'Slow 3G'로 네트워크 속도를 느리게 설정하면, 로딩 문구를 볼 수 있습니다.

<br>
<br>

#### Loadable Components를 통한 코드 스플리팅

Loadable Components는 코드 스플리팅을 편하게 하도록 도와주는 서드파티 라이브러리입니다. 이 라이브러리는 서버 사이드 렌더링을 지원합니다. 또한, 렌더링하기 전에 필요할 때 스플리팅된 파일을 미리 불러올 수 있는 기능도 있습니다. 그 외에도 타임아웃, 로딩 UI 딜레이, 서버 사이드 렌더링 호환 등 다양한 기능을 제공합니다. (자세한 내용은 [공식 문서](https://www.smooth-code.com/open-source/loadable-components/docs/delay/)를 확인)

위에서 설명한 React.lazy와 Suspense는 아직 서버 사이드 렌더링을 지원하지 않습니다.

<br>

##### 1) 라이브러리 설치

`$ yarn add @loadable/component`

<br>

##### 2) App.js 수정

**App.js**

``` JavaScript
...
import loadable from '@loadable/component';
const SplitMe = loadable(() => import('./SplitMe'), {
  fallback: <div>loading...</div>
});

function App() {
  const [visible, setVisible] = useState(false);
  const onClick = () => {
    setVisible(true);
  };
  return (
    ...
    {visible && <SplitMe />}
  );
}
...
```

사용법은 React.lazy와 비슷하고, Suspense를 사용하지 않습니다.

<br>

##### 3) 컴포넌트 미리 불러오기

**App.js**

``` JavaScript
...

function App() {
  const [visible, setVisible] = useState(false);
  const onClick = () => {
    setVisible(true);
  };
  const onMouseOver = () => {
    SplitMe.preload();
  };
  return (
    ...
    <p onClick={onClick} onMouseOver={onMouseOver}>
      Hello React!
    </p>
    {visible && <SplitMe />}
  );
}
...
```

이렇게 수정하면 마우스 커서를 Hello React! 위에 올리기만 해도 로딩이 시작됩니다. 그리고 클릭했을 때 렌더링됩니다.

<br>

<br>
<br>

출처
- 김민준, 리액트를 다루는 기술(개정판)
