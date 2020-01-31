---
title: "(Error) WebSocket connection failed. Error during WebSocket handshake - socketjs"
date: "2019-12-23T14:00:00.169Z"
template: "post"
draft: false
slug: "/posts/React-WebSocket-Error/"
category: "Error"
tags:
- "error"
description: "Nginx 프록시 서버 설정 시, 에러"
---

<br>

## Nginx 프록시 서버 설정 시, WebSocket 에러

구글 검색하면 나오는 많은 Nginx 프록시 설정 예시를 따라해보면서 다음과 같은 에러를 만났습니다.

`WebSocket connection to 'ws://192.168.33.10/sockjs-node/301/eo4p2zps/websocket' failed: Error during WebSocket handshake: Unexpected response code: 404`


`The development server has disconnected. Refresh the page if necessary.`

### 해결 방법

```
server {
  listen 80;
  server_name localhost;

  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}
```

Host, Connection, Upgrade 설정으로 변경하면 위의 2개 에러가 사라집니다.
