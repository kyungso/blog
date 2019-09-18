---
title: 미디어쿼리 (media query)
date: "2019-06-11T14:00:00.169Z"
template: "post"
draft: false
slug: "/posts/media-query/"
category: "HTML/CSS"
tags:
- "Web"
- "CSS"
- "media-query"
description: "반응형 웹 사이트 제작에 반드시 필요한 기술인 미디어 쿼리"
---

<br>

## 미디어 쿼리

미디어쿼리(Media Queries)는 각 미디어 매체에 따라 다른 스타일(css style)을 적용할 수 있게 만드는 것입니다.
미디어 매체는 모니터와 같은 스크린 매체, 프린트, 스크린 리더기와 같은 것들을 이야기 합니다.
미디어쿼리는 동일한 웹 페이지를 다양한 환경의 사용자들에게 최적화된 경험을 제공할 수 있게 해줍니다.

미디어쿼리는 CSS2의 미디어 타입(Media Types)을 확장해서 만들어졌습니다.
미디어타입을 이론적으로는 훌륭했지만, 결과적으로 제대로 활용되지 못했습니다. 이유는 당시에는 미디어 타입을 제대로 지원하는 기기가 없었기 때문입니다.

미디어 쿼리가 등장하기 이전에는 제대로 된 반응형 웹 사이트를 제작할 수는 없었습니다. 하지만 당시에는 사용자들의 환경이 아주 제한적이었기 때문에 제작자 입장에서는 대중적인 미디어 범위에서만 잘 보이도록 사이트를 제작하면 반응형이 아니더라고 충분했습니다.

하지만 웹이 급격이 발전하면서 대응해야 하는 미디어의 폭이 상당히 늘었습니다. 이런 필요성에 따라 W3C는 CSS2의 미디어 타입을 확장하여, CSS3 미디어쿼리를 발표합니다. 이 미디어쿼리로 인해 웹 사이트를 제작함에 있어 이전의 정적인 고정 레이아웃 웹 사이트에서 동적으로 반응하는 반응형 웹 사이트로 패러다임이 새롭게 변화하였습니다.

<br>

#### 미디어 타입 & 미디어 특성

##### \@media (at media)

``` CSS
@media mediaqueries{/*style rules*/}
```

mediaqueries가 참이냐 거짓이냐 판단해서 중괄호 안의 스타일 규칙을 적용합니다.

<br>

##### 미디어 타입

all, print, screen

##### 미디어 특성

width(뷰포트의 너비, 브라우저 창의 너비), orientation(가로/세로모드)

#### Syntax

```
media_query_list
 : S* [media_query [ ',' S* media_query ]* ]?
 ;
media_query
 : [ONLY | NOT]? S* media_type S* [ AND S* expression ]*
 | expression [ AND S* expression ]*
 ;
expression
 : '(' S* media_feature S* [ ':' S* expr ]? ')' S*
 ;
```

- [a] : a가 나올 수도 있고, 나오지 않을 수도 있습니다.
- a|b : a 또는 b 둘 중에 하나를 선택합니다.
- a? : a가 0번 나오거나 1번만 나올 수 있음
- a* : a가 0번 나오거나 그 이상 계속 나올 수 있음
- media_type : all, screen, print 등 명세에 정의된 미디어 타입
- media_feature : width, orientation 등 명세에 정의된 미디어 특성

##### media_query_list

: 여러 개의 미디어 쿼리로 이루어진 리스트로 작성 가능하며, 쉼표를 이용해서 구분합니다.

##### media_query
: A 형태 - 미디어 타입에 and 키워드를 이용해서 미디어 표현식을 붙일 수 있습니다.
미디어 타잎 앞에는 only 또는 not 키워드가 올 수 있습니다.
미디어 표현식은 생략 가능하기 때문에 미디어 타입 단독으로 사용될 수 있습니다.

: B 형태 - 미디어 타입 없이 미디어 표현식이 바로 나올 수 있습니다.(미디어 타입이 명시되지 않으면 all로 간주합니다.)
미디어 표현식은 and 키워드를 이용해서 계속해서 나올 수 있습니다.

##### expression

: 미디어 표현식은 괄호로 감싸야 하며, 특성 이름과 해당하는 값으로 이루어집니다. 이름과 값은 :기호로 연결하고, 값이 없이 특성 이름만으로도 작성할 수 있다.

##### min-/max- 접두사

미디어 특성은 이름 앞에 min- 또는 max- 접두사(prefix)를 붙일 수 있습니다.

[Media queries syntax](https://www.w3.org/TR/css3-mediaqueries/#syntax)

\> **자료 링크** <

- [Media Queries](https://www.w3.org/TR/css3-mediaqueries/#media1)

- [Media Queries Level4](https://www.w3.org/TR/mediaqueries-4/#media-types)

<br>

**출처 : 부스트코스**
