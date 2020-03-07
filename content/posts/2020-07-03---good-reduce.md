---
title: "[javascript] reduce 활용법"
date: "2020-03-07T14:00:00.169Z"
template: "post"
draft: false
slug: "/posts/good-reduce/"
category: "JavaScript"
tags:
- "reduce"
description: ""
---

### 1. reduce vs map

``` JavaScript
var data = [1, 2, 3];

var initialValue = [];
var reducer = function(accumulator, value) {
	accumulator.push(value * 2);
	return accumulator;
};

var result = data.reduce(reducer, initialValue);
console.log(result); // [2, 4, 6];

var result2 = data.map(x => x * 2);
console.log(result2); // [2, 4, 6]
```

> ⇒ map이 더 짧고 직관적

<br>

### 2. reduce vs filter

``` JavaScript
var data = [1, 2, 3, 4, 5, 6];

var initialValue = [];
var reducer = function(accumulator, value) {
	if (value % 2 !=0) {
		accumulator.push(value);
	}
	return accumulator;
};

var result1 = data.reduce(reducer, initialValue);
console.log(result1); // [1, 3, 5]

var result2 = data.filter(x => x % 2 != 0);
console.log(result2); // [1, 3, 5]
```

> ⇒ filter가 더 직관적

<br>

### 3. reduce vs filter + map

``` JavaScript
var data = [1, 2, 3, 4, 5, 6];

var initialValue = [];
var reducer = function(accumulator, value) {
	if (value % 2 != 0) {
		accumulator.push(value * 2);
	}
	return accumulator;
}

var result1 = data.reduce(reducer, initialValue);
console.log(result1); // [2, 6, 10]

var result2 = data.filter(x => x % 2 != 0).map(x => x * 2);
console.log(result2); // [2, 6, 10]
```

> ⇒ reduce는 배열을 1번만 순회, filter/map 조합은 2번 순회하므로 데이터 크기, 종류에 맞는 고려 및 결정 필요

<br>

### 4. getMean (평균 구하기)

``` JavaScript
var data = [1, 2, 3, 4, 5, 6, 1];
var reducer = (accumulator, value, index, array) => {
	var sumOfAccAndVal = accumulator + value;
	if(index === array.length - 1) {
		return (sumOfAccAndVal) / array.length;
	}
	return sumOfAccAndVal;
};

var getMean = data.reduce(reducer, 0);
console.log(getMean); // 3.142857142857143
```

> ⇒ 배열을 순회하면서 accumulator와 value를 더해서 sum을 만들고, 끝에 가서 배열의 크기로 나누는 로직 (초기값 0으로 세팅, 적지 않으면 배열 첫번째 값이 acuumulator로 넘어감)

<br>

### 5. initial value 주의하기

``` JavaScript
const data = ["vote1", "vote2", "vote1", "vote2", "vote2"];
const reducer = (accumulator, value, index, array) => {
	if(accumulator[value]){
		accumulator[value] = accumulator[value] + 1;
	} else {
		accumulator[value] = 1;
	}
	return accumulator;
};

const getVote = data.reduce(reducer, {}); // { vote1: 2, vote2: 3 }
const getVote2 = data.reduce(reducer); // "vote1"
```

> ⇒ getVote2는 메서드의 2번째 인자로 아무 값도 전달하지 않았기 때문에, 배열의 첫 번째 값, "vote1"이 첫 번째 순회의 accumulator로 전달되었고, 조건문의 조건이
"vote1["vote2"]이 되면서 결과는 undefined(false)가 되어 "vote1["vote2"] = 1; 이라는 의미없는 로직을 한 번 타고, 결론적으로 다음 accumulator로 "vote1"이라는 string을 넘겨 최종적으로도 "vote1"을 return 하게 됩니다.

<br>

### 6. flattern (배열 납작하게 만들기)

``` JavaScript
const data = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
const flatArrayReducer = (accumulator, value, index, array) => {
	return accumulator.concat(value);
};

const flattenedData = data.reduce(flatArrayReducer, []);
// [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

> ⇒ 깊이(depth)가 있는 배열들을 flattern할 때 배열을 순회하면서 concat(이어 붙이는) 로직을 reduce를 활용해서 구현할 수 있습니다.

<br>

### 7. flattenMap

``` JavaScript
const input = [
	{
		"title": "슈퍼맨",
		"year": "2005",
		"cast": ["장동건", "권상우", "이동욱", "차승원"]
	},
	{
		"title": "스타워즈",
		"year": "2013",
		"cast": ["차승원", "신해균", "장동건", "김수현"]
	},
	{
		"title": "고질라",
		"year": "1997",
		"cast": []
	}
];

const flatMapReducer = (accumulator, value, index, array) => {
	const key = "cast";
	if(value.hasOwnProperty(key) && Array.isArray(value[key])) {
		value[key].forEach(val => {
			if(accumulator.indexOf(val) === -1) {
				accumulator.push(val);
			}
		});
	}
	return accumulator;
};

const flattenCastArray = input.reduce(flatMapReducer, []);
// ["장동건", "권상우", "이동욱", "차승원", "신해균", "김수현"]
```

> ⇒ 배열을 순회하면서 배열의 값으로 들어있는 "cast" key 존재여부를 확인하고, unique한 "cast" key로 갖는 배열의 값들"을 최종적으로 return 하는 로직

<br>

### 8. reduceRight

``` JavaScript
const data = [1, 2, 3, 4, "5"];
const sumData1 = data.reduce((accumulator, value) => {
	return accumulator + value;
}, 0);
const sumData2 = data.reduceRight((accumulator, value) => {
	return accumulator + value;
}, 0);
console.log(sumData1); // "105"
console.log(sumData2); // "054321"
```

> ⇒ string + number —> string

<br>

### 9. reduce를 활용한 함수형 프로그래밍

``` JavaScript
const increment = (input) => { return input + 1; };
const decrement = (input) => { return input - 1; };
const double = (input) => { return input * 2; };
const halve = (input) => { return input / 2 };

// 1. 일반적일 수 있는 로직
const initial_value = 1;
const incremented_value = increment(initial_value);
const doubled_value = double(incremented_value);
const final_value = decrement(doubled_value);
console.log(final_value); // 3

// 2. reduce를 활용한 함수형 프로그래밍
const pipeline = [
	increment,
	double,
	decrement,
	decrement,
	decrement,
	halve,
	double,
];
const final_value2 = pipeline.reduce((accumulator, func) => {
	return func(accumulator);
}, initial_value);
console.log(final_value2); // 1
```

<br>

- 참고 사이트

https://medium.com/@hongkevin/js-3-자바스크립트-배열-메서드-reduce-100-활용법-feat-egghead-io-97c679857ece
