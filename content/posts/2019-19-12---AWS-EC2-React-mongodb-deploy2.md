---
title: "(React + MongoDB), AWS 배포 - Nodejs와 MongoDB 설치하기 (2)"
date: "2019-12-19T14:00:00.169Z"
template: "post"
draft: false
slug: "/posts/AWS-EC2-React-mongodb-deploy2/"
category: "React"
tags:
- "AWS"
description: "MongoDB를 사용하는 리액트 프로젝트를 AWS EC2를 이용해서 서버호스팅 받는 과정을 정리한 내용입니다."
---

<br>

## Nodejs와 MongoDB 설치하기

먼저, 연결한 인스턴스를 선택한 후, '연결' 버튼을 클릭해주세요.

![AWS_EC2_2_1.jpg](/media/AWS_EC2_2_1.jpg)  

'연결' 버튼을 누르면 아래와 같이 액세스 방법을 친절하게 알려줍니다.

![AWS_EC2_2_2.jpg](/media/AWS_EC2_2_2.jpg)  

친절한 인스턴스 액세스 방법을 따라 차례대로 실행해봅니다.

> 참고로 저는 맥북을 사용하므로 터미널로 해당 명령어를 실행합니다.
> 다른 OS를 사용하지는 분들은 액세스 방법에서 알려주는 PuTTY를 사용하시면 됩니다.

ssh -i "test.pem" ~ 마지막 가장 긴 명령어를 입력한 후, 'yes'를 입력하면 접속이 됩니다.

<br>

### NodeJS 설치

저는 NodeJS 버전 12.x를 설치하겠습니다.

다음 사이트에서 OS별, NodeJS 버전을 확인하시고 원하는 버전을 설치하시기 바랍니다.

https://github.com/nodesource/distributions/blob/master/README.md

`curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -`

다음 명령어를 실행한 결과를 보면, 다음으로 칠 명령어를 알려줍니다.

`sudo apt-get install -y nodejs`

npm 패키지를 설치해도 되고, yarn 패키지를 설치해도 되지만 전 둘다 설치하겠습니다.

**npm 패키지 설치**

`sudo apt-get install npm`

**yarn 패키지 설치**

`curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -`

`echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list`

`sudo apt-get update && sudo apt-get install yarn`

터미널에 `node -v`를 쳐서 버전이 나온다면, 이제 NodeJS 설치 완료되었습니다.

다음으로 JavaScript 런타임 Node.js의 프로세스 관리자인 pm2를 추가로 설치하겠습니다.

`sudo npm install -g pm2`

<br>

### MongoDB 설치

[mongoDB 사이트](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)에 들어가서 원하는 버전을 선택합니다.

![AWS_EC2_2_3.jpg](/media/AWS_EC2_2_3.jpg)

2019.12.19 기준으로, 현재는 4.2 버전이 최신 버전이지만 저는 기존에 로컬에서 사용하던 버전과 동일하게 4.0 버전을 설치하겠습니다.

위 사진처럼 자신에게 맞는 환경을 선택한다면, 설치 방법이 다 나옵니다. 그대로 명령어를 실행해 주면 됩니다.

![AWS_EC2_2_4.jpg](/media/AWS_EC2_2_4.jpg)

공개키를 불러옵니다.

`wget -qO - https://www.mongodb.org/static/pgp/server-4.0.asc | sudo apt-key add -`

![AWS_EC2_2_5.jpg](/media/AWS_EC2_2_5.jpg)

MongoDB 리스트 파일을 생성합니다.

`echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.0.list`

![AWS_EC2_2_6.jpg](/media/AWS_EC2_2_6.jpg)

로컬 패키지 데이터베이스를 리로드합니다.

`sudo apt-get update`

![AWS_EC2_2_7.jpg](/media/AWS_EC2_2_7.jpg)

MongoDB 패키지를 설치합니다.

`sudo apt-get install -y mongodb-org=4.0.14 mongodb-org-server=4.0.14 mongodb-org-shell=4.0.14 mongodb-org-mongos=4.0.14 mongodb-org-tools=4.0.14`

선택적인 것이지만, 의도하지 않은 버전 업그레이드가 발생할 수 있으므로, 아래의 명령어를 사용하여 현재 설치된 4.0 패키지 버전으로 고정할 수 있습니다.

