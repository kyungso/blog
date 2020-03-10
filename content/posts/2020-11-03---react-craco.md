---
title: "React에서 절대 경로 설정 (craco)"
date: "2020-03-11T14:00:00.169Z"
template: "post"
draft: false
slug: "/posts/react-craco/"
category: "React"
tags:
- "craco"
description: "React 프로젝트에서 craco로 절대 경로 설정"
---

## React에서 절대 경로 설정

### craco

(Create React App Configuration Override)

리액트 프로젝트에서 절대 경로를 사용하려면 tsconfig.json과 webpack의 설정을 건드려야 한다.
단순하게 tsconfig.json의 paths 설정을 바꾸면 된다 생각했지만 React 실행시 강제적으로 paths 설정을 지워 버린다.

CRA는 내부적으로 webpack을 사용하지만, 숨겨져 있기 때문에 eject 하지 않는 이상 수정할 수 없다.

eject를 하면 해결 가능하나, 한 번 eject를 하면 React의 버전업에 대한 자동으로 다른 구성요소 및 설정이 변경되는 장점을 잃어버리게 된다.

이를 해결하기 위해 나온 모듈이 react-app-rewired, craco가 있다. 그 중에 craco 사용법을 알아보자.

#### 1. 설치

`$ yarn add @craco/craco`

#### 2. package.json 파일을 수정한다.

``` JSON
"scripts": {  
	"start": "craco start",  
	"build": "craco build",  
	"test": "craco test",  
	"eject": "craco eject"  
}  
```

#### 3. tsconfig.paths.json

``` JSON
{
	"extends": "./tsconfig.paths.json",
}
```

#### 4. craco.config.js

``` JavaScript
const path = require(‘path’);

module.exports = function() {
	return {
		webpack {
			alias: {
			 ‘@‘: path.resolve(__dirname, ’src/‘),
			},
		},
	};
};
```

#### 5. 컴포넌트에서 아래와 같이 사용가능

``` JavaScript
import { LoginView, HomeView } from '@/components';
```
