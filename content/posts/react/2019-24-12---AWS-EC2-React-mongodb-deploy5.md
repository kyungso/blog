---
title: "(React + MongoDB), AWS 배포 - React 백그라운드 실행 (5)"
date: "2019-12-24T14:00:00.169Z"
template: "post"
draft: false
slug: "/posts/react/AWS-EC2-React-mongodb-deploy5/"
category: "React"
tags:
- "AWS"
description: "How to start React Application in background mode on Linux"
---

<br>

> [(React + MongoDB), AWS 배포 - EC2를 이용해서 서버호스팅 받기 (1)](https://kingso.netlify.com/posts/AWS-EC2-React-mongodb-deploy1/)
> 위의 포스팅을 보면 Ubuntu Server로 생성했습니다.

<br>

## 백그라운드 실행

앞에 1탄, 2탄, 3탄, 4탄까지 성공하면, 인스턴스의 퍼블릭 IP로 서버호스팅을 받았기 때문에 외부 접속이 가능합니다.

같은 와이파이 환경이 아닌, 휴대폰 데이터인 상태에서 퍼블릭 IP로 접속해보면 애플리케이션이 잘 보일 것입니다.

하지만, 한 가지 문제점이 있습니다.

인스턴스에 SSH 접속해서 '백엔드 서버(4000 포트)'와 '프론트엔드 서버(3000 포트)'를 각각 실행시켜주어야 애플리케이션을 성공적으로 볼 수 있다는 것입니다.

`yarn start` 로 각각 실행시켜줘야 했던 부분을, pm2를 통해 두 개의 서버를 백그라운드로 실행할 것입니다.

##### pm2란?

**PM2는 Process Manager** 의 약자로 노드 프로세스를 관리해주는 역할을 한다.

보통 서버에 데몬 형태의 application을 개발하게 되면, application에서 남기는 로그에 대한 처리(filesystem을 이용해서 남기는 방법, 날짜 포함, rotate etc), 프로세스가 죽었을 때에 대한 처리(restart), 부팅 시에 자동 실행 등 무수히 많은 것들이 있다. 이런 귀찮은 것들을 몽땅 관리해주는 것이 PM2이다. (물론 노드 프로젝트만)

<br>

#### pm2 설치

`npm install pm2 -g`

> -g 옵션은 글로벌 세팅으로, 어떤 디렉터리에서건 사용할 수 있다.

<br>

#### 서버 실행

##### 백엔드 서버 실행 (4000 포트)

`$ pm2 start npm -- start`

##### 프론트엔드 서버 실행 (3000 포트)

`$ pm2 start node_modules/react-scripts/scripts/start.js`

<br>

> 참고) `$ pm2 start node_modules/react-scripts/scripts/start.js --name "myapp"` --name 옵션을 통해 프로세스의 이름을 "myapp"으로 정해줄 수 있습니다. 따로 --name 옵션을 사용하지 않는다면 숫자로 프로세스가 추가됩니다.

<br>

#### pm2 리스트 보기

`$ pm2 list`

혹은

`$ pm2 ps`

pm2 프로세스 리스트를 볼 수 있습니다.

<br>

#### pm2 로그 보기

`$ pm2 logs`

현재 pm2에서 관리하는 서버의 로그를 실시간으로 확인

<br>

#### 프로세스 종료

`$ pm2 stop (서버 이름)`

종료시키고자 하는 프로세스의 ID를 pm2 list에서 확인해 인자로 넣어주면 됩니다.

<br>

#### 프로세스 삭제

`$ pm2 delete (서버 이름)`

원하는 서버를 제거할 수 있습니다.

<br>

이제 pm2 리스트에 2개의 프로세스가 떠 있는 것을 확인한 후, 외부 접속을 해보면 애플리케이션이 잘 보일 것입니다. 각각 실행시켜주지 않아도 말이죠. 끝!

<br>
<br>

참고 :
- https://stackoverflow.com/questions/51512924/how-to-start-react-js-application-in-background-mode-on-linux
