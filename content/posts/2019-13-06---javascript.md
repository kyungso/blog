---
title: "자바스크립트 (JavaScript)"
date: "2019-06-13T14:00:00.169Z"
template: "post"
draft: false
slug: "/posts/javascript/"
category: "JavaScript"
tags:
- "Web"
- "javascript"
description: "기본 문법"
---

<br>

## 자바스크립트 (JavaScript)

자바스크립트는 처음엔 웹브라우저를 제어하기 위해 고안된 언어였습니다.

하지만 웹 서버 측 스크립팅으로 node.js가 각광받으면서 javascript는 단순히 웹 브라우저를 제어하기 위한 도구가 아닌 여러 분야, 여러 환경에서 사용가능한 언어가 되었습니다.

<br>

![javascript1.jpg](/media/javascript1.jpg)   

<br>

![javascript2.jpg](/media/javascript2.jpg)   

<br>

웹 브라우저, node.js, 구글 spreadsheet 등 다양한 환경에 따라 빨간색 물결에 alert, write, msgBox 등 다양한 언어가 들어갈 수 있습니다.

<br>

#### 변수

- 지역변수
- 전역변수

자바스크립트의 지역변수는 함수에 대한 유효범위를 가진다.
Java를 비롯해 많은 언어들의 지역변수는 보통 블록({}) 유효범위를 가진다.

``` JavaScript
for(var i = 0; i < 1; i++){
  var name = 'coding everybody';
}
alert(name);  // coding everybody
```

<br>

#### 데이터 타입

- Boolean
  - true (1)
  - false (0)
    - 0, ''(빈문자열), undefined, null, NaN

<br>

- undefined
  - 선언만 하고 값을 할당하지 않은 것 (의도하지 않은)

<br>

- null
  - 프로그래머가 의도적으로 값을 없게 지정한 것

- NaN
  - Not a Number로 숫자가 아닌 것
  - ex) 0/0

<br>

#### 연산자

<br>

- 동등 연산자 (==) : 데이터타입에 상관없이 값만 같다면 true

``` HTML
alert(1 == '1') //true
```

<br>

- 일치 연산자 (===) : 값 뿐만 아니라 데이터타입까지 같아야 true

``` HTML
alert(1 === '1') //false
```

<br>

#### 배열

**원소 추가**

- push : 배열의 끝에 원소 추가
- unshift : 배열의 처음에 원소 추가
- splice : 배열의 특정구간에 추가

**원소 제거**

- shift : 배열의 첫 번째 원소 제거
- pop : 배열의 끝점의 원소 제거

**정렬**

- sort
- reverse : 역순으로 정렬

<br>

#### 함수

함수의 효용
- 재사용성
- 유지보수 용이
- 가독성 ↑

<br>

#### 객체

``` JavaScript
var grades = {'gildong': 10, 'superman': 6, 'batman': 80};
```

- grades['gildong']     // 10
- grades['gil'+'dong']  // 10

- grades.gildong  // 10
- grades.'gil'+'dong' (x) error

<br>

#### this 키워드

onclick 이벤트가 속해있는 자기자신의 태그를 this로 표현할 수 있음

#### UI & API

**UI (User Interface)**
\: 개발자가 아닌 사람들이 시스템, 컴퓨터 등과 의사소통하기 위해 사용하는 매개체. (사용자를 대면하는 접점이 되는 지점)

**API (Application Programming Interface)**
\: 응용프로그램에서 사용할 수 있도록, 운영체제나 프로그래밍 언어가 제공하는 기능을 제어할 수 있게 만든 인터페이스를 뜻함.

UI, API를 예를 들어 생각해보자.

첫 번째로, 내가 구글홈페이지에 들어가기 위해 **터치패드** 를 이용해서 웹 브라우저를 클릭해서 열고, **키패드** 를 사용해서 "www.google.com"을 작성해서 엔터를 눌러 구글 홈페이지로 이동을 했다.

두 번째로, 구글홈페이지에서 **로그인 버튼** 을 눌러 아이디, 비밀번호를 치고 **Gmail 버튼** 을 눌러 메일함을 확인합니다.