```
echo "mongodb-org hold" | sudo dpkg --set-selections
echo "mongodb-org-server hold" | sudo dpkg --set-selections
echo "mongodb-org-shell hold" | sudo dpkg --set-selections
echo "mongodb-org-mongos hold" | sudo dpkg --set-selections
echo "mongodb-org-tools hold" | sudo dpkg --set-selections
```

설치가 완료되었습니다. 확인으로 `mongo --version`을 쳐서 버전이 잘 나오는지 확인합니다.

<br>

#### MongoDB 실행

`sudo service mongod start`

MongoDB가 성공적으로 시작되었는지 확인하기 위해서 아래 명령어를 실행합니다.

`sudo service mongod status`

초록색으로 'active (running)'이 보인다면 잘 실행되고 있는 것입니다.

`mongo`

'mongo' 명령어를 사용해서 MongoDB shell을 실행할 수 있습니다.

shell 에서 관리자 계정 생성 및 권한 추가를 할 것입니다.

`use admin`

`db.createUser({ user: "username", pwd: "password", roles: ["userAdminAnyDatabase", "dbAdminAnyDatabase", "readWriteAnyDatabase"] })`

> 참고) 관리자/사용자 계정 삭제 명령어
> db.dropUser("username")

관리자 계정이 생성되었습니다.

추가로 사용자 계정이나 다른 계정을 생성하고 권한에 대해 알고싶으시다면, 구글에 찾아보시면 많은 정보를 얻으실 수 있습니다.

<br>

#### MongoDB config 변경

외부 접속을 위한 bindIp, 인증된 사용자만 사용할 수 있도록 하기 위한 security 설정을 변경하기 위해 config 파일을 수정합니다.

저의 포스팅 방법대로 설치를 하셨다면, 보통 '/etc/mongod.conf'에 위치합니다.

`sudo vi /etc/mongod.conf`

```
# mongod.conf
...

# network interfaces
net:
  port: 27017
  bindIp: 0.0.0.0

...

security:
  authorization: 'enabled'

...
```

> 'esc' 누른 후, ':wq' 입력하면 저장됩니다.

수정을 완료한 후, MongoDB를 재실행합니다.

`sudo service mongod restart`

이제 Mongo Shell로 접속해서 database를 보려고 하면 에러 메세지가 출력되거나, 아무것도 볼 수 없게 됩니다.

Security 설정을 했기 때문에, 인증되지 않은 사용자는 볼 수 없는 것이지요.

이제부터는 MongoDB shell을 사용할 때는 계정 정보와 함께 입력해야 합니다.

`mongo -u id -p password`

이렇게 계정 정보와 함께 접속한다면 데이터베이스에 접근할 수 있습니다.

<br>

#### AWS EC2 인바운드 정책 수정

외부에서 EC2 인스턴스의 특정 포트에 접속하기 위해서 인바인드 정책을 수정합니다.

![AWS_EC2_2_8.jpg](/media/AWS_EC2_2_8.jpg)

네트워크 및 보안의 '보안 그룹' --> '인바운드' --> '편집' 순으로 클릭 후, MongoDB 기본 포트인 27017을 추가해줍니다.

<br>

### MongoDB 외부 접속 확인 방법

#### 1) MongoDB Compass을 이용한 외부 접속

[MongoDB Compass 설치](https://docs.ncloud.com/ko/database/database-10-5.html) 를 참조해서 설치하면 됩니다.

![AWS_EC2_2_10.jpg](/media/AWS_EC2_2_10.jpg)

'Fill in connection fields individually'를 선택해서 직접 ip와 id, password를 입력해서 접속합니다.

![AWS_EC2_2_11.jpg](/media/AWS_EC2_2_11.jpg)

설치 후, public IP와 id, password를 입력해서 접속이 된다면 성공적입니다!!


#### 2) public IP:27017로 접속

![AWS_EC2_2_9.jpg](/media/AWS_EC2_2_9.jpg)

위처럼 접속했을 때, `It looks like you are trying to access MongoDB over HTTP on the native driver port.` 이런 메세지가 나온다면 MongoDB 서버가 잘 실행되고 있는 것이다. HTTP를 통해서 MongoDB에 접근하려는 것 같다는 뜻입니다.

<br>

이 포스팅에선 NodeJS와 MongoDB 설치 방법을 알아봤습니다.
다음 포스팅에선 리액트 서버 프로젝트(Backend)과 AWS EC2 인스턴스의 MongoDB 연결 방법에 대해 알아보겠습니다.
