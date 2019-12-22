---
title: "(React + MongoDB), AWS 배포 - EC2를 이용해서 서버호스팅 받기 (1)"
date: "2019-12-19T14:00:00.169Z"
template: "post"
draft: false
slug: "/posts/AWS-EC2-React-mongodb-deploy1/"
category: "React"
tags:
- "AWS"
description: "MongoDB를 사용하는 리액트 프로젝트를 AWS EC2를 이용해서 서버호스팅 받는 과정을 정리한 내용입니다."
---

<br>

## AWS EC2 인스턴스 만들기

AWS 홈페이지에 들어가서, 계정이 있으시다면 로그인을 하시고 없으시다면 만드셔서 로그인 해주세요.

https://aws.amazon.com/ko/

![AWS_EC2_1.jpg](/media/AWS_EC2_1.jpg)  

로그인 후, 헤더 왼쪽에 서비스 버튼을 눌러주세요.

![AWS_EC2_2.jpg](/media/AWS_EC2_2.jpg)

인스턴스 시작 버튼을 눌러주세요.

![AWS_EC2_3.jpg](/media/AWS_EC2_3.jpg)

저는 Ubuntu 18.04를 선택했습니다.

![AWS_EC2_4.jpg](/media/AWS_EC2_4.jpg)

인스턴스 유형은 기본으로 선택되어 있는 것으로 '다음:인스턴스 세부 정보 구성'을 클릭합니다.

![AWS_EC2_5.jpg](/media/AWS_EC2_5.jpg)

인스턴스 세부 정보는 디폴트로 설정된 값을 그대로 놔두고, '다음'을 눌러주세요.

단계 4, 단계 5도 계속 '다음' 버튼을 눌러주세요.

![AWS_EC2_6.jpg](/media/AWS_EC2_6.jpg)

단계 6: 보안 그룹 설정을 합니다. '규칙 추가' 버튼을 클릭해서, 기본으로 설정되어 있는 SSH 이외에 HTTP, HTTPS를 추가했습니다.

저는 NodeJS 서버 포트를 4000번으로 열어놨기 때문에 '사용자 지정 TCP 규칙'을 선택해서 4000번을 설정해주었습니다.

![AWS_EC2_7.jpg](/media/AWS_EC2_7.jpg)

단계 7: 인스턴스 시작 검토 후, '시작하기' 버튼을 눌러주세요.

다음으로는 키페어 생성하기가 나타나는데,

기존에 AWS를 사용해본적이 있어서 키페어를 생성해서 '프라이빗 키 파일(\*.pem 파일)'을 가지고 있다면, '기존 키 페어 선택'을 선택하고 '인스턴스 시작'을 누릅니다.

![AWS_EC2_8.jpg](/media/AWS_EC2_8.jpg)

'프라이빗 키 파일(\*.pem 파일)'을 가지고 있지 않다면, '새 키 페어 생성'을 선택, 키 페어 이름을 원하는 이름으로 설정한 후, 꼭! '키 페어 다운로드'를 클릭해주세요. 마찬가지로 '인스턴스 시작'을 눌러주세요.

![AWS_EC2_9.jpg](/media/AWS_EC2_9.jpg)

![AWS_EC2_10.jpg](/media/AWS_EC2_10.jpg)

인스턴스가 생성되었습니다. '인스턴스 보기'를 선택해서 인스턴스를 관리할 수 있습니다.

다음 포스팅에서, 인스턴스에 연결하여 NodeJS와 mongoDB를 설치하는 방법에 대해서 다루겠습니다.