위에 말한 첫 번째 예시에서, 노트북을 제어하기 위해 사용한 터치패드, 키패드도 하드웨어적인 UI에 해당한다. 또한, 두 번째 예시에서, 구글홈페이지와 상호작용하기 위한 로그인 버튼, Gmail 버튼도 UI에 해당한다. 내가 로그인 버튼을 눌러 아이디,비밀번호를 입력하여 확인 버튼을 눌렀고, 구글홈페이지는 로그인을 받아들이고, 사용자의 메일 정보를 알려줍니다.

세 번째로, 검색창에 'javascript:alert("Hello");'를 작성해 엔터를 쳐봅시다. 이 때, "Hello"라고 적힌 경고창이 나타날 것입니다. 이 경고창은 내가 만든것일까요? 누가 만든것인가요?

반반이라고 생각할 수 있습니다. 경고창이 떴을 때, 화면에 가운데에 뜨고, 창 내에 경고아이콘이 있으며, 닫기 버튼, 확인 버튼 등의 UI를 내가 코드상으로 작성하지도 않았는데 만들어졌습니다. 이건 웹 브라우저가 alert 명령을 받았을 때, 웹 브라우저의 API에 영향을 받아 만들어진 것입니다. 웹 브라우저의 API는 운영체제의 API에 영향을 받습니다.

```
        API             API
운영체제 -----> 웹 브라우저 -----> 응용프로그램
```

두 개 사이의 접점이 인터페이스입니다.

<br>

아래의 그림은 ['생활코딩'](https://www.opentutorials.org/course/743/6533)에서 영상을 보고, 그린 그림입니다.

![api.jpg](/media/api.jpg)   

<br>

각 계층 사이를 interface라고 하고, 밑에서 위로 올라갈수록 각 계층의 interface를 응용해서 사용합니다.

***즉, 개발자가 아닌 사람은 UI를 통해서 시스템을 제어하고,
개발자는 물론 UI도 사용하지만, API를 이용해서 자신의 맥락에 맞게 그것을 응용해서 응용프로그램을 만듭니다.***

따라서 내가 제어하고자 하는 환경에 맞는 API를 잘 찾아보고 활용할 수 있어야 합니다.

<br>

**[ 자바스크립트 API 문서 ]**

- [ECMAScript (표준문서)](http://www.ecma-international.org/publications/standards/Ecma-262.htm)

- [Javascript Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference)

- [jscript Reference](https://docs.microsoft.com/ko-kr/previous-versions/visualstudio/visual-studio-2010/z688wt03(v=vs.100))

**[ 호스트 환경의 API 문서 ]**

- [웹브라우저 API](https://developer.mozilla.org/en-US/docs/Web/API)

- [Node.js API](https://nodejs.org/api/)

- [Google Apps Script API](https://developers.google.com/apps-script/)

<br>

#### 정규표현식

정규표현식은 두 가지 단계로 이루어지는데, 하나는 컴파일(compile), 다른 하나는 실행(execution)이다.

컴파일은 검출하고자 하는 패턴을 만드는 일이다.

**[정규표현식 객체 생성 방법]**

- 정규표현식 리터럴

``` JavaScript
var pattern = /a/;
```

- 정규표현식 객체 생성자

``` JavaScript
var pattern = new RegExp('a');
```

<br>

**[정규표현식 메소드]**

- **추출 - RegExp.exec()**

  - 패턴에 해당하는 필요한 정보를 추출

  - 예)

    ``` JavaScript
    var pattern = /a./;
    pattern.exec('abcdefg');    // ["ab"]
    ```

- **test - RegExp.text()**

  - 확인하고자 하는 패턴에 해당하는 정보가 있는지 없는지 test

  - 예)

    ``` JavaScript
    var pattern = /a./;
    pattern.test('bcdefg');    // false
    ```

<br>

**[문자열 메소드]**

- **추출 - String.match()**

  - RegExp.exec()와 비슷

  - 예)

    ``` JavaScript
    var pattern = /a/;
    var str = 'abcdef';
    str.match(pattern);   // ["a"]
    ```

- **치환 - String.replace()**

  - 패턴에 해당하는 정보를 다른 정보로 치환

  - 예)

    ``` JavaScript
    var pattern = /a/;
    var str = 'abcdef';
    str.replace(pattern, 'A');    // "Abcdef"
    ```

<br>

**[옵션 설정]**

- **i**

  -  대소문자를 구분하지 않는 옵션

  - 예)

    ``` JavaScript
    var xi = /a/;
    "Abcde".match(xi);  // null

    var oi = /a/i;
    "Abcde".match(oi);  // ["A"]
    ```

- **g**

  - 검색된 모든 결과를 리턴하는 옵션

  - 예)

    ``` JavaScript
    var xg = /a/;
    "abcdea".match(xg);   // ["a"]

    var og = /a/g;
    "abcdea".match(og);   // ["a", "a"]
    ```

