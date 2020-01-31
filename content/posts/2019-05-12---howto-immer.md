---
title: "immer로 불변성 유지하기"
date: "2019-12-05T14:00:00.169Z"
template: "post"
draft: false
slug: "/posts/howto-immer/"
category: "React"
tags:
- "immer"
description: ""
---

<br>

## immer 튜토리얼

#### 1. 설치

```
$ yarn create react-app imemr-tutorial
$ cd immer-tutorial
$ yarn add immer
```

<br>

#### 2. immer 사용하지 않고 불변성 유지

``` JavaScript
import React, { useRef, useCallback, useState } from 'react';

const App = () => {
  const nextId = useRef(1);
  const [form, setForm] = useState({ name: '', username: '' });
  const [data, setData] = useState({
    array: [],
    uselessValue: null
  });

  const onChange = useCallback(e => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: [value]
    });
  }, [form]);

  const onSubmit = useCallback(e => {
    e.preventDefault();
    const info = {
      id: nextId.current,
      name: form.name,
      username: form.username
    };

    setData({
      ...data,
      array: data.array.concat(info)
    });

    setForm({
      name: '',
      username: ''
    });
    nextId.current += 1;
  }, [data, form.name, form.username]);

  const onRemove = useCallback(id => {
    setData({
      ...data,
      array: data.array.filter(info => info.id !== id)
    });
  }, [data]);

  return (
    <div>
     <form onSubmit={onSubmit}>
       <input
         name="username"
         placeholder="아이디"
         value={form.username}
         onChange={onChange}
       />
       <input
         name="name"
         placeholder="이름"
         value={form.name}
         onChange={onChange}
       />
       <button type="submit">등록</button>
     </form>
     <div>
      <ul>
        {data.array.map(info => (
          <li key={info.id} onClick={() => onRemove(info.id)}>
           {info.username} ({info.name})
          </li>
        ))}
      </ul>
     </div>
    </div>
  );
};

export default App;
```

input 폼에서 아이디, 이름을 입력하면 하단 리스트에 추가되고, 리스트 항목을 클릭하면 삭제되는 간단한 컴포넌트입니다.

<br>

#### 3. immer 적용하기

``` JavaScript
import React, { useRef, useCallback, useState } from 'react';
import produce from 'immer';

const App = () => {
  const nextId = useRef(1);
  const [form, setForm] = useState({ name: '', username: '' });
  const [data, setData] = useState({
    array: [],
    uselessValue: null
  });

  const onChange = useCallback(e => {
    const { name, value } = e.target;
    setForm(
      produce(form, draft => {
        draft[name] = value;
      })
    );
  }, [form]);

  const onSubmit = useCallback(e => {
    e.preventDefault();
    const info = {
      id: nextId.current,
      name: form.name,
      username: form.username
    };

    setData(
      produce(data, draft => {
        draft.array.push(info);
      })
    );

    setForm({
      name: '',
      username: ''
    });
    nextId.current += 1;
  }, [data, form.name, form.username]);

  const onRemove = useCallback(id => {
    setData(
      produce(data, draft => {
        draft.array.splice(draft.array.findIndex(info => info.id === id), 1);
      })
    );
  }, [data]);

  return (...);
};

export default App;
```

immer에서 제공하는 produce 함수를 호출할 때, 첫 번째 파라미터가 함수 형태라면 업데이트 함수를 반환합니다. 그래서 위에 produce 함수의 첫 번째 파라미터를 지워서 표현할 수 있습니다.

<br>
<br>

출처
- 리액트를 다루는 기술 (개정판) - 길벗, 김민준
