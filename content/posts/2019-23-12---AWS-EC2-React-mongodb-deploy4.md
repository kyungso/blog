---
title: "(React + MongoDB), AWS 배포 - Nginx로 프록시 서버 만들기 (4)"
date: "2019-12-23T14:00:00.169Z"
template: "post"
draft: false
slug: "/posts/AWS-EC2-React-mongodb-deploy4/"
category: "React"
tags:
- "AWS"
description: "Nginx로 프록시 서버 만들기"
---

<br>

## Nginx로 프록시 서버 만들기

### 1. Nginx 설치

`sudo apt-get install nginx`

EC2 인스턴스의 'IPv4 퍼블릭 IP'로 들어갔을 때, nginx 기본 페이지가 나온다면 정상적으로 설치 완료된 것입니다.

<br>

> 만약 나오지 않는다면, 인바운드 정책을 수정하지 않았기 때문입니다.
> nginx의 기본 80 포트를 인바운드 정책에 추가해주어야 합니다.

**인바운드 정책 수정**

![AWS_EC2_4_1.jpg](/media/AWS_EC2_4_1.jpg)

네트워크 및 보안의 '보안 그룹' --> '인바운드' --> '편집' 순으로 클릭 후, nginx 기본 포트인 80을 추가해줍니다.

<br>

> 그래도 보이지 않는다면, nginx가 실행되고 확인하신 후 `sudo service nginx start` 명령어를 실행해주세요.

<br>
<br>

### 2. 프로젝트 clone

실행하고자 하는 **리액트 프로젝트** 를 clone 하겠습니다.

`git clone 'your repository url'`

`cd /yourProject`

`npm install`

<br>


### 3. 프록시 서버 만들기

Nginx가 성공적으로 설치되었다면, /etc/nginx 디렉터리가 있을 것입니다.

`cd /etc/nginx`

<br>

#### Nginx의 디렉터리 설명

- /etc/nginx : 해당 디렉터리는 Nginx를 설정하는 디렉터리입니다. 모든 설정을 이 디렉터리 안에서 합니다.

- /etc/nginx/nginx.conf : Nginx의 메인 설정 파일로 Nginx의 글로벌 설정을 수정할 수 있습니다.

- /etc/nginx/sites-available : 해당 디렉터리에서 프록시 설정 및 어떻게 요청을 처리해야 할지에 대해 설정할 수 있습니다.

- /etc/nginx/sites-enabled : 해당 디렉터리는 sites-available 디렉터리에서 연결된 파일들이 존재하는 곳입니다. 이 곳에 디렉터리와 연결이 되어 있어야 nginx가 프록시 설정을 적용합니다.

- /etc/nginx/snippets : sites-available 디렉터리에 있는 파일들에 공통적으로 포함될 수 있는 설정들을 정의할 수 있는 디렉터리입니다.

<br>

이제 /etc/nginx/sites-available로 이동해 프록시 설정을 하겠습니다.

`cd /etc/nginx/sites-available`

`default` 파일이 기본적으로 있어 거기에 코드를 추가해도 되지만, `node-server`라는 새로운 파일을 만들어 'sites-enabled'에 링크를 연결해주겠습니다.

바로 위에 설명처럼 'sites-enabled'에 디렉터리와 연결이 되어 있어야 nginx가 프록시 설정을 적용합니다.

<br>

##### 1) 새로운 설정 파일 생성

`sudo vi node-server`

아래의 내용을 입력해주세요.

```
server {
  listen 80;
  server_name {your_server_ip};

  location / {
       proxy_pass http://127.0.0.1:3000;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
  }
}
```

your_server_ip 부분을 43.140.243.244로 예를 들면,
클라이언트가 43.140.243.244:80 주소로 요청하면 현재 서버에서 실행되고 있는 http://127.0.0.1:3000으로 클라이언트의 요청을 넘겨준다는 의미입니다.

<br>

##### 2) 'sites-enabled'에 링크를 연결

`sudo ln -s /etc/nginx/sites-available/node-server /etc/nginx/sites-enabled/`

/etc/nginx/sites-enabled 경로로 이동해서 확인해보면 연결된 것을 볼 수 있습니다.

`cd /etc/nginx/sites-enabled`

`ls -al`

<br>

##### 3) nginx 서버 재시작

`sudo service nginx restart`

크롬에 해당 서버 ip 주소를 들어가보면 프록시가 잘 적용됬는지 확인할 수 있습니다.

`43.140.243.244:3000`

`43.140.243.244`

두 주소 모두 동일한 화면이 보이면 성공!

<br>
<br>

참고 :
- https://velog.io/@jeff0720/2018-11-18-2111-%EC%9E%91%EC%84%B1%EB%90%A8-iojomvsf0n
