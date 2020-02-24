---
title: "React에서 Infinite Scroll 구현하기"
date: "2020-02-23T14:00:00.169Z"
template: "post"
draft: false
slug: "/posts/react-infinite-scroll/"
category: "React"
tags:
- "Infinite_Scroll"
- "json"
description: "무한 스크롤링 구현하기"
---

## React에서 무한 스크롤링 구현하기

많은 데이터를 한 번에 렌더링하지 않고, 20개씩 렌더링되도록 무한 스크롤을 구현해보려고 합니다.

#### 1) json 파일 데이터 읽기

우선, http 통신이 아닌 json 파일 데이터를 읽어 구현하도록 하겠습니다.

``` JSON
[
  {
    "video_id": "eE4GPPnG1Mw",
    "title": "터미네이터:다크페이트 티저 예고편",
    "thumbnail": "https://i.ytimg.com/vi/eE4GPPnG1Mw/sddefault.jpg",
    "published_at": "2019-10-23"
  },
  {
    "video_id": "0_d0XHNMMUo",
    "title": "터미네이터:다크페이트 'We Are Back 영상",
    "thumbnail": "https://i.ytimg.com/vi/0_d0XHNMMUo/sddefault.jpg",
    "published_at": "2019-10-23"
  },
  ...
]
```

위처럼 배열로 여러 개의 객체를 가지고 있는 json 파일의 데이터를 사용할 것입니다.

먼저, 위의 데이터를 `list.json`로 생성합니다.
전 lib/data/list.json 경로에 생성해주었습니다.

``` JavaScript
import React from 'react';

import './Home.scss';
import Video from 'components/Video';
import video_list from 'lib/data/list_dummy.json';

const Home = () => {
  const [result, setResult] = useState(video_list.slice(0, 20));
};
```

Video 컴포넌트를 grid 레이아웃으로 구현하여 20개씩 렌더링 되도록 구현할 것입니다.

초기 상태 값을 json 파일에서 읽어온 데이터 중 20개만 저장합니다.

<br>

#### 2) 무한 스크롤 함수 구현하기

우선 코드를 이해하기 전에 참고가 될 그림을 먼저 보고 접근하는게 좋을 것입니다. 맨 아래 참고 사이트에 들어가셔서 그림을 참고하시고 오셔도 좋습니다.

제가 간단하고 쉽게 이해할 수 있던 그림을 첨부하겠습니다.

![scrollHeight.jpg](/media/scrollHeight.jpg)   

<br>

scrollTop과 clientHeight를 더한 값이 scrollHeight 값과 같을 때, 즉 스크롤이 화면 맨 끝에 도달했을 때, 다음 20개의 데이터를 렌더링하도록 할 것입니다.

``` JavaScript
const [itemIndex, setItemIndex] = useState(0);
const [result, setResult] = useState(video_list.slice(0, 20));

const _infiniteScroll = useCallback(() => {
  let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
  let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
  let clientHeight = document.documentElement.clientHeight;

  if(scrollTop + clientHeight === scrollHeight) {
    setItemIndex(itemIndex + 20);
    setResult(result.concat(video_list.slice(itemIndex+20, itemIndex+40)));
  }
}, [itemIndex, result]);

useEffect(() => {
  window.addEventListener('scroll', _infiniteScroll, true);
  return () => window.removeEventListener('scroll', _infiniteScroll, true);
}, [_infiniteScroll]);

return (
  <div className="home__container">
    <div className="section__container">
    {result.map(video => (
      <Video key={video.video_id} video={video} />
      ))}
    </div>
  </div>
);
```

useEffect로 scroll 이벤트가 발생할 때, \_infiniteScroll 함수가 수행되도록 했고, itemIndex를 통해 중복되지 않고, 다음 20개의 데이터를 가져올 수 있도록 하였습니다.

<br>

<br>

##### * 참고하세요 :) js, css 전체 코드 *

``` JavaScript
// home.js

import React, { useState, useEffect, useCallback } from 'react';

import './Home.scss';
import Video from 'components/Video';
import video_list from 'lib/data/list_dummy.json';

const Home = () => {
  const [itemIndex, setItemIndex] = useState(0);
  const [result, setResult] = useState(video_list.slice(0, 100));

  const _infiniteScroll = useCallback(() => {
    let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
    let clientHeight = document.documentElement.clientHeight;

    if(scrollTop + clientHeight === scrollHeight) {
      setItemIndex(itemIndex + 100);
      setResult(result.concat(video_list.slice(itemIndex+100, itemIndex+200)));
    }
  }, [itemIndex, result]);

  useEffect(() => {
    window.addEventListener('scroll', _infiniteScroll, true);
    return () => window.removeEventListener('scroll', _infiniteScroll, true);
  }, [_infiniteScroll]);

  return (
    <div className="home__container">
      <div className="section__container">
      {result.map(video => (
        <Video key={video.video_id} video={video} />
      ))}
      </div>
    </div>
  );
};

export default Home;
```

<br>

``` CSS
/* home.scss */

.home__container {
  position: relative;
  top: 65px;

  .section__container {
      margin: 25px 15px 25px 30px;
      display: grid;
      grid-template-columns: repeat(auto-fill, 320px);
      grid-gap: 25px;
  }
}
```

<br>
<br>

참고

- https://medium.com/@ghur2002/react%EC%97%90%EC%84%9C-infinite-scroll-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0-128d64ea24b5

- TMDB API
