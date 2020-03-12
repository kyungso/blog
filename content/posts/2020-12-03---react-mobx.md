---
title: "React with MobX"
date: "2020-03-11T14:00:00.169Z"
template: "post"
draft: false
slug: "/posts/react-mobx/"
category: "React"
tags:
- "Mobx"
description: ""
---

## Mobx

❌ 버전
MobX의 브라우저 지원 문서에 따라 반드시 4.x 버전을 사용해야 한다.

5.x 이후부터는 ES6 Proxy를 사용하는데 이것은 polyfill이 불가능하기 때문이다.

✅ 결론
추적하고자 하는 객체를 만들기 위한 함수는 @observable 또는 observable 사용

@computed는 상태 값이 자동적으로 바뀔 수 있는 함수를 생성할 때 사용

autorun은 몇몇 observable 상태에 의존적인 함수를 자동적으로 실행할 때 사용

로깅, 네트워크 요청에 유용함
mobx-react의 @observer은 React 컴포넌트를 reactive하게 만든다.
자동적, 효율적으로 업데이트할 것이다.
mobx-react-lite
React 16.8과 Hooks를 지원하기 위해 함수형 컴포넌트에서만 사용할 수 있는 API만 제공한다.

React legacy Context API를 사용하는 Provider, inject API를 제공하지 않는다. 대신 React.createContext API를 사용해서 store를 가져오는 방법을 제안한다.

함수형 컴포넌트에서 inject를 대체할 useStore 함수

Hooks를 사용하는 함수형 컴포넌트를 위한 inject hoc는 별도로 제공하지 않으므로 store를 가져오기 위한 헬퍼 함수를 만들어야 한다.

``` JavaScript
import React from 'react';
import { MobXProviderContext } from 'mobx-react';

/**
 * React hooks를 사용하는 컴포넌트에서 store를 가져올 때 사용한다.
 * 참조) <https://mobx-react.js.org/recipes-migration#hooks-for-the-rescue>
 */
function useStores() {
  return React.useContext(MobXProviderContext);
}

export default useStores;
```
