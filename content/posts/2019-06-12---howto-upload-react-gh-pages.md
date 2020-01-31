---
title: "React 프로젝트 github pages에 배포하기"
date: "2019-12-06T14:00:00.169Z"
template: "post"
draft: false
slug: "/posts/howto-deploy-react-gh-pages/"
category: "React"
tags:
- "gh-pages"
description: "리액트 앱을 gh-pages에 배포하기"
---

<br>

## React 프로젝트 github pages에 배포하기

create react-app으로 만든 리액트 프로젝트를 github pages로 배포하는 방법을 알아봅시다!!!

<br>

> 각자 배포하고 싶은 리액트 프로젝트를 생성했다는 가정하에 진행합니다.
>
> 혹시 생성하지 않았다면,  
> **리액트 프로젝트 생성**  
> `$ yarn create react-app ghPages-tutorial`  
> `$ cd ghPages-tutorial`  
> 기본 페이지로 배포해보도록 하겠습니다.  

<br>

### 1. 로컬 저장소에 commit 하기

create react app 으로 리액트 프로젝트를 생성하면, 기본으로 git 저장소가 생성됩니다.

> 혹시 git 저장소가 없으시다면, `git init` 명령어를 실행해주면 됩니다.

지금까지 프로젝트의 파일 및 폴더의 추가/변경 사항을 로컬 저장소에 기록하기 위해 아래의 명령어를 실행해줍니다. 쌍따옴표 안의 내용은 원하는 내용을 작성하면 됩니다.

`$ git add .`

`$ git commit -m "finish project"`

<br>

### 2. 원격 저장소 생성

<br>

![create_remote_storage.jpg](/media/create_remote_storage.jpg)   

자신의 github 페이지에서 새로운 저장소를 생성합니다.

<br>

### 3. 원격 저장소와 로컬 저장소 연결

위에 2번에서 원격 저장소를 생성하고 나면 나타나는 페이지 주소를 입력해주면 됩니다.

`$ git remote add origin https://github.com/kingso/ghPages-tutorial.git`

연결해주고, 로컬 저장소에 저장한 내용을 원격 저장소에도 저장하기 위해 아래 명령어를 실행합니다.

`$ git push -u origin master`

<br>

### 4. "homepage" 추가

> 자세한 내용을 알고 싶으시다면 아래 링크를 참고하세요.   
> [facebook github 문서](https://github.com/facebook/create-react-app/blob/master/docusaurus/docs/deployment.md#building-for-relative-paths)

package.json 파일에 베포할 "homepage" 주소를 추가해줍니다.

``` json
...
"eslintConfig": {
    "extends": "react-app"
  },
  "homepage": "https://kingso.github.io/ghPages-tutorial",
  "browserslist": {
  },
...
```

<br>

### 5. 빌드(build) & 배포(deploy)

##### 빌드

`$ npm run build`

`$ npm install --save-dev gh-pages`

빌드 후, gh-pages 설치해줍니다.

<br>

##### 배포

배포를 하기 위해 package.json의 "scripts" 부분에 `"deploy": "npm run build && gh-pages -d build"`를 추가해줍니다.

``` json
...
"scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "deploy": "npm run build && gh-pages -d build"
},
...
```

다시 터미널에서,

`$ npm run deploy`  

완료되고, 터미널에도 떠있는 homepage로 설정해놨던 `https://kingso.github.io/ghPages-tutorial` 주소로 들어가면 프로젝트가 배포됬을 것이다!!

끝!!!

<br>
<br>
