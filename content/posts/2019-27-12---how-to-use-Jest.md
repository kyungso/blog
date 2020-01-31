---
title: "(React) Jest 튜토리얼"
date: "2019-12-27T14:00:00.169Z"
template: "post"
draft: false
slug: "/posts/how-to-use-Jest/"
category: "React"
tags:
- "Jest"
description: ""
---

<br>

#### 자바스크립트 테스팅 도구

- Karma

- Jasmine

- jest

- Chai

- Mocha

> 각 도구들의 차이점 : [링크](https://medium.com/welldone-software/an-overview-of-javascript-testing-in-2019-264e19514d0a)

<br>

## Jest

Jest는 페이스북 팀에서 Jasmine 기반으로 만든 테스팅 프레임워크입니다. CRA로 만든 프로젝트에는 자동으로 적용되어 있습니다.

`$ yarn add jest`

> VSCode 사용한다면, `@types/jest` 설치하면 자동 기본 코드(인텔리센스) 지원
> `$ yarn add @types/jest`

<br>

#### 첫 번째 테스트 작성하기

**sum.js**

``` JavaScript
function sum(a, b) {
  return a + b;
}

module.exports = sum;
```

<br>

**sum.test.js**

``` JavaScript
const sum = require('./sum');

test('1 + 2 = 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

`test` 함수는 새로운 테스트 케이스를 만드는 함수입니다.

`expect` 함수는 '특정 값이 ~일 것이다' 라고 사전에 정의를 하고, 통과를 하면 테스트를 성공시키고 통과를 하지 않으면 테스트를 실패시킵니다.

`toBe` 함수는 matchers라고 부르는 함수입니다. 특정 값이 어떤 조건을 만족하는지, 또는 어떤 함수가 실행이 됐는지, 에러가 났는지 등을 확인할 수 있게 해줍니다. 위의 테스트 코드에서 toBe는 특정 값이 우리가 정한 값과 일치하는지 확인을 해줍니다.

<br>

**package.json**

``` json
{
  "name": "javascript",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "dependencies": {
    "@types/jest": "^24.0.13",
    "jest": "^24.8.0"
  },
  "scripts": {
    "test": "jest --watchAll --verbose"
  }
}
```

<br>

터미널에서 test 스크립트 실행

`$ yarn test`

<br>

#### it 함수

새로운 테스트 케이스를 만들 때 사용하던 `test` 키워드 대신 `it` 키워드를 사용할 수 있습니다. 작동방식은 완전히 동일합니다.

**sum.test.js**

``` JavaScript
const sum = require('./sum');

it('calculates 1 + 2', () => {
  expect(sum(1, 2)).toBe(3);
});
```

<br>

#### 여러 테스트 케이스 묶기 (describe)

여러 테스트 케이스 묶을 때 `describe` 키워드를 사용합니다.

**sum.js**

``` JavaScript
function sum(a, b) {
  return a + b;
}

function sumOf(numbers) {
  let result = 0;
  numbers.forEach(n => {
    result += n;
  });
  return result;
}

// 각각 내보내기
exports.sum = sum;
exports.sumOf = sumOf;
```

<br>

**sum.test.js**

``` JavaScript
const { sum, sumOf } = require('./sum');

describe('sum', () => {
  it('calculates 1 + 2', () => {
    expect(sum(1, 2)).toBe(3);
  });

  it('calculates all numbers', () => {
    const array = [1, 2, 3, 4, 5];
    expect(sumOf(array)).toBe(15);
  });
});
```

<br>


<br>
<br>

- 참고
  - https://velog.io/@velopert/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%ED%85%8C%EC%8A%A4%ED%8C%85%EC%9D%98-%EA%B8%B0%EC%B4%88
