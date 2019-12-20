---
title: "(React + MongoDB), AWS 배포 - 리액트 서버 프로젝트와 MongoDB 연결 (3)"
date: "2019-12-20T14:00:00.169Z"
template: "post"
draft: false
slug: "/posts/AWS-EC2-React-mongodb-deploy3/"
category: "React"
tags:
- "AWS"
description: "MongoDB를 사용하는 리액트 프로젝트를 AWS EC2를 이용해서 서버호스팅 받는 과정을 정리한 내용입니다."
---

<br>

## 리액트 서버 프로젝트(Backend)와 MongoDB 연결 방법

이번 포스팅에선 리액트 서버 프로젝트(Backend)와 AWS EC2 인스턴스의 MongoDB 연결 방법에 대해 알아보겠습니다.

흔히 말하는 백엔드쪽인 서버 프로젝트에서 MongoDB 연결을 합니다.

로컬 MongoDB로 연결되어 있던 주소를 AWS EC2 인스턴스의 Public Ip로 수정해주면 됩니다.

**.env**

```
PORT=4000
MONGO_URI='mongodb://id:pwd@id:port/db_name'
```

<br>

MongoDB 접속하는 코드들을 담고 있는 index.js 입니다.

**index.js**

``` JavaScript
require('dotenv').config();
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
import serve from 'koa-static';
import path from 'path';
import send from 'koa-send';

import api from './api';

const { PORT, MONGO_URI } = process.env;

mongoose
.connect(MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false })
  .then(() => {
      console.log('Connected to MongoDB');
  })
  .catch(e => {
      console.error(e);
  });

const app = new Koa();
const router = new Router();

// 라우터 설정
router.use('/api', api.routes()); // api 라우트 적용

// 라우터 적용 전에 bodyParser 적용
app.use(bodyParser());

// app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

const port = PORT || 4000;
app.listen(port, () => {
    console.log('Listening to port %d', port);
});
```

하면 DB 연결!!
