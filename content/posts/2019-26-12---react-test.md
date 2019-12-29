---
title: "Testing React Apps"
date: "2019-12-26T14:00:00.169Z"
template: "post"
draft: false
slug: "/posts/react-test/"
category: "React"
tags:
- "Jest"
description: ""
---

<br>

> **Testing React Apps**
> https://jestjs.io/docs/en/tutorial-react

<br>

## 리액트 애플리케이션 테스트

### Setup

#### Setup with Create React App

`$ yarn add --dev react-test-renderer`

<br>

#### Setup without Create React App

`$ yarn add --dev jest babel-jest @babel/preset-env @babel/preset-react react-test-renderer`


**package.json**

``` json
// package.json
  "dependencies": {
    "react": "<current-version>",
    "react-dom": "<current-version>"
  },
  "devDependencies": {
    "@babel/preset-env": "<current-version>",
    "@babel/preset-react": "<current-version>",
    "babel-jest": "<current-version>",
    "jest": "<current-version>",
    "react-test-renderer": "<current-version>"
  },
  "scripts": {
    "test": "jest"
  }
```

``` JavaScript
// babel.config.js
module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
};
```

<br>

#### Snapshot Testing

하이퍼링크를 렌더하는 링크 컴포넌트를 위한 snapshot 테스트를 생성해봅시다.

``` JavaScript
// Link.react.js
import React from 'react';

const STATUS = {
  HOVERED: 'hovered',
  NORMAL: 'normal',
};

export default class Link extends React.Component {
  constructor(props) {
    super(props);

    this._onMouseEnter = this._onMouseEnter.bind(this);
    this._onMouseLeave = this._onMouseLeave.bind(this);

    this.state = {
      class: STATUS.NORMAL,
    };
  }

  _onMouseEnter() {
    this.setState({class: STATUS.HOVERED});
  }

  _onMouseLeave() {
    this.setState({class: STATUS.NORMAL});
  }

  render() {
    return (
      <a
        className={this.state.class}
        href={this.props.page || '#'}
        onMouseEnter={this._onMouseEnter}
        onMouseLeave={this._onMouseLeave}
      >
        {this.props.children}
      </a>
    );
  }
}
```

<br>

이제 컴포넌트와 상호 작용하고 렌더링 된 결과물을 캡처하고 스냅샷 파일을 생성하기 위해 React 테스트 렌더러 및 Jest의 스냅 샷 기능을 사용합시다.

``` JavaScript
// Link.react.test.js
import React from 'react';
import Link from '../Link.react';
import renderer from 'react-test-renderer';

test('Link changes the class when hovered', () => {
  const component = renderer.create(
    <Link page="http://www.facebook.com">Facebook</Link>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  tree.props.onMouseEnter();
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  tree.props.onMouseLeave();
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
```

<br>

`yarn test` 또는 `jest` 명령어를 실행하면 아래와 같은 결과파일이 생길 것입니다.

``` JavaScript
// __tests__/__snapshots__/Link.react.test.js.snap
exports[`Link changes the class when hovered 1`] = `
<a
  className="normal"
  href="http://www.facebook.com"
  onMouseEnter={[Function]}
  onMouseLeave={[Function]}>
  Facebook
</a>
`;

exports[`Link changes the class when hovered 2`] = `
<a
  className="hovered"
  href="http://www.facebook.com"
  onMouseEnter={[Function]}
  onMouseLeave={[Function]}>
  Facebook
</a>
`;

exports[`Link changes the class when hovered 3`] = `
<a
  className="normal"
  href="http://www.facebook.com"
  onMouseEnter={[Function]}
  onMouseLeave={[Function]}>
  Facebook
</a>
`;
```

한 번 test 후, 또 test를 실행했을 땐, 렌더링 된 결과물은 이전 생성된 snapshot과 비교할 것입니다. 그 snapshot은 바뀐 코드에 따라 커밋되야합니다. snapshot test가 실패했을 때, 의도된 변화든 의도치 않은 변화든 검사해야합니다. 그 변화가 기대했던 것이라면, 존재하는 snapshot을 덮어쓰기 위해서 `jest -u`를 사용해 Jest를 일으킬 수 있습니다.

<br>

#### Sanpshot Testing with Mocks, Enzyme and React 16

> mock은 테스트하기 위해 가짜로 만드는 객체를 의미합니다.

Enzyme과 React 16+에서 사용할 때, snapshot 테스트 관련 주의사항이 있습니다. 다음과 같은 스타일로 모듈을 mock 한다면,

`jest.mock('../SomeDirectory/SomeComponent', () => 'SomeComponent');`

콘솔창에서 다음과 같은 경고를 볼 것입니다.

```
Warning: <SomeComponent /> is using uppercase HTML. Always use lowercase HTML tags in React.  

# Or:  
Warning: The tag <SomeComponent> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.
```

React 16은 요소 타입을 확인하기 위해 이러한 경고를 일으킨 것이고, mock 모듈은 그러한 확인작업이 실패합니다.