<br>

**[캡처]**

그룹을 지정하고, 지정된 그룹을 가져와서 사용할 수 있는 기능

- 예)

  ``` JavaScript
  var pattern = /(\w+)\s(\w+)/;
  var str = "coding everybody";
  var result = str.replace(pattern, "$2, $1");
  console.log(result);  // "everybody, coding"
  ```

<br>

**[정규표현식 추가 링크]**

- [정규표현식을 시각화](https://regexper.com/)

- [정규표현식 빌더](https://regexr.com/)

<br>

#### 클로저 (closure)

내부함수가 외부함수의 맥락(context)에 접근할 수 있는 것

내부함수는 외부함수의 지역변수에 접근할 수 있는데,
외부함수의 실행이 끝나서 외부함수가 소멸된 이후에도 내부함수가 외부함수의 변수에 접근할 수 있다.

``` JavaScript
function outter(){
  var title = 'coding everybody';
  return function(){
    alert(title);
  }
}
inner = outter();
inner();
```

outter 함수는 return 키워드로 실행이 끝났기 때문에 outter 함수의 지역변수인 title은 소멸되는 것이 자연스럽다. 하지만 위의 예제의 결과는 'coding everybody' 경고창이 출력된다.

따라서, 클로저란 내부함수가 외부함수의 지역변수에 접근할 수 있고, 외부함수는 외부함수의 지역변수를 사용하는 내부함수가 소멸될 때까지 소멸되지 않는 특성을 의미한다.

말그대로 클로저, 닫혀버린 녀석들이다.
내부함수와 지역변수들을 외부에서 접근되지 못하도록 외부함수에 의해 닫혀버린 것입니다.
내부함수와 지역변수들을 private 멤버로 만들 수 있습니다.
<br>

클로저의 응용 예제를 보자.

``` JavaScript
var arr = [];

for(var i = 0; i < 5; i++){
  arr[i] = function(){
  return i;
  }
}

for(var index in arr){
  console.log(arr[index]());  // 5 5 5 5 5
}
```

arr[0] = function(){return i;}
arr[1] = function(){return i;}
...
arr 배열에 함수 자체가 값으로 들어갑니다.
두 번째 for문에서 arr 배열의 값인 함수를 호출할 때에 i값이 5이므로, 5만 5번 출력됩니다.

<br>

``` JavaScript
var arr = [];

for(var i = 0; i < 5; i++){
  arr[i] =
  function(id){
    return function(){
        return id;
    }
  }(i);
}

for(var index in arr){
  console.log(arr[index]());  // 0 1 2 3 4
}
```

<br>

#### arguments

arguments는 함수 안에서 사용할 수 있도록 그 이름이나 특성이 약속되어 있는 일종의 배열이다. arguments[0]은 함수로 전달된 첫번째 인자를 알아낼 수 있다.

- for 문으로 함수로 전달된 인자의 값을 순차적으로 가져올 수 있음 (배열처럼)

- arguments.length : 함수로 전달된 인자의 개수

- 함수.length : 함수에 정의된 매개변수 개수

``` JavaScript
function one(arg1){
  console.log(
    'one.length', one.length,
    'arguments', arguments.length
  );
}
one('val1', 'val2');  // one.length 1 arguments 2
```

<br>

#### 함수의 호출

sum(1,2);

sum.apply(null, [1,2]);

<br>

### 객체 지향 프로그래밍 (Object-Oriented Programming)

[ 객체 = 프로퍼티(변수) + 메소드(함수) ]

여러 개의 목적성을 갖고 있는 로직들의 집합

- 재활용성
  - 부품화

<br>

- 추상화 (abstract)
  - 좋은 설계는 문법을 배우는 것보다 훨씬 어려운 일이다. 지식을 넘어서 지혜의 영역이다. 스스로 경험하고 깨우쳐서 자기화시켜야 한다.

<br>

- 은닉화, 캡슐화
  - 내부의 동작 방법은 단단한 케이스 안으로 숨기고, 사용자에게는 그 부품의 사용밥법만을 노출하는 것

<br>

- 인터페이스
  - 부품과 부품을 서로 교환할 수 있는 연결점

<br>

#### 생성자

일반적인 객체지향 언어에서 생성자는 클래스의 소속이다.
하지만 자바스크립트에서의 생성자는 어디에 소속되어 있지 않으며, 함수에 new를 붙이는 것을 통해서 객체를 만들 수 있다.

<br>

#### this

this는 함수 내에서 함수 호출 맥락(context)를 의미한다.

- **함수호출**
  - ``` Javascript
    function func() {
      if(window === this){
        console.log("window === this");
      }
    }
    func();   //window === this
    ```

- **메소드호출**
  - ``` Javascript
    var o = {
      func : function(){
        if(o === this){
          console.log("o === this");
        }
      }
    }
    o.func();   //o === this
    ```

==> **즉, this는 자신이 속해있는 객체를 가르킨다.**

함수호출의 func();는 어느 객체에도 소속되어 있지 않지만, 암묵적으로 window.func();에서 전역객체인 window가 생략된 것이다. 따라서 "window === this" 가 되는 것이고,

메소드호출의 o.func()는 func 메소드가 o 객체 내에 소속되어 있으므로 "o === this" 가 되는 것이다.

<br>

- **생성자의 호출**
  - ``` Javascript
    var funcThis = null;

    function Func(){
      funcThis = this;
    }

    var o2 = new Func();
    if(funcThis === o2){
      console.log('o2 <br />');   // o2
    }
    ```
<br>

#### 상속 (inheritance)

``` JavaScript
function Person(name){
  this.name = name;
}
Person.prototype.name = null;
Person.prototype.introduce = function(){
  return 'My name is '+this.name;
}

function Programmer(name){
  this.name = name;
}
Programmer.prototype = new Person();
Programmer.prototype.coding = function(){
  return "hello world";
}

var p1 = new Programmer('egoing');
console.log(p1.introduce());  //My name is egoing
console.log(p1.coding()); //hello world
```

<br>

#### Object

Javascript의 모든 객체는 Object 객체를 상속 받는다. 그 이유로 모든 객체는 Object 객체의 프로퍼티를 가지고 있다. 아래의 링크에서 확인할 수 있다.

- Object : [mdn object](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object)

``` JavaScript
Object.prototype.contain = function(needle){
  for(var name in this){
    if(this[name] === needle){
      return true;
    }
  }
  return false;
}

var o = {'name':'donald','city':'seoul'}
console.log(o.contain('donald')); //true

var a = ['donald','ddozi','gildong'];
console.log(a.contain('ddozi'));  //true
```

``` JavaScript
for(var name in o){
  console.log(name);  //name city contain
}
```

Object 객체는 모든 객체에 영향을 주기 때문에, 확장하지 않는 것이 바람직하다. 위의 코드를 실행해 보면, Object 객체의 확장한 프로퍼티인 contain이 포함되어 있다.

개발자들은 결과를 name, city 로 예상할 수도 있다. 이러한 혼란을 피하기 위해서는 프로퍼티의 해당 객체의 소속인지를 체크해볼 수 있는 hasOwnProperty를 사용하면 된다.

``` JavaScript
for(var name in o){
  if(o.hasOwnProperty(name)){
    console.log(name);  //name city
  }
}
```

<br>

#### 참고

- 왜 JavaScript가 ECMAScript??
  --> 처음엔 LiveScript로 불리다, javascript로 불렸지, ECMA International 국제기구에 위임이 되면서 ECMAScript 표준안으로 발표되었습니다.

<br>

- 크롬 개발자 도구 단축키 : (Mac) command + option + J

<br>

- jQuery를 만든 John Resig의 JavaScript 고급 강의 : http://ejohn.org/apps/learn/

<br>

- 모질라 재단 자바스크립트 튜토리얼 : https://developer.mozilla.org/ko/docs/JavaScript/Guide

<br>

- ==와 ===차이 : https://dorey.github.io/JavaScript-Equality-Table/

<br>

- Prototype-Based-Programming
  - 객체 지향 문법 + 함수형 언어 특징
  - http://insanehong.kr/post/javascript-prototype/
  - 프로토타입에 대한 이해 : http://www.nextree.co.kr/p7323/
