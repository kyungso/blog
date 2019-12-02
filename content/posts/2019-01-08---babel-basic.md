---
title: "바벨 (babel)"
date: "2019-08-01T14:00:00.169Z"
template: "post"
draft: false
slug: "/posts/babel-basic/"
category: "React"
tags:
- "babel"
description: "바벨 실행 및 설정하기"
---

<br>

**Webpack 공식 문서 - [링크](https://webpack.js.org/concepts/)**

## 바벨(babel)

바벨은 입력과 출력이 모두 자바스크립트 코드인 컴파일러다. 이는 보통의 컴파일러가 고수준의 언어를 저수준의 언어로 변환하는 것과 비교된다.

초기의 바벨은 ES6 코드를 ES5 코드로 변환해 주는 컴파일러였다. 현재는 바벨을 이용해서 리액트의 JSX 문법, 타입스크립트와 같은 정적 타입 언어, 코드 압축, 제안(proposal) 단계에 있는 문법 등을 사용할 수 있다.

<br>

#### 바벨을 실행하는 여러 가지 방법

- @babel/cli 로 실행하기
- 웹팩에서 babel-loader로 실행하기
- @babel/core를 직접 실행하기
- @babel/register로 실행하기

<br>

## 바벨(Babel) 설치하기

웹팩 설치할 때와 비슷하게, 터미널을 열어 설치해줍니다.

1. babel 관련 라이브러리를 설치해줍니다.

```
npm i -D @babel/core @babel/cli @babel/preset-env @babel/preset-react babel-loader
```

- @babel/core : 기본적 babel core 기능

- @babel/preset-env : 여러분의 브라우저 버전에 맞게 자동으로 최신문법을 옛날문법으로 호환되게끔 적용시켜주는 기능

- @babel/preset-react : JSX 지원 기능

- babel-loader : babel과 webpack 연결해주는 기능

<br>

2. webpack.config.js 파일에 entry와 output 사이에 내용을 추가해줍니다.

```
module: {
  rules: [{
    test: /\.jsx?/,
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env','@babel/preset-react']
    },
  }],
},
```

entry와 output 사이에 작성하는 이유는 entry에 있는 파일을 읽고, 거기에 모듈을 적용한 후, output에 뺀다. 이런 흐름 구조상 보이게 하기 위함입니다.

<br>

3. npx webpack 실행해줍니다.

에러메시지가 뜹니다. 그 에러메세지를 해석해보면, Counter.jsx 파일의 state = { } 를 사용하기 위해선, @babel/plugin-proposal-class-properties 을 추가로 설치하라고 합니다.

- npm i - D @babel/plugin-proposal-class-properties

추가로 설치한 후, 위의 2번의 options에 plugins로 내용을 추가합니다.

- options: {
  presets: ['@babel/preset-env','@babel/preset-react'],
  plugins: ['@babel/plugin-proposal-class-properties'],
},

<br>

4. 마지막으로 "npx webpack"을 실행하게 되면 Error 없이 빌드 된 것을 확인할 수 있습니다.

<br>

**참고 - [ZeroCho님의 React 강좌](https://www.youtube.com/watch?v=V3QsSrldHqI&list=PLcqDmjxt30RtqbStQqk-eYMK8N-1SYIFn)**