**1. 텍스트로 렌더링** - 이 방법은 snapshot의 mock 컴포넌트에 전달되는 props(속성)을 보지 못하지만, 간단합니다.

`jest.mock('./SomeComponent', () => () => 'SomeComponent');`

**2. 사용자 요소 렌더링** - DOM 사용자 요소는 어떠한 것도 확인되지 않고, 경고가 나타나서는 안됩니다. 소문자이고, 이름에 '-'(dash)를 가지고 있습니다.

`jest.mock('./Widget', () => () => <mock-widget />);`

**3. `react-test-renderer` 사용** - 테스트 렌더러는 요소 타입을 신경쓰지 않아서 `SomeComponent`를 받아들일 것입니다. 테스트 렌더러를 사용해서 snapshot을 확인할 수 있고, Enzyme를 사용해서 각각 컴포넌트 행동을 확인할 수 있습니다.

**4. 경고를 모두 비활성화** - jest 설정 파일에서 수행해야 합니다.

`jest.mock('fbjs/lib/warning', () => require('fbjs/lib/emptyFunction'));`

유용한 경고를 얻지 못할 수도 있으므로 일반적으로 선택안하는 것이 좋습니다. 그러나 몇몇 경우에, 예를 들면, 리액트 네이티브의 컴포넌트들을 테스트할 때 리액트 네이티브 태그를 DOM에 렌더링하고 많은 경고는 관련이 없습니다. 또다른 옵션은 console.warn로 교체하거나 특정 경고를 표시하지 않는 것입니다.

<br>

#### DOM Testing

렌더링 된 컴포넌트를 assert하고 조작한다면, react-testing-library, Enzyme, 리액트 TestUtils를 사용할 수 있습니다.

아래 두 개의 예제는 react-testing-library, Enzyme 사용한 예제입니다.

##### react-testing-library

 `$ yarn add --dev @testing-library/react`

 ``` JavaScript
 // CheckboxWithLabel.js

import React from 'react';

export default class CheckboxWithLabel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isChecked: false};

    // bind manually because React class components don't auto-bind
    // http://facebook.github.io/react/blog/2015/01/27/react-v0.13.0-beta-1.html#autobinding
    this.onChange = this.onChange.bind(this);
  }

  onChange() {
    this.setState({isChecked: !this.state.isChecked});
  }

  render() {
    return (
      <label>
        <input
          type="checkbox"
          checked={this.state.isChecked}
          onChange={this.onChange}
        />
        {this.state.isChecked ? this.props.labelOn : this.props.labelOff}
      </label>
    );
  }
}
 ```

``` JavaScript
// __tests__/CheckboxWithLabel-test.js
import React from 'react';
import {cleanup, fireEvent, render} from '@testing-library/react';
import CheckboxWithLabel from '../CheckboxWithLabel';

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

it('CheckboxWithLabel changes the text after click', () => {
  const {queryByLabelText, getByLabelText} = render(
    <CheckboxWithLabel labelOn="On" labelOff="Off" />,
  );

  expect(queryByLabelText(/off/i)).toBeTruthy();

  fireEvent.click(getByLabelText(/off/i));

  expect(queryByLabelText(/on/i)).toBeTruthy();
});
```

<br>

##### Enzyme

`$ yarn add --dev enzyme`

> 리액트 버전 15 이하인 경우라면 `react-addons-test-utils`를 추가로 설치해줘야 합니다.

``` JavaScript
// __tests__/CheckboxWithLabel-test.js

import React from 'react';
import {shallow} from 'enzyme';
import CheckboxWithLabel from '../CheckboxWithLabel';

test('CheckboxWithLabel changes the text after click', () => {
  // Render a checkbox with label in the document
  const checkbox = shallow(<CheckboxWithLabel labelOn="On" labelOff="Off" />);

  expect(checkbox.text()).toEqual('Off');

  checkbox.find('input').simulate('change');

  expect(checkbox.text()).toEqual('On');
});
```

<br>

##### Custom transformers

고급 기능이 필요하다면, 자신만의 transformer를 만들 수 있습니다.

아래의 예제를 실행하기 위해선, `@babel/core`, `babel-preset-jest` 패키지를 설치해야 합니다.

또한, Jest와 함께 실행되게끔 하기 위해선 Jest 설정에서 `"transform": {"\\.js$":"path/to/custom-transformer.js"}` 수정해주면 됩니다.


``` JavaScript
// custom-transformer.js
'use strict';

const {transform} = require('@babel/core');
const jestPreset = require('babel-preset-jest');

module.exports = {
  process(src, filename) {
    const result = transform(src, {
      filename,
      presets: [jestPreset],
    });

    return result ? result.code : src;
  },
};
```

babel을 지원하는 transformer를 빌드하려면 babel-jest를 사용하여 하나를 작성하고 사용자 정의 구성 옵션을 전달할 수도 있습니다.

``` JavaScript
const babelJest = require('babel-jest');

module.exports = babelJest.createTransformer({
  presets: ['my-custom-preset'],
});
```
