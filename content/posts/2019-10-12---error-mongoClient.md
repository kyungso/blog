---
title: "{ useUnifiedTopology: true } warning"
date: "2019-12-10T14:00:00.169Z"
template: "post"
draft: false
slug: "/posts/error-mongoClient/"
category: "Error"
tags:
- "error"
description: ""
---

<br>


(node:9048) DeprecationWarning: current Server Discovery and Monitoring engine is deprecated, and will be removed in a future version. To use the new Server Discover and Monitoring engine, pass option { useUnifiedTopology: true } to MongoClient.connect.
...


이렇게 MongoClient.connect에 대한 warning이 발생한다.

error는 아니라 처리 안할 수도 있지만, 왠지 하고 싶어서 해결했다.

해결 방법은 저 warning 문구 그대로 하면 해결된다.

mongoose.connect 처리한 곳의 파일에서

**src/index.js**

``` JavaScript
import mongoose from 'mongoose';
(...)

mongoose
.connect(process.env.MONGO_URI,
  { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false })
  .then(() => {
      console.log('Connected to MongoDB');
  })
  .catch(e => {
      console.error(e);
  });

(...)
```

`useUnifiedTopology: true` 부분을 추가해 주면 해결됩니다. 짠!
