---
title: "리액트 웹팩(WebPack) 설치하기"
date: "2019-07-24T14:00:00.169Z"
template: "post"
draft: false
slug: "/posts/webpack-install/"
category: "React"
tags:
- "webpack"
description: "웹팩(WebPack) 설치 및 설정하기"
---

<br>

> 사전에 node가 설치되어야 합니다.
자신의 OS에 맞게 node를 설치해주세요.

<br>

**Webpack 공식 문서 - [링크](https://webpack.js.org/concepts/)**

<br>

## 웹팩 (Webpack) 설치하기

1. 터미널을 열고, 자신의 프로젝트 경로로 이동하여 "npm init" 입력합니다.

<br>

2. react와 react-dom을 설치합니다.

```
npm i react react-dom
```

<br>

3. webpack과 webpack-cli를 추가로 설치합니다.
( -D 는 개발용으로만 webpack을 사용할 것이라는 뜻입니다. 그래서 설치 후에, package.json 파일에서 "devDependencies": 에 추가됩니다. )

```
npm i -D webpack webpack-cli
```

<br>

4. index.html 파일에서 webpack으로 출력할 파일을 추가해줍니다.

``` HTML
...
<script src="./dist/app.js"></script>
...
```

<br>

5. Counter.jsx 파일 생성

``` JavaScript
const React = require('react');
const { Component } = React;

class Counter extends Component {
    state = {

    };

    render() {

    }
}

module.exports = Counter;
```

- React를 사용하기 위해서 2번에서 설치한 라이브러리를 위와 같이 선언해서 작성해줘야합니다.

- 하단에 export 해야 다른 파일에서 Counter.jsx 파일을 사용할 수 있습니다.

<br>

6. client.jsx 파일 생성

``` JavaScript
const React = require('react');
const ReactDom = require('react-dom');

const Counter = require('./Counter');

ReactDom.render(<Counter />, document.querySelector("#root"));
```

- 5번의 Counter 파일을 위와 같이 불러와, 렌더링 해줄 수 있습니다.

<br>

7. webpack.config.js 파일 생성

``` JavaScript
const path = require('path');
//실서비스: process.env.NODE_ENV = 'production';

module.exports = {
  name: 'counter-settings',
  mode: 'development', //실서비스: production
  devtool: 'eval',  //실서비스: hidden-source-map
  resolve: {
    extensions: ['.js','.jsx']
  }

  entry: { //입력
    app: ['./client']
  },
  output: { //출력
    path: path.join(__dirname, 'dist'),
    filename: 'app.js'
  },
}
```

- resolve는 확장자를 적어놓게 되면, 파일이름 뒤의 확장자를 webpack이 자동으로 찾아서 실행한다.

- path는 자신의 프로젝트 경로의 폴더에서 원하는 파일로 설정할 수 있다.

<br>

8. 터미널에서 "webpack" 명령어를 실행하면, command not found가 뜰 것입니다. 그것을 해결하는 방법에는 여러 가지가 있지만, 2가지 방법을 알아보겠습니다.

- package.json 파일에서 "scripts": { "dev": webpack } 으로 작성하여, 터미널에서 "npm run dev" 실행

<br>

- "npx webpack" 으로 실행

<br>

#### Error!!!! 가 나타납니다.
#### - Error가 난 이유는 client.jsx 파일의 <Counter /> 태그인 JSX 때문입니다. 이것을 사용하기 위해서 바벨(babel) 설치가 필요합니다. 다음으로 가봅시다.

<br>

<br>

## 웹팩 (Webpack) 설정하기

##### [webpack.config.js] 파일

``` JavaScript
const path = require('path');

module.exports = {
  name: 'counter-settings',
  mode: 'development', //실서비스: production
  devtool: 'eval',  //실서비스: hidden-source-map
  resolve: {
    extensions: ['.js','.jsx']
  },

  entry: { //입력
    app: ['./client']
  },
  module: {
        rules: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            options: {
                presets: [
                    ['@babel/preset-env', {
                        targets: {
                            browsers: ['> 5% in KR'],
                        },
                        debug: true,
                    }],
                    '@babel/preset-react',
                ],
                plugins: [],
            },
      }],
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({ debug: true });
  ],
  output: { //출력
    path: path.join(__dirname, 'dist'),
    filename: 'app.js'
  },
}
```

[Webpack 공식 문서](https://webpack.js.org/concepts/)에서도 위의 파일과 같이 **Mode, Entry, Output, Loaders(Module), Plugins** 를 기본적인 개념으로 강조합니다.

Entry : 시작하는 파일들을 넣고,
Output : 결과가 어떻게 나올지 설정하고,
Loaders(Module) : 규칙들을 적용하며,
Plugins : 추가적으로 하고 싶은 작업을 설정하고,
Mode : development, production 중 선택

<br>

### @babel/preset-env와 plugins

웹팩 설치할 때 말했듯이, @babel/preset-env는 여러분의 브라우저 버전에 맞게 최신 문법을 옛날 문법으로 바꿔 적용시켜주는 역할을 합니다.

preset 이라는 것은 plugin들의 집합을 의미하며, 'preset-env' 이 안에도 수많은 plugin들을 내포하고 있습니다.

적용하고자 하는 plugin을 명시적으로 설정해주는 것이, babel 연산 속도가 느려지지 않도록 하는 것이 좋습니다.

위의 설정에선, browsers를 '한국에서 5% 이상의 점유율을 가지고 있는 브라우저를 지원하라' 로 설정하였습니다.

브라우저 버전이나 설정에 대한 것은 [Browserslist 사이트](https://github.com/browserslist/browserslist#queries) 를 참고하시면 됩니다.

<br>

### 자동으로 빌드해주는 방법

##### [ webpack-dev-server와 hot-loader ]

변경사항이 있을 때마다, "npm run dev" 또는 "npx webpack"로 빌드하기 귀찮기 때문에, 자동으로 빌드해주는 방법을 알아봅시다.

<br>

1. 터미널을 열고, **react-hot-loader** 를 설치해줍니다.

```
npm i -D react-hot-loader
```

**react-hot-loader** 는 코드가 변경되었을 때 페이지를 새로고침하지 않고 바뀐부분만 빠르게 교체해주는 라이브러리입니다.

<br>
<br>

2. 추가로 **webpack-dev-server** 를 설치해줍니다.

```
npm i -D webpack-dev-server
```

**webpack-dev-server** 는 로컬에서 사용할 개발용 서버를 제공합니다.
이 기능을 사용하여 소스 파일을 감시하고 내용이 변경될 마다 번들을 다시 컴파일 합니다. 수시로 새로고침을 하지 않아 편리합니다.

<br>
<br>


3. package.json 설정

```
...
"scripts": {
    "dev": "webpack-dev-server --hot"
  },
...
```

<br>
<br>

4. client.jsx 설정

기존에 렌더링 했던 \<WordRelay \/\> 대신 Hot를 만들어 \<Hot \/\> 으로 변경해줍니다.

``` JavaScript
const { hot } = require('react-hot-loader/root');
const Hot = hot(WordRelay);

ReactDom.render(<Hot />, document.querySelector("#root"));
```

<details markdown="1">
<summary> (client.jsx 전체 코드) </summary>

```JavaScript
const React = require('react');
const ReactDom = require('react-dom');
const { hot } = require('react-hot-loader/root');

const WordRelay = require('./WordRelay');

const Hot = hot(WordRelay);

ReactDom.render(<Hot />, document.querySelector("#root"));
```

</details>

<br>
<br>


5. webpack.config.js 설정

babel-loader options의 plugins 안에 'react-hot-loader/babel'을 추가해줍니다.

<details markdown="1">
<summary> (webpack.config.js 전체 코드) </summary>

``` JavaScript
const path = require("path");

module.exports = {
  name: "wordrelay-settings",
  mode: "development", //실서비스: production
  devtool: "eval", //실서비스: hidden-source-map
  resolve: {
    extensions: [".js", ".jsx"]
  },

  //입력
  entry: {
    app: ["./client"]
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                targets: {
                  browsers: ["> 1% in KR"]
                },
                debug: true
              }
            ],
            "@babel/preset-react"
          ],
          plugins: [
            "@babel/plugin-proposal-class-properties",
          "react-hot-loader/babel"]
        }
      }
    ]
  },

  plugins: [],

  //출력
  output: {
    path: path.join(__dirname, "dist"),
    filename: "app.js"
  }
};

```

</details>

<br>
<br>

6. webpack output 파일 설정

webpack-dev-server를 사용할 땐 폴더를 사용하지 않고, ./app.js로 설정해줍니다.

그 이유는 webpack-dev-server 자체적으로 따로 처리하기 때문에 그런 것 같습니다.

아래와 같이 index.html 파일을 변경해줍니다.

``` HTML
...
<script src="./app.js"></script>
...
```

<details markdown="1">
<summary> (index.html 전체 코드) </summary>

``` HTML
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf8" />
  <title>끝말잇기</title>
</head>
<body>
  <div id="root"></div>

  <script src="./app.js"></script>
</body>
</html>
```

</details>

<br>
<br>

#### \+ 추가로 output path를 설정하는 방법

- webpack.config.js 파일에서 publicPath를 추가해줍니다.

``` JavaScript
...
output: {
    path: path.join(__dirname, "dist"),
    filename: "app.js"
    publicPath: '/dist/'
  }
...
```

- index.html 파일에서 script의 경로를 변경해줍니다.

``` HTML
<script src="./dist/app.js"></script>
```

<br>
<br>

7. 터미널에 npm run dev 실행 후, localhost:8080 접속 확인!
이로써, 수정사항 있을 때, 알아서 자동으로 반영이 되어 나타납니다.

----------------------------------------------------

##### ※ webpack.config.js 설정 변경시, 꼭 재실행 (npm run dev) !!!

webpack-dev-server가 탐지하는 것은 client.jsx나 client.jsx 에서 불러오는 것들만 자동으로 업데이트 반영해주는 것이다.

webpack.config.js의 변경점은 스스로 눈치 채지 못하므로 변경시에 꼭 재실행 해줘야 합니다.

<br>

<br>

**참고 - [ZeroCho님의 React 강좌](https://www.youtube.com/watch?v=V3QsSrldHqI&list=PLcqDmjxt30RtqbStQqk-eYMK8N-1SYIFn)**
