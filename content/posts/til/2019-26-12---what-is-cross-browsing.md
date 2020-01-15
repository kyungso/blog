---
title: "크로스 브라우징에 대한 이해"
date: "2019-12-26T14:00:00.169Z"
template: "post"
draft: false
slug: "/posts/til/what-is-cross-browsing/"
category: "TIL"
tags:
- "크로스 브라우징"
description: ""
---

<br>

## 크로스 브라우징 (cross browsing)

> 웹 페이지의 상호 호환성(Cross Browsing) 구축에 대해 이야기하면 기본적인 오해가 있다. 그것은 바로 이것이 모든 웹 브라우저에서 100% 똑같이 보이도록 만드는 것이라는 생각이다. 작게는 1990년대 후반 Netscape사와 Microsoft사의 Browser War 기간 동안 일어난 브라우저의 비호환성을 억지로 끼워 맞추려는 기법 정도로 치부되는 것이다.

**Cross Browsing** 이란 적어도 표준 웹기술을 채용하여 다른 기종 혹은 플랫폼에 따라 달리 구현되는 기술을 비슷하게 만듦과 동시에 어느 한쪽에 최적화되어 치우치지 않도록 공통 요소를 사용하여 웹 페이지를 제작하는 기법을 말하는 것이다. 또한, 지원할 수 없는 다른 웹 브라우저를 위한 장치를 구현하여 모든 웹 브라우저 사용자가 방문했을 때 정보로서의 소외감을 느끼지 않도록 하는 방법론적 가이드를 의미하는 것이다.

각 브라우저마다 작동되지 않는 Javascript, html5 코드가 존재하고, 해석하지 못하는 css 코드가 존재합니다. 그래서 크로스 브라우징을 고려하기 위한 방법을 알아보려 합니다.

<br>

### 1. [Can I Use](https://caniuse.com/) 사용

[Can I Use](https://caniuse.com/) 사이트 검색창에 내가 사용하고 싶은 css나 javascript를 검색하면 어떤 브라우저에서 작동되는지, 작동되지 않는지를 알려줍니다.

> [HTML5 Markup Validation Service](http://validator.w3.org/)
> [CSS-Validator](http://jigsaw.w3.org/css-validator/validator.html.en)

<br>

### 2. 버그리포트 참고

Github에는 여러가지 버그 관련 정보가 공유됩니다.
요즘 flexbox를 많이 사용해서 stackoverflow에도 flexbox 관련 질문이 많이 올라오는데, [flexbox 버그 리스트](https://github.com/philipwalton/flexbugs) 입니다.

코딩을 하기전, 어떤 버그들이 존재하는지 정확히 인식하고 있다면 쓸데 없는 시간낭비를 하지 않아도 됩니다.

<br>

### 3. 코딩은 보수적으로

 가장 최신의 css, javascript를 쓴다고 무조건 좋은 것이 아닙니다. 새로운, 검증되지 않은 코딩을 했다가 문제가 생기면 더 많은 시간과 노력이 들게됩니다.

 그렇기 때문에 새로운 코딩기법을 익히고 기존 검증된 코딩 기법을 유용하게 활용하는게 좋다고 생각합니다.

<br>

### 4. 브라우저 트랜드 주시

사용하고 있는 브라우저가 현재 어떤 위치에 있고, 어떤 추세이고, 어떤 흐름인지 인식하고 있는 것은 매우 중요합니다.

파이어폭스를 개발용 브라우저에 가장 많은 css3와 html5 기능들이 탑재되어 있는 줄 아시는 분들이 적지 않습니다.

또한, 사파리를 개발용 브라우저가 얼마나 뒤쳐진 브라우저인지 인식하지 못하는 분들도 꽤 있습니다.

현재 각 브라우저들의 기능 평가도를 보면 크롬과 오페라가 가장 높은 점수를 보여줍니다.

<br>

### 5. 브라우저 대응순서

가장 점유율이 높은 브라우저부터 확인하는 것이 좋습니다.

점유율 확인 사이트 - [https://gs.statcounter.com/](https://gs.statcounter.com/)



<br>
<br>

- 참고

  - https://mulder21c.github.io/2019/01/30/what-is-cross-browsing/

  - https://hackya.com/kr/%ED%81%AC%EB%A1%9C%EC%8A%A4-%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A7%95-%EC%B4%9D%EC%A0%95%EB%A6%AC/

  - https://asfirstalways.tistory.com/237
