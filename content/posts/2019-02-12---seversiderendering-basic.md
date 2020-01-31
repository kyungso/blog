---
title: "서버사이드 렌더링"
date: "2019-12-02T14:00:00.169Z"
template: "post"
draft: false
slug: "/posts/seversiderendering-basic/"
category: "React"
tags:
- "서버사이드렌더링"
description: "서버사이드 렌더링 프레임워크 - 넥스트(Next.js)"
---

<br>

## 서버사이드 렌더링 (server side rendering)

서버사이드 렌더링(server side rendering)이란 서버에서 리액트 코드를 실행해서 렌더링하는 것을 말한다.

**서버사이드 렌더링이 필요한 이유**

- 검색 엔진 최적화(search engine optimization, SEO)를 해야 한다.

- 빠른 첫 페이지 렌더링이 중요하다.

<br>

서버사이드 렌더링을 하면 사용자가 요청한 페이지를 빠르게 보여 줄 수 있다. 클라이언트 렌더링만 한다면 자바스크립트를 실행해야만 화면이 보이기 때문에 저사양 기기를 사용하는 사용자일수록 요청한 페이지가 느리게 보인다.

<br>

**바벨 설정하기**

|구분|바벨 프리|바벨 플러그인|
|------|---|---|
|클라이언트|@babel/preset-react, <br> @babel/preset-env|@babel/plugin-proposal-class-properties|
|서버|@babel/preset-react|@babel/plugin-proposal-class-properties, <br> @babel/plugin-transform-modules-commonjs|

<br>
<br>

## 서버사이드 렌더링 고급편

서버사이드 렌더링은 서버 자원을 많이 사용하는데, 특히 렌더링 연산에 CPU가 많이 사용된다. 한순간에 트래픽이 몰리면 모든 요청을 처리할 수 없다. 높은 트래픽에 대응하는 방법은 여러 가지인데, 프로젝트 상황에 맞게 적절한 방법을 사용해야 한다.

서버가 사용자의 요청에 가장 빠르게 응답하는 방법은 서버사이드 렌더링을 하지 않는 것이다. 평상시에는 서버사이드 렌더링을 하다가 서버 부하가 일정 수준을 넘어가면 서버사이드 렌더링을 포기하고 클라이언트 측에서만 렌더링하는 것도 한 가지 방법이다. 단, 검색 엔진 최적화가 중요한 사이트라면 검색 엔진의 요청은 이런 상황에서도 서버사이드 렌더링을 하는 게 좋다.

데이터 의존성이 낮은 페이지는 서버사이드 렌더링을 일부만 하는 방식으로 성능 문제를 해결할 수 있다. 데이터 의존성이 전혀 없는 페이지는 빌드 시 미리 렌더링해 놓을 수 있다. 사용자가 요청하면 단순히 정적 페이지를 서비스하면 되기 때문에 서버 자원을 절약할 수 있다.

데이터에 의존성이 있더라도 그 범위가 작다면 해당하는 영역만 클라이언트 측에서 렌더링하도록 설계하면 된다. 예를 들어, 한쪽 모서리에 사용자 이름을 보여 주는 부분만 데이터에 의존적이라면 그 부분만 클라이언트 측에서 렌더링하고 나머지 부분은 빌드 시 미리 렌더링해 놓을 수 있다.

<br>

**서버사이드 렌더링 캐싱하기**

데이터에 많이 의존적인 페이지는 정적 페이지를 미리 렌더링하는 방식을 사용할 수 없다. 그러나 데이터가 자주 변하지 않는 페이지라면 서버사이드 렌더링 결과를 캐싱해서 활용할 수 있따. 렌더링 결과를 1분만 캐싱해도 서버 부하를 크게 줄일 수 있따. 1분 동안 수십만 페이지뷰가 발생해도 단 한 번만 서버사이드 렌더링을 하면 된다.

제한된 메모리 안에 캐싱 데이터를 저장하려면 지울 데이터를 결정하는 알고리즘이 필요하다.

`npm install lru-cache`

lru-cache 패키지는 정해진 최대 캐시 개수를 초과하면 LRU(least recently used) 알고리즘에 따라 가장 오랫동안 사용되지 않은 캐시를 제거한다.

<br>

**<서버사이드 렌더링 함수 사용해 보기: renderToNodeStream>**

리액트는 서버사이드 렌더링을 위해 renderToString 함수 외에 renderToNodeStream 함수도 제공한다. renderToString 함수는 모든 렌더링 과정이 끝나야 문자열로 된 결괏값을 반환하지만, renderToNodeStream 함수는 호출 즉시 노드의 스트림(stream) 객체를 반환한다.

