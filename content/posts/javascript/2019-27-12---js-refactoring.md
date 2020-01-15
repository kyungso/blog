---
title: "Javascript 기본 함수들"
date: "2019-12-27T14:00:00.169Z"
template: "post"
draft: false
slug: "/posts/javascript/js-refactoring/"
category: "JavaScript"
tags:
- "max"
description: "최댓값, 최솟값, 평균, 중앙값, 최빈값 구하는 함수"
---

<br>

## 최댓값, 최솟값, 평균, 중앙값, 최빈값 구하는 함수

**stats.js**

``` JavaScript
exports.max = numbers => Math.max(...numbers);

exports.min = numbers => Math.min(...numbers);

exports.avg = numbers =>
  numbers.reduce(
    (acc, current, index, { length }) => acc + current / length,
    0
  );

exports.sort = numbers => numbers.sort((a, b) => a - b);
exports.median = numbers => {
  const { length } = numbers;
  const middle = Math.floor(length / 2);
  return length % 2
    ? numbers[middle]
    : (numbers[middle - 1] + numbers[middle]) / 2;
};

exports.mode = numbers => {
  const counts = numbers.reduce(
    (acc, current) => acc.set(current, acc.get(current) + 1 || 1),
    new Map()
  );

  const maxCount = Math.max(...counts.values());
  const modes = [...counts.keys()].filter(
    number => counts.get(number) === maxCount
  );

  if (modes.length === numbers.length) {
    // 최빈값이 없음
    return null;
  }

  if (modes.length > 1) {
    // 최빈값이 여러개
    return modes;
  }

  // 최빈값이 하나
  return modes[0];
};
```

<br>

**stats.test.js**

``` JavaScript
const stats = require('./stats');

describe('stats', () => {
  it('gets maximum value', () => {
    expect(stats.max([1, 2, 3, 4])).toBe(4);
  });
  it('gets minimum value', () => {
    expect(stats.min([1, 2, 3, 4])).toBe(1);
  });
  it('gets average value', () => {
    expect(stats.avg([1, 2, 3, 4, 5])).toBe(3);
  });
  describe('median', () => {
    it('sorts the array', () => {
      expect(stats.sort([5, 4, 1, 2, 3])).toEqual([1, 2, 3, 4, 5]);
    });
    it('gets the median for odd length', () => {
      expect(stats.median([1, 2, 3, 4, 5])).toBe(3);
    });
    it('gets the median for even length', () => {
      expect(stats.median([1, 2, 3, 4, 5, 6])).toBe(3.5);
    });
  });
  describe('mode', () => {
    it('has one mode', () => {
      expect(stats.mode([1, 2, 2, 2, 3])).toBe(2);
    });
    it('has no mode', () => {
      expect(stats.mode([1, 2, 3])).toBe(null);
    });
    it('has multiple mode', () => {
      expect(stats.mode([1, 2, 2, 3, 3, 4])).toEqual([2, 3]);
    });
  });
});
```
