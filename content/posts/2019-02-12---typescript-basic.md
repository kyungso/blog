---
title: "정적 타입 그리고 타입스크립트"
date: "2019-12-02T14:00:00.169Z"
template: "post"
draft: false
slug: "/posts/typescript-basic/"
category: "React"
tags:
- "타입스크립트"
description: ""
---

<br>

- [타입스크립트 (typescript)](#타입스크립트-(typescript))
- [타입스크립트의 여러 가지 타입](#타입스크립트의-여러-가지-타입)
- [인터페이스](#인터페이스)
- [타입 호환성](#타입-호환성)
- [타입스크립트 고급 기능](#타입스크립트-고급-기능)
- [생산성을 높이는 타입스크립트의 기능](#생산성을-높이는-타입스크립트의-기능)
<br>

> 자바스크립트는 동적 타입 언어이다.
> 따라서 변수의 타입은 런타임에 결정된다.
> 동적 타입 언어에는 파이썬(Python), PHP 등이 있다.

> 이와 반대로 정적 타입 언어는 변수의 타입이 컴파일 타임에 결정된다.
> 정적 타입 언어에는 자바(Java), C++ 등이 있다.

<br>

## 타입스크립트 (typescript)

타입스크립트는 자바스크립트의 모든 기능을 포함하면서 정적 타입을 지원하는 언어이다.

자바스크립트에 정적 타입을 추가해 주는 언어와 도구는 Elm, ReasonML, PureScript, Flow 등 다양하다.

<br>

#### 동적 타입 언어 vs 정적 타입 언어

|동적 타입 언어|정적 타입 언어|
|------|---|
|- 타입에 대한 고민을 하지 않아도 되므로 배우기 쉽다. <br> - 코드의 양이 적을 때 생산성이 높다. <br> - 타입 오류가 런타임 시 발견된다.|- 변수를 선언할 때마다 타입을 고민해야 하므로 진입 장벽이 높다. <br> - 코드의 양이 많을 때 동적 타입 언어에 비해 생산성이 높다. <br> - 타입 오류가 컴파일 시 발견된다. |

동적 타입 언어와 정적 타입 언어는 장단점이 서로 달라 팀과 프로젝트의 성격에 따라 선택해야 한다.

작은 규모의 프로젝트에서는 동적 타입 언어를 사용하고, 큰 규모의 프로젝트에서는 정적 타입 언어를 사용하기를 추천한다.

<br>

**정적 타입 언어가 생산성이 높은 이유**

&nbsp;&nbsp;정적 타입 언어의 코드는 타입으로 서로 연결되어 있다. 그래서 연관된 코드 간의 이동이 쉽고, 변수명이나 함수명을 변경하는 등의 리팩토링도 쉽다. 임포트(import)하지 않고 코드를 작성해도 단축키 한 번이면 IDE가 필요한 임포트 코드를 자동으로 넣어 준다. 함수를 호출하기 위해 함수 이름과 괄호를 입력하면 함수의 매개변수 종류와 반환값의 타입을 확인할 수 있다. 속성값의 종류가 많은 객체라 하더라도 객체 이름과 점을 입력하면 속성값 목록을 확인할 수 있다. 철자가 틀리거나 숫자 타입의 변수에 문자열을 입력하면 IDE가 즉시 알려 준다.
&nbsp;&nbsp;좋은 IDE를 사용한다면 동적 타입 언어를 사용해도 이와 같은 기능이 어느 정도는 지원된다. 하지만 IDE가 알 수 있는 정보는 제한적이기 때문에 정적 타입 언어보다 기능이 부족할 수밖에 없다.

<br>
<br>

#### 타입 스크립트의 장점

타입스크립트는 마이크로소프트에서 개발하고 있고 꾸준하게 업데이트 버전이 나오고 있다. 자바스크립트의 새로운 표준이 나오거나 거의 표준이 확실시되는 기능은 타입스크립트에도 빠르게 추가된다. 타입스크립트 측에서 리액트 개발자들의 의견을 잘 반영해 주기 때문에 JSX 문법과 리액트 컴포넌트의 타입을 정의하는 데 큰 어려움이 없다.

타입스크립트는 다른 경쟁 언어에 비해 큰 생태계를 갖고 있다. 웬만큼 유명한 라이브러리는 거의 타입스크립트의 타입 정의 파일이 항상 존재한다. 타입 정의 파일은 라이브러리 자체에서 갖고 있거나, DefinitelyTyped라는 [깃허브 저장소](https://microsoft.github.io/TypeSearch)에 포함되어 있다.

타입스크립트는 역시 마이크로소프트에서 개발하고 있는 IDE인 vscode와 궁합이 잘 맞는다. vscode는 특별한 설정 없이도 타입스크립트 파일의 타입 검사를 자동으로 실행한다. 또한 타입스크립트를 이용해서 자바스크립트 파일도 타입 검사를 하기 때문에 레거시(legacy) 프로젝트에서 유용하다. vscode는 타입스크립트 코드를 위한 다양한 리팩토링 기능을 지원하기 때문에 생산성에 큰 도움이 된다.

<br>
<br>

#### 실습

실습 코드는 타입스크립트 홈페이지의 http://www.typescriptlang.org/play 에서 입력한다. 타입스크립트의 strict 모드를 켠 상태로 가정한다.

``` TypeScript
let v1 = 123;
v1 = 'abc'; // 타입 에러
```
자바스크립트에서는 문제없이 실행되지만, 타입스크립트에서는 타입 에러가 발생한다.
타입이 숫자인 v1 변수에 문자열을 입력하려 해서 컴파일 타임에 에러가 발생한다.

다음과 같이 명시적으로 타입 정보를 입력해주면, 타입스크립트에서도 타입 에러가 나지 않는다.

``` TypeScript
let v1: number | string = 123;
v1 = 'abc';
```

<br>
<br>

## 타입스크립트의 여러 가지 타입

#### 타입스크립트의 다양한 타입

``` TypeScript
const size: number = 123;
const isBig: boolean = size >= 100;
const msg: string = isBig ? '크다' : '작다';

const values: number[] = [1, 2, 3];
const values2: Array<number> = [1, 2, 3];
values.push('a'); // 타입 에러

const data: [string, number] = [msg, size];
data[0].substr(1);
data[1].substr(1); // 타입 에러
```

<br>

**null과 undefined 타입**

타입스크립트에서 undefined와 null은 타입으로 사용될 수 있다.
보통 다른 타입과 함께 유니온 타입으로 정의할 때 많이 사용된다.

``` TypeScript
let v3: number | undefined = undefined;
v3 = 123;
```

<br>

**문자열 리터럴과 숫자 리터럴 타입**

``` TypeScript
let v1: 10 | 20 | 30;
v1 = 10;
v1 = 15; // 타입 에러

let v2: '경찰관' | '소방관';
v2 = '의사'; // 타입 에러
```

<br>

**any 타입**

``` TypeScript
let value: any;
value = 123;
value = '456';
value = () => {};
```

any 타입에는 숫자와 문자열뿐만 아니라 함수도 입력될 수 있다. any 타입은 기존에 자바스크립트 코드로 작성된 프로젝트를 타입스크립트로 포팅하는 경우에 유용하게 사용될 수 있다. 기존 프로젝트의 모든 코드에 타입을 한번에 정의하는 것은 부담되기 때문에 타입 에러가 나는 부분은 임시로 any 타입으로 정의하면 된다. any 타입은 실제로 타입을 알 수 없는 경우나 타입 정의가 안 된 외부 패키지를 사용하는 경우에도 사용하기 좋다. 단, any 타입을 남발하면 타입스크립트를 사용하는 의미가 퇴색되기 때문에 되도록 피하는 게 좋다.

<br>

**void와 never 타입**

아무 값도 반환하지 않고 종료되는 함수의 반환 타입은 void 타입으로 정의할 수 있다. 그리고 항상 예외가 발생해서 비정상적으로 종료되거나 무한 루프 때문에 종료되지 않는 함수의 반환 타입은 never 타입으로 정의할 수 있다.

``` TypeScript
function f1(): void {
  console.log('hello');
}
function f2(): never {
  throw new Error('some error');
}
function f3(): never {
  while(true) {
    //...
  }
}
```

f1은 아무 값도 반환하지 않으므로 void 타입으로 정의했다.
f2는 함수가 항상 비정상적으로 종료되므로 never 타입으로 정의했다.
f3는 함수가 종료되지 않으므로 never 타입으로 정의했다.

<br>

**object 타입**

object 타입은 자바스크립트에서 일반적으로 사용되는 객체의 타입이다.

``` TypeScript
let v: object;
v = { name: 'abc' };
console.log(v.prop1); // 타입 에러
```

객체의 속성에 대한 정보가 없기 때문에 특정 속성값에 접근하면 타입 에러가 발생한다. 속성 정보를 포함해서 타입을 정의하기 위해서는 인터페이스를 사용해야 한다.

<br>

**교차 타입과 유니온 타입**

여러 타입의 교집합과 합집합을 각각 교차(intersection) 타입과 유니온(union) 타입으로 표현할 수 있다. 교차 타입은 & 기호로 정의하고, 유니온 타입은 | 기호로 정의한다.

``` TypeScript
let v1: (1 | 3 | 5) & (3 | 5 | 7);
v1 = 3;
v1 = 1; // 타입 에러
```

<br>

**type 키워드로 타입에 별칭 주기**

type 키워드를 사용해서 타입에 별칭을 줄 수 있다. 타입 별칭은 타입을 선언할 때 편리하게 사용할 수 있다.

``` TypeScript
type Width = number | string;
let width: Width;
width = 100;
width = '100px';
```

<br>
<br>

#### 열거형 타입

열거형 타입은 enum 키워드를 사용해서 정의한다. 열거형 타입의 각 원소는 값으로 사용될 수 있고, 타입으로 사용될 수도 있다.

``` TypeScript
enum Fruit {
  Apple,
  Banana,
  Orange,
}
const v1: Fruit = Fruit.Apple;
const v2: Fruit.Apple | Fruit.Banana = Fruit.Banana;
```

<br>

다음은 명시적으로 원소의 값을 입력하는 코드다.

``` TypeScript
enum Fruit {
  Apple,
  Banana = 5,
  Orange,
}
console.log(Fruit.Apple, Fruit.Banana, Fruit.Orange);
// 0, 5, 6
```

첫 번째 원소에 값을 할당하지 않으면 자동으로 0이 할당된다.
명시적으로 값을 입력하지 않으면 이전 원소에서 1만큼 증가한 값이 할당된다.

다른 타입과 달리 열거형 타입은 컴파일 후에도 관련된 코드가 남는다. 위의 예제 코드를 컴파일한 결과다.

``` TypeScript
var Fruit;
(function(Fruit){
  Fruit[(Fruit['Apple'] = 0)] = 'Apple';
  Fruit[(Fruit['Banana'] = 5)] = 'Banana';
  Fruit[(Fruit['Orange'] = 6)] = 'Orange';
})(Fruit || (Fruit = {}));
console.log(Fruit.Apple, Fruit.Banana, Fruit.Orange);
```

열거형 타입의 각 원소는 이름과 값이 양방향으로 매핑(mapping) 된다. 열거형 타입은 객체로 존재하기 때문에 해당 객체를 런타임에 사용할 수 있다.

``` TypeScript
enum Fruit {
  Apple,
  Banana = 5,
  Orange,
}
console.log(Fruit.Banana); // 5
console.log(Fruit['Banana']); // 5
console.log(Fruit[5]); // Banana
```

<br>

**열거형 타입의 값으로 문자열 할당하기**

``` TypeScript
enum Language {
  Korean = 'ko',
  English = 'en',
  Japanese = 'jp',
}
```

``` TypeScript
var Language;
(function(Language){
  Language['Korean'] = 'ko';
  Language['English'] = 'en';
  Language['Japanese'] = 'jp';
})(Language || (Language = {}));
```

열거형 타입의 원소에 문자열을 할당하는 경우에는 단방향으로 매핑된다. 이는 서로 다른 원소의 이름 또는 값이 같은 경우 충돌이 발생하기 때문이다.

<br>

**열거형 타입을 위한 유틸리티 함수**

열거형 타입을 자주 사용한다면 몇 가지 유틸리티 함수를 만들어서 사용하는 게 좋다. 다음은 특정 열거형 타입에서 원소의 개수를 반환하는 함수다.

``` TypeScript
function getEnumLength(enumObject: any) {
  const keys = Object.keys(enumObject);
  // enum의 값이 숫자이면 두 개씩 들어가므로 문자열만 계산한다.
  return keys.reduce(
    (acc, key) => (typeof enumObject[key] === 'string' ? acc + 1 : acc), 0,
  );
}
```

<br>

다음은 입력된 값이 열거형 타입에 존재하는 값인지 검사하는 함수다.

``` TypeScript
function isValidEnumValue(enumObject: any, value: number | string) {
  if(typeof value === 'number') {
    return !!enumObject[value];
  } else {
    return (
      Object.keys(enumObject)
        .filter(key => isNaN(Number(key)))
        .find(key => enumObject[key] === value) != null
    );
  }
}
```

<br>

이제 getEnumLength 함수와 isValidEnumValue 함수를 사용하는 코드다.

``` TypeScript
enum Fruit {
  Apple,
  Banana,
  Orange,
}
enum Language {
  Korean = 'ko',
  English = 'en',
  Japanese = 'jp',
}
console.log(getEnumLength(Fruit), getEnumLength(Language)); // 3 3
console.log('1 in Fruit:', isValidEnumValue(Fruit, 1)); // true
console.log('5 in Fruit:', isValidEnumValue(Fruit, 5)); // false
console.log('ko in Language:', isValidEnumValue(Language, 'ko')); // true
console.log('Korean in Language:', isValidEnumValue(Language, 'Korean')); // false
```

<br>

**getEnumLength 함수를 이용해서 테스트 코드 작성하기**

``` TypeScript
enum Fruit {
  Apple,
  Banana,
  Orange,
}
const FRUIT_PRICE = {
  [Fruit.Apple]: 1000,
  [Fruit.Banana]: 1500,
  [Fruit.Orange]: 1200,
};

test('FRUIT_PRICE에 정의되지 않은 Fruit가 있는지 체크', () => {
  expect(getEnumLength(Fruit)).toBe(Object.keys(FRUIT_PRICE).length);
})
```

Fruit에 새로운 과일이 추가되면 FRUIT_PRICE에도 반드시 해당 과일의 가격을 추가해야 한다. 하지만 사람이 하는 일이다 보니 실수하는 경우가 많다. getEnumLength 함수를 이용해서 테스트 코드를 작성하면 Fruit와 FRUIT_PRICE의 크기를 항상 같게 유지할 수 있다.

<br>

**상수 열거형 타입**

열거형 타입은 컴파일 후에도 남아 있기 때문에 번들 파일의 크기가 불필요하게 커질 수 있다. 열거형 타입의 객체에 접근하지 않는다면 굳이 컴파일 후에 객체로 남겨 놓을 필요는 없다. 상수(const) 열거형 타입을 사용하면 컴파일 결과에 열거형 타입의 객체를 남겨 놓지 않을 수 있다.

``` TypeScript
const enum Fruit {
  Apple,
  Banana,
  Orange,
}
const fruit: Fruit = Fruit.Apple;

const enum Language {
  Korean = 'ko',
  English = 'en',
  Japanese = 'jp',
}
const lang: Language = Language.Korean;
```

<br>

위의 코드를 컴파일한 결과는 다음과 같다

``` TypeScript
var fruit = 0;
var lang = 'ko';
```

열거형 타입의 객체를 생성하는 코드가 보이지 않는다. 열거형 타입이 사용된 코드는 원소의 값으로 대체되므로 코드가 상당히 간소화된다.

하지만 상수 열거형 타입을 모든 경우에 쓸 수 있는 것은 아니다, 열거형 타입을 상수로 정의하면 열거형 타입의 객체를 사용할 수 없다.

`console.log(getEnumLength(Fruit)); //타입 에러`

<br>
<br>

#### 함수 타입

함수의 타입을 정의하기 위해서는 매개변수 타입과 반환 타입이 필요하다. 콜론을 이용해서 매개변수 타입과 반환 타입을 정의할 수 있다.

``` TypeScript
function getInfoText(name: string, age: number): string {
  const nameText = name.substr(0, 10);
  const ageText = age >= 35 ? 'senior' : 'junior';
  return `name: ${nameText}, age: ${ageText}`;
}
const v1: string = getInfoText('mike', 23);
const v2: string = getInfoText('mike', '23'); //타입 에러
const v3: number = getInfoText('mike', 23); //타입 에러
```

<br>

**선택 매개변수**

선택 매개변수는 반드시 입력하지 않아도 되는 매개변수다. 매개변수 이름 오른쪽에 물음표 기호를 입력하면 선택 매개변수가 된다.

``` TypeScript
function getInfoText(name: string, age: number, language?: string): string {
  const nameText = name.substr(0, 10);
  const ageText = age >= 35 ? 'senior' : 'junior';
  const languageText = language ? language.substr(0, 10) : '';
  return `name: ${nameText}, age: ${ageText}, language: ${languageText}`;
}
getInfoText('mike', 23, 'ko');
getInfoText('mike', 23);
getInfoText('mike', 23, 123); //타입 에러
```

<br>

> **선택 매개변수 오른쪽에 필수 매개변수를 정의하면?**
>
> `function getInfoText(name: string, language?: string, age: number): string { //... }`
> 컴파일 에러가 발생한다.
>
> ==> **undefined를 이용해서 중간에 선택 매개변수 정의하기**
> ``` TypeScript
> function getInfoText(
>   name: string,
>   language: string | undefined,
>   age: number,
>): string {
>    //...
>}
>getInfoText('mike', undefined, 23);
> ```

<br>
<br>

**나머지 매개변수**

``` TypeScript
function getInfoText(name: string, ...rest: string[]): string {
  //...
}
```

<br>

**this 타입**

함수의 this 타입을 정의하지 않으면 기본적으로 any 타입이 사용된다. 앞에서도 말했듯 any 타입은 가급적 사용하지 않는게 좋으므로 this 타입을 정의해 두는 게 좋다.

``` TypeScript
function getParam(this: string, index: number): string {
  const params = this.splt(',') // 타입 에러
  //...
}
```

<br>

**원시 타입에 메서드 추가하기**

원시(primitive) 타입에 메서드를 등록할 때는 인터페이스를 이용한다.

``` TypeScript
interface String {
  getParam(this: string, index: number): string,
}
String.prototype.getParam = getParam;
console.log('asdf, 1234, ok '.getParam(1));
```

<br>

**함수 오버로드: 여러 개의 타입 정의하기**

자바스크립트는 동적 타입 언어이므로 하나의 함수가 다양한 매개변수 타입과 반환 타입을 가질 수 있다. 함수 오버로드(overload)를 사용하면 하나의 함수에 여러 개의 타입을 정의할 수 있다.

``` TypeScript
function add(x: number, y: number): number;
function add(x: string, y: string): string;
function add(x: number | string, y: number | string): number | string {
  //...
}
const v1: number = add(1, 2);
console.log(add(1, '2')); //타입 에러
```

<br>

**명명된 매개변수**

``` TypeScript
function getInfoText({
  name,
  age = 15,
  language,
}: {
  name: string;
  age?: number;
  language?: string;
}): string {
  const nameText = name.substr(0, 10);
  const ageText = age >= 35 ? 'senior' : 'junior';
  return `name: ${nameText}, age: ${ageText}, language: ${language}`;
}
```

<br>

명명된 매개변수의 타입을 다른 코드에서도 재사용하려명 인터페이스를 사용한다.

``` TypeScript
interface Param {
  name: string;
  age?: number;
  language?: string;
}
function getInfoText({ name, age = 15, language }: Param): string {
  //...
}
```

<br>
<br>

## 인터페이스

자바에서의 인터페이스는 클래스를 구현하기 전에 필요한 메서드를 정의하는 용도로 쓰이지만, 타입스크립트에서는 좀 더 다양한 것들을 정의하는 데 사용된다.

#### 인터페이스로 객체 타입 정의하기

인터페이스로 타입을 정의할 때는 interface 키워드를 사용한다.

``` TypeScript
interface Person {
  name: string;
  age: number;
}
const p1: Person = { name: 'mike', age: 23 };
const p2: Person = { name: 'mike', age: 'ten' }; // 타입 에러
```

<br>

**선택 속성**

선택 속성은 객체에서 없어도 되는 속성을 말한다. 물음표 기호를 사용한다.

``` TypeScript
interface Person {
  name: string;
  age?: number;
}
const p1: Person = { name: 'mike' };
```

반면, 다음과 같이 물음표 기호를 사용하지 않고 undefined를 유니온 타입으로 추가하면 선택 속성과 달리 명시적으로 age 속성을 입력해야 한다.

``` TypeScript
interface Person {
  name: string;
  age: number | undefined;
}
const p1: Person = { name: 'mike' }; // 타입 에러
const p2: Person = { name: 'mike', age: undefined };
```

<br>

**읽기 전용 속성**

객체에서 읽기 전용 속성은 값이 변하지 않는 속성을 말한다. 인터페이스에서 읽기 전용 속성은 `readonly` 키워드를 사용한다.

``` TypeScript
interface Person {
  readonly name: string;
  age?: number;
}
const p1: Person = {
  name: 'mike',
};
p1.name = 'jone'; // 컴파일 에러
```

<br>

**정의되지 않은 속성값에 대한 처리**

보통은 객체가 인터페이스에 정의되지 않은 속성값을 갖고 있어도 할당이 가능하다. 단, 리터럴로 값을 초기화하는 경우에는 인터페이스에 정의되지 않은 속성값이 있으면 타입 에러가 발생한다.

``` TypeScript
interface Person {
  readonly name: string;
  age?: number;
}
const p1: Person = {
  name: 'mike',
  birthday: '1997-01-01', // 타입 에러
};
const p2 = {
  name: 'mike',
  birthday: '1997-01-01',
};
const p3: Person = p2;
```

<br>

#### 인터페이스로 정의하는 인덱스 타입

인터페이스에서 속성 이름ㅇ르 구체적으로 정의하지 않고 값의 타입만 정의하는 것을 인덱스(index) 타입이라고 한다.

``` TypeScript
interface Person {
  readonly name: string;
  age: number;
  [key: string]: string | number;
}
const p1: Person = {
  name: 'mike',
  birthday: '1997-01-01',
  age: '25', // 타입 에러
};
```

<br>

**여러 개의 인덱스를 정의하는 경우**

자바스크립트에서는 속성 이름에 숫자와 문자열을 사용할 수 있다. 그리고 속성 이름에 숫자를 사용하면 문자열로 변환된 후 사용된다. 따라서 타입스크립트에서는 숫자인 속성 이름의 값이 문자열인 속성 이름의 값으로 할당 가능한지 검사한다.

``` TypeScript
interface YearPriceMap {
  [year: number]: number;
  [year: string]: string | number;
}
const yearMap: YearPriceMap = {};
yearMap[1998] = 1000;
yearMap[1998] = 'abc' // 타입 에러
yearMap['2000'] = 1234;
yearMap['2000'] = 'million';
```

<br>
<br>

## 타입 호환성

타입 호환성은 어떤 타입을 다른 타입으로 취급해도 되는지 판단하는 것이다. 정적 타입 언어의 가장 중요한 역할은 타입 호환성을 통해 컴파일 타임에 호환되지 않는 타입을 찾아내는 것이다. 어떤 변수가 다른 변수에 할당 가능하기 위해서는 해당 변수의 타입이 다른 쪽 변수의 타입에 할당 가능해야 한다.

<br>

#### 숫자와 문자열의 타입 호환성

숫자와 문자열 타입은 서로 포함 관계에 있지 않기 때문에 서로 할당 가능하지 않다.

<br>

#### 인터페이스의 타입 호환성

타입스크립트는 값 자체의 타입보다는 값이 가진 내부 구조에 기반해서 타입 호환성을 검사한다. 이를 덕 타이핑(duck typing) 또는 구조적 타이핑(structural typing)이라 부른다. 타입스크립트가 구조적 타이핑을 도입한 이유는 동적 타입 언어인 자바스크립트를 기반으로 하기 때문이다.

인터페이스 A가 인터페이스 B로 할당 가능하려면 다음 조건을 만족해야 한다.

- B에 있는 모든 필수 속성의 이름이 A에도 존재해야 한다.

- 같은 속성 이름에 대해, A의 속성이 B의 속성에 할당 가능해야 한다.

``` TypeScript
interface Person {
  name: string;
  age: number;
}
interface Product {
  name: string;
  age: number;
}
const person: Person = { name: 'mike', age: 23};
const product: Product = person;
```

Person과 Product는 이름이 다르지만 모든 속성 이름과 타입이 같다. 타입 이름은 다르지만 내부 구조가 같기 때문에 서로 할당이 가능하다.

많은 수의 정적 타입 언어에서는 위의 코드 경우 할당 가능하지 않지만, 타입스크립트는 구조적 타이핑을 사용하기 때문에 할당 가능하다.

<br>

**선택 속성이 타입 호환성에 미치는 영향**

Person의 age가 선택 속성이라면 Person은 Product에 할당 가능하지 않다.

``` TypeScript
interface Person {
  name: string;
  age?: number;
}
//...
const person: Person = {
  name: 'mike',
};
const product: Product = person; // 타입 에러
```

<br>

**추가 속성과 유니온 타입이 타입 호환성에 미치는 영향**

추가 속성이 있으면 값의 집합은 더 작아진다.

반대로 유니온 타입이 있으면 값의 집합은 더 커진다.

``` TypeScript
interface Person {
  name: string;
  age: number;
  gender: string;
}
interface Product {
  name: string;
  age: number | string;
}
```

Person 집합이 Product 집합에 포함되기 때문에 Person은 Product에 할당 가능하다.

<br>

#### 함수의 타입 호환성

함수는 호출하는 시점에 문제가 없어야 할당 가능하다.

함수 타입 A가 함수 타입 B로 할당 가능하기 위한 조건

- A의 매개변수 개수가 B의 매개변수 개수보다 적어야 한다.

- 같은 위치의 매개변수에 대해 B의 매개변수가 A의 매개변수로 할당 가능해야 한다.

- A의 반환값은 B의 반환값으로 할당 가능해야 한다.

``` TypeScript
type F1 = (a: number, b: string) => number;
type F2 = (a: number) => number;
type F3 = (a: number) => number | string;

let f1: F1 = (a, b) => 1;
let f2: F2 = a => 1;
let f3: F3 = a => 1;

f1 = f2;
f2 = f1; //타입 에러
f2 = f3; //타입 에러
```

<br>
<br>

## 타입스크립트 고급 기능

제네릭(generic), 맵드(mapped) 타입, 조건부(conditional) 타입에 대해 알아보자.

#### 1. 제네릭

제네릭은 타입 정보가 동적으로 결정되는 타입이다. 제네릭을 통해 같은 규칙을 여러 타입에 적용할 수 있기 때문에 타입 코드를 작성할 때 발생할 수 있는 중복 코드를 제거할 수 있다.

배열의 크기과 초깃값을 입력받아서 배열을 생성하는 함수를 작성한다고 생각해 보자.

``` TypeScript
function makeNumberArray(defaultValue: number, size: number): number[] {
  const arr: number[] = [];
  for(let i = 0; i < size; i++) {
    arr.push(defaultValue);
  }
  return arr;
}
function makeStringArray(defaultValue: string, size: number): string[] {
  const arr: string[] = [];
  for(let i = 0; i < size; i++) {
    arr.push(defaultValue);
  }
  return arr;
}
const arr1 = makeNumberArray(1, 10);
const arr2 = makeStringArray('empty', 10);
```

<br>

**함수 오버로드로 문제 개선하기**

``` TypeScript
function makeArray(defaultValue: number, size: number): number[];
function makeArray(defaultValue: string, size: number): string[];
// @ts-ignore
function makeArray(defaultValue, size) {
  const arr = [];
  // ...
}
```

하지만 이 방법은 타입을 추가할 때마다 코드도 추가해야 한다. 게다가 타입의 종류가 열 가지를 넘어가는 경우에는 코드의 가독성이 떨어진다.

<br>

**제네릭으로 문제 해결하기**

``` TypeScript
function makeArray<T>(defaultValue: T, size: number): T[] {
  const arr: T[] = [];
  for(let i = 0; i < size; i++) {
    arr.push(defaultValue);
  }
  return arr;
}
const arr1 = makeArray<number>(1, 10);
const arr2 = makeArray<string>('empty', 10);
const arr3 = makeArray(1, 10);
const arr4 = makeArray('empty', 10);
```

하지만 이 방법은 타입을 추가할 때마다 코드도 추가해야 한다. 게다가 타입의 종류가 열 가지를 넘어가는 경우에는 코드의 가독성이 떨어진다.

<br>

**제네릭으로 스택 구현하기**

제네릭은 데이터의 타입에 다양성을 부여해 주기 때문에 자료 구조에서 많이 사용된다.

``` TypeScript
class Stack<D> {
  private items: D[] = [];
  push(item: D) {
    this.items.push(item);
  }
  pop() {
    return this.items.pop();
  }
}

const numberStack = new Stack<number>();
numberStack.push(10);
const v1 = numberStack.pop();
const stringStack = new Stack<string>();
stringStack.push('a');
const v2 = stringStack.pop();

let myStack: Stack<number>;
myStack = numberStack;
myStack = stringStack; //타입 에러
```

<br>

**extends 키워드로 제네릭 타입 제한하기**

지금까지는 제네릭 타입에 아무 타입이나 입력할 수 있었다. 하지만 리액트와 같은 라이브러리의 API는 입력 가능한 값의 범위를 제한한다.

예를 들어, 리액트의 속성값 전체는 객체 타입만 허용된다. 이를 위해 타입스크립트의 제네릭은 타입의 종류를 제한할 수 있는 기능을 제공한다. extends 키워드를 이용하면 제네릭 타입으로 입력할 수 있는 타입의 종류를 제한할 수 있다.

``` TypeScript
function identity<T extends number | string>(p1: T): T {
  return p1;
}
identity(1);
identity('a');
identity([]); // 타입 에러
```

<br>

#### 2. 맵드 타입

맵드(mapped) 타입을 이용하면 몇 가지 규칙으로 새로운 인터페이스를 만들 수 있다. 기존 인터페이스의 모든 속성을 선택 속성 또는 읽기 전용으로 만들 때 주로 사용된다.

**모든 속성을 선택 속성 또는 읽기 전용으로 변경하기**

``` TypeScript
interface Person {
  name: string;
  age: number;
}
interface PersonOptional {
  name?: string;
  age?: number;
}
interface PersonReadOnly {
  readonly name: string;
  readonly age: number;
}
```

**두 개의 속성을 불 타입으로 만드는 맵드 타입**

``` TypeScript
type T1 = { [K in 'prop1' | 'prop2']: boolean };
// { prop1: boolean' prop2: boolean; }
```

**인터페이스의 모든 속성을 불 타입 및 선택 속성으로 만들어 주는 맵드 타입**

``` TypeScript
type MakeBoolean<T> = { [P in keyof T]?: boolean };
const pMap: MakeBoolean<Person> = {};
pMap.name = true;
pMap.age = false;
```

<br>

**Partial과 Readonly 내장 타입**

타입스크립트 내장 타입인 Partial과 Readonly는 맵드 타입으로 만들어졌다.

``` TypeScript
type T1 = Person['name']; //string
type Readonly<T> = { readonly [P in keyof T]: T[P] };
type Partial<T> = { [P in keyof T]?: T[P] };
type T2 = Partial<Person>;
type T3 = Readonly<Person>;
```

<br>

**Pick 내장 타입**

타입스크립트 내장 타입인 Pick은 인터페이스에서 원하는 속성만 추출할 때 사용된다.

``` TypeScript
type Pick<T, K extends keyof T> = { [P in K]: T[P] };
interface Person {
  name: string;
  age: number;
  language: string;
}
type T1 = Pick<Person, 'name' | 'language'>;
// type T1 = { name: string; language: string; }
```

<br>

**Record 내장 타입**

타입스크립트 내장 타입인 Record는 입력된 모든 속성을 같은 타입으로 만들어 주는 맵드 타입이다.

``` TypeScript
type Record<K extends string, T> = { [P in K]: T };
type T1 = Record<'p1' | 'p2', Person>;
// type T1 = { p1: Person; p2: Person; }
```

<br>

#### 3. 조건부 타입

조건부(conditional) 타입은 입력된 제네틱 타입에 따라 타입을 결정할 수 있는 기능이다. 조건부 타입은 extends 키워드와 ? 기호를 사용해서 정의한다.

``` TypeScript
// T extends U ? X : Y
type IsStringType<T> = T extends string ? 'yes' : 'no';
type T1 = IsStringType<string>; //'yes'
type T2 = IsStringType<number>; //'no'
```

<br>

**Exclude, Extract 내장 타입**

타입스크립트 내장 타입인 Exclude, Extract 타입은 조건부 타입으로 만들 수 있다.

Exclude는 조건에 해당하는 것을 제외한 값을 반환(제외)
Extract는 조건에 해당하는 값을 반환(추출)

``` TypeScript
type T1 = number | string | never; // string | number
type Exclude<T, U> = T extends U ? never : T;
type T2 = Exclude<1 | 3 | 5 | 7, 1 | 5 | 9>; //3 | 7
type T3 = Exclude<string | number | (() => void), Function>; // string | number
type Extract<T, U> = T extends U ? T : never;
type T4 = Extract<1 | 3 | 5 | 7, 1 | 5 | 9>; // 1 | 5
```

<br>

**ReturnType 내장 타입**

조건부 타입으로 만들어진 ReturnType 내장 타입은 함수의 반환 타입을 추출한다.

``` TypeScript
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
type T1 = ReturnType<() => string>; // string
function f1(s: string): number {
  return s.length;
}
type T2 = ReturnType<typeof f1>; // number
```

<br>

**조건부 타입으로 직접 만들어 보는 유틸리티 타입**

1) 인터페이스에서 문자열 속성만 추출해서 사용하는 유틸리티 타입

``` TypeScript
type StringPropertyNames<T> = {
  [K in keyof T]: T[K] extends String ? K : never
}[keyof T];
type StringProperties<T> = Pick<T, StringPropertyNames<T>>;
interface Person {
  name: string;
  age: number;
  nation: string;
}
type T1 = StringPropertyNames<Person>; // "name" | "nation"
type T2 = StringProperties<Person>; // { name: string; nation: string; }
```

<br>

2) 일부 속성만 제거해 주는 유틸리티 타입

``` TypeScript
type Omit<T, U extends keyof T> = Pick<T, Exclude<keyof T, U>>;
interface Person {
  name: string;
  age: number;
  nation: string;
}
type T1 = Omit<Person, 'nation' | 'age'>;
const p: T1 = {
  name: 'mike',
};
```

<br>

3) 인터페이스를 덮어쓰는 유틸리티 작업

``` TypeScript
type Overwrite<T, U> = { [P in Exclude<keyof T, keyof U>]: T[P] } & U;
interface Person {
  name: string;
  age: number;
}
type T1 = Overwrite<Person, { age: string; nation: string }>;
const p: T1 = {
  name: 'mike',
  age: '23',
  nation: 'korea',
};
```

<br>
<br>

## 생산성을 높이는 타입스크립트의 기능

정적 타입 언어를 사용할 떄의 단점은 타입을 정의하는 데 시간과 노력이 많이 들기 때문에 생산성이 저하될 수 있다는 것이다,. 타입스크립트에서는 다양한 경우에 대해 타입 추론을 제공해 주기 때문에 꼭 필요한 경우에만 타입 정의를 할 수 있다. 또한 타입스크립트에서 제공하는 타입 가드(guard) 덕분에 타입 단언(assertion) 코드를 최소화할 수 있다.

<br>

#### 타입 추론

명시적으로 타입 코드를 작성하지 않아도 타입스크립트가 타입을 추론할 수 있는 경우가 많다. 타입 추론 덕분에 코드를 덜 작성하면서도 같은 수준의 타입 안정성을 유지할 수 있다.

**let 변수의 타입 추론**

``` TypeScript
let v1 = 123;
let v2 = 'abc';
v1 = 'a'; //타입 에러
v2 = 456; //타입 에러
```

이처럼 타입을 명시하지 않아도 컴파일 시점에 타입 에러가 발생할 수 있다.

let 변수는 재할당 가능하기 때문에 융통성 있게 타입이 결정된다. 반면 const 변수는 값이 변하지 않기 때문에 let 변수보다 엄격하게 타입이 결정된다.

<br>

**const 변수의 타입 추론**

``` TypeScript
const v1 = 123;
const v2 = 'abc';
let v3: typeof v1 | typeof v2;
```

const 변수는 리터럴 자체가 타입이 된다.
따라서 변수 v1의 타입은 숫자가 아니라 123이다.
변수 v3의 타입은 123 | 'abc' 가 된다.

<br>

**배열과 객체의 타입 추론**

``` TypeScript
const arr1 = [10, 20, 30];
const [n1, n2, n3] = arr1;
arr1.push('a'); // 타입 에러

const arr2 = { id: 'abcd', age: 123, language: 'korean' };
// const arr2: { id: string; age: number; language: string; }
const { id, age, language } = arr2;
console.log(id === age); // 타입 에러
```

<br>
<br>

#### 타입 가드

타입 가드(guard)는 조건문에 의해 타입의 범위를 좁히는 기능이다. 타입 가드를 잘 활용하면 불필요한 타입 단언(assertion) 코드를 피할 수 있으므로 생산성과 가독성이 높아진다.

**타입 가드를 활용하지 않은 코드**

``` TypeScript
function print(value: number | string) {
  if(typeof value === 'number') {
    console.log((value as number).toFixed(2));
  } else {
    console.log((value as string).trim());
  }
}
```

<br>

**typeof 키워드**

``` TypeScript
function print(value: number | string) {
  if(typeof value === 'number') {
    console.log(value.toFixed(2));
  } else {
    console.log(value.trim());
  }
}
```

<br>

**instanceof 키워드**

클래스의 경우에는 instanceof 키워드가 타입 가드로 사용될 수 있다.

``` TypeScript
class Person {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}
class Product {
  name: string;
  price: number;
  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
  }
}
function print(value: Person | Product) {
  console.log(value.name);
  if(value instanceof Person) {
    console.log(value.age);
  } else {
    console.log(value.price);
  }
}
const person = new Person('mike', 23);
print(person);
```

인터페이스의 경우에는 instanceof 키워드를 사용할 수 없다. instanceof 오른쪽에는 생성자 함수만 올 수 있기 때문이다.

<br>

**인터페이스를 구별하기 위한 방법**

인터페이스를 구별하기 위한 한 가지 방법은 식별 가능한 유니온(discriminated union) 타입을 이용하는 것이다. 인터페이스에서 식별 가능한 유니온 타입은 같은 이름의 속성을 정의하고 속성의 타입은 모두 겹치지 않게 정의하면 된다.

``` TypeScript
interface Person {
  type: 'person';
  name: string;
  age: number;
}
interface Product {
  type: 'product';
  name: string;
  price: number;
}
function print(value: Person | Product) {
  if(value.type === 'person') {
    console.log(value.age);
  } else {
    console.log(value.price);
  }
}
```

이처럼 단순히 type 속성을 비교하는 것만으로 두 타입을 완전히 구별할 수 있다. 식별 가능한 유니온 타입은 서로 겹치지 않기 때문에 switch 문에서 사용하기 좋다.

``` TypeScript
function print(value: Person | Product) {
  switch (value.type) {
    case 'person':
      console.log(value.age);
      break;
    case 'product':
      console.log(value.price);
      break;
  }
}
```

<br>

**타입을 검사하는 함수**

타입 가드를 활용하는 또 다른 방법으로 타입을 검사하는 함수를 작성하는 방법이 있다.

``` TypeScript
function isPerson(x: any): x is Person {
  return (x as Person).age !== undefined;
}
function print(value: Person | Product) {
  if(isPerson(value)) {
    console.log(value.age);
  } else {
    console.log(value.price);
  }
}
```

<br>

**in 키워드**

함수를 작성하는 게 번거롭다면 in 키워드를 이용해 작성할 수 있다.

``` TypeScript
function print(value: Person | Product) {
  if('age' in value) {
    console.log(value.age);
  } else {
    console.log(value.price);
  }
}
```

<br>

사실 식별 가능한 유니온 타입보다 속성 이름을 검사하는 방법이 좀 더 간편하다. 하지만 타입의 종류가 많아지고 같은 이름의 속성이 중복으로 사용된다면, 식별 가능한 유니온 타입을 사용하기 바란다.

<br>
<br>

출처
- 실전 리액트 프로그래밍 (프로그래밍인사이트-이재승)