리액트의 renderToNodeStream 함수를 이용하면 렌더링 데이터를 빠르게 전달할 수 있다는 장점이 있다. 렌더링하려는 페이지가 아무리 복잡하더라도 첫 번째 청크가 준비되면 바로 전송을 시작하기 때문이다.

<br>
<br>

## 넥스트 (Next.js)

서버사이드 렌더링 기능을 직접 구현할 수도 있지만, 효율적으로 개발하기 위해서는 더욱 더 많은 기능이 필요한데 이 때 사용할 수 있는 프레임워크가 넥스트(Next.js)다.

넥스트와 create-react-app은 리액트를 기반으로 개발 환경을 구축한다는 점에서 비슷하지만, create-react-app은 클라이언트 렌더링만 하는 반면, 넥스트는 서버사이드 렌더링에 특화된 프레임워크라는 점이 다르다.

#### 1. 넥스트 시작하기

`npm install next react react-dom`

넥스트에서 모든 페이지 컴포넌트는 pages 폴더 밑에 만들어야 한다.

프로젝트 루트에 pages 폴더를 만들고, 그 밑에 page1.js 파일을 만들자.

**page1.js**

``` JavaScript
function Page1() {
  return (
    <div>
      <p>This is home page</p>
    </div>
  );
}
export default Page1;
```

파일 상단에 리액트 모듈을 가져오는 import 키워드가 보이지 않는다. 넥스트는 리액트 모듈을 자동으로 포함시켜 준다.

**개발 모드로 넥스트 실행**

`npx next`

빌드가 끝나고 브라우저에서 `http://localhost:3000/page1`로 접속해 보면 앞에서 만든 컴포넌트가 보인다. 개발자 모드로 확인해 보면 서버사이드 렌더링된 결과가 응답값으로 오는 것을 확인할 수 있다.

<br>

**넥스트의 번들 파일 분석하기**

넥스트는 프로젝트 루트의 .next 폴더 밑에 번들 파일을 생성한다. 개발 모드에서 생성된 폴더를 지우자.

`rm -rf .next`

프로덕션 모드로 빌드 후 실행해 보자.

`npx next build && npx next start`

브라우저에서 `http://localhost:3000/page1`로 접속하면 다음과 같은 자바스크립트 파일이 전달된다.

- page1.js : 우리가 작성한 페이지의 코드가 들어 있다.

- \_app.js : 모든 페이지의 최상단에서 실행되는 리액트 컴포넌트 코드가 들어 있다.

- commons.{해시값}.js : 여러 페이지에서 공통으로 사용되는 내부 모듈과 외부 모듈이 들어 있다.

- webpack-{해시값}.js : 웹팩 런타임 코드가 들어 있다.

- main-{해시값}.js : 웹팩 런타임 코드가 들어 있다.

.next/static 폴더 밑에 생성된 파일을 훑어보면,

.next/static
&nbsp;ㄴㅡ GtdPiV1KKRdR5ID37_Kh8
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ㄴㅡ pages
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ㄴㅡ \_app.js
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ㄴㅡ \_error.js
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ㄴㅡ page1.js
&nbsp;ㄴㅡ chunks
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ㄴㅡ commons.ba5f8136aee884888d8e.js
&nbsp;ㄴㅡ runtime
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ㄴㅡ main-46d992bf0dd382d22e62.js
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ㄴㅡ webpack-42652fa8b82c329c0559.js

다른 페이지의 번들 파일은 .next/static/{해시값}/pages 폴더 밑에 생성된다.

.next/server/static 폴더 밑에는 서버에서 사용되는 파일이 들어간다.

.next/server/static
&nbsp;ㄴㅡ GtdPiV1KKRdR5ID37_Kh8
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ㄴㅡ pages
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ㄴㅡ \_app.js
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ㄴㅡ \_document.js
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ㄴㅡ \_error.js
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ㄴㅡ page1.js

이 폴더의 번들 파일은 코드가 압축되어 있지 않다. 그리고 node_modules 폴더 밑에 있는 외부 모듈의 코드가 번들 파일에 포함되어 있지 않다. 이는 이 폴더의 번들 파일이 서버에서 실행되는 코드이기 때문이다.
\_document.js  파일은 서버 측에서 HTML 요소를 추가하는 용도로 사용된다.


<br>
<br>

출처
- 실전 리액트 프로그래밍 (프로그래밍인사이트-이재승)
