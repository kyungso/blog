---
title: Gatsby + Github + Netlify 블로그 생성기 (방법)
date: "2019-05-10T14:00:00.169Z"
template: "post"
draft: false
slug: "/posts/gatsby-github-netlify-create-blog/"
category: "Blog"
tags:
- "Gatsby"
- "Blog"
- "How-to"
description: "It is the way how to make gatsby blog using github and netlify."
---
<br>

- [필요한 개발 환경](#필요한-개발-환경)
- [Gatsby 블로그 만드는 과정](#gatsby-블로그-만드는-과정)
- [Git repository 생성](#git-repository-생성)
- [Netlify 배포](#netlify-배포)

<br>

# 필요한 개발 환경  

### homebrew 설치

- 설치되어 있는 경우  
"brew -v" 로 버전 확인

<br>

- 설치되어 있지 않은 경우  
[https://brew.sh/](https://brew.sh/) 로 접속하여 설치

<br>
<br>

### Xcode Command Line Tools 설치

terminal을 열고  

```
xcode-select --install
```

<br>
<br>
<br>

### Node.js & npm 설치

위에 homebrew 설치가 되어 있어야한다.

```
brew update
brew install node
```

제대로 설치 되었는지 확인

```
node --version
npm --version
```
<br>
<br>

### Git 설치

[Install Git on macOS](https://www.atlassian.com/git/tutorials/install-git#mac-os-x)  
[Install Git on Windows](https://www.atlassian.com/git/tutorials/install-git#windows)  
[Install Git on Linux](https://www.atlassian.com/git/tutorials/install-git#linux)  

git 설치까지 적기엔 시간이 오래걸리므로...gatsby 문서 내에 있는 링크를 첨부한다.  

<br>
<br>

# Gatsby 블로그 만드는 과정

### Gatsby CLI 설치

```
npm install -g gatsby-cli
```

<br>
<br>

### Gatsby site 만들기

먼저, [Gatsby 테마](https://www.gatsbyjs.org/starters/?v=2) 여기서 마음에 드는 테마를 골라야 한다.

마음에 드는 테마 밑에 Github 로고를 클릭한다.  
![1_gastby-starter-github.jpg](/media/1_gastby-starter-github.jpg)
<br>

참고로 이 블로그의 테마는 gatsby-starter-lumen 이고, github 주소는 [https://github.com/alxshelepenok/gatsby-starter-lumen](https://github.com/alxshelepenok/gatsby-starter-lumen) 이다.

이제 terminal을 열고, 프로젝트가 저장되기를 원하는 경로로 이동한다.  
```
gatsby new blog https://github.com/alxshelepenok/gatsby-starter-lumen
```  
blog 대신 원하는 프로젝트 이름으로 적으면 된다.

그 다음, 사이트를 실행시키기 위해서 아래의 명령어를 입력한다.  

```
cd blog  
gatsby develop
```

http://localhost:8000 으로 접속한다면 성공!

<br>
<br>

## Git repository 생성

로컬에 생성된 프로젝트를 저장할 원격 저장소를 만들어 보자.  
[https://github.com/](https://github.com/) 에 접속하여 로그인을 한 후,   

![1_git-repository1.jpg](/media/1_git-repository1.jpg)   
<br>
<br>
<br>
<br>

![1_git-repository2.jpg](/media/1_git-repository2.jpg)   
<br>
<br>
<br>

Create repository 버튼을 누르면 원격저장소가 생성된 것이다.  

이제 terminal을 열고, blog 프로젝트 경로로 이동한다.  
나의 프로젝트 이름은 blog 이고, github 주소는 원격저장소 주소를 넣으면 된다.  

```
cd blog
git init
git remote add origin https://github.com/kingso/myBlog.git
git push origin master
```

이렇게 하면 프로젝트가 Github 저장소에도 저장이 된 것이다.  
이제 마지막으로 Netlify 배포를 해보자 !!

## Netlify 배포  

사이트를 쉽게 배포해주는 서비스인 netlify가 있다. 이제 terminal을 통해 gatsby develop을 계속 열어놓을 필요가 없다.  
Github repository를 이용해서 연동하는 방법을 알아보자.  

[https://www.netlify.com/](https://www.netlify.com/)  

Get started for free 버튼을 눌러 시작한다. GitHub로 연동할 것이므로 GitHub 계정으로 로그인한다.  

![1_netlify1.jpg](/media/1_netlify1.jpg)   
<br>
<br>
<br>
<br>

![1_netlify2.jpg](/media/1_netlify2.jpg)   
<br>
<br>
<br>
<br>

![1_netlify3.jpg](/media/1_netlify3.jpg)   
<br>
<br>
<br>
<br>

연동 후, 자동 빌드가 되고 배포가 된다 !!  
<br>
<br>

>**site name을 바꾸고 싶다면**  

![1_sitename1.jpg](/media/1_sitename1.jpg)   
<br>
<br>
<br>
<br>

![1_sitename2.jpg](/media/1_sitename2.jpg)   
<br>
<br>
<br>
<br>
<br>

### But! 내가 선택한 테마는 Deploy Fail이 되어 배포 실패가 되었다 !!! 왜?? Why???
<br>

Deploy Log를 보니   

![1_netlify4.jpg](/media/1_netlify4.jpg)   

[https://www.gatsbyjs.org/packages/gatsby-plugin-sitemap/#how-to-use](https://www.gatsbyjs.org/packages/gatsby-plugin-sitemap/#how-to-use)  

위의 링크로 이동하여, 바로 해결할 수 있었다. gatsby-plugin-sitemap 사용할 때, 최소한의 설정으로 siteUrl이 필요하다는 것이다.  

gatsbt-config.js 파일에서   

![1_siteUrl1.jpg](/media/1_siteUrl1.jpg)   

![1_siteUrl2.jpg](/media/1_siteUrl2.jpg)   

이 두 부분을 수정한다.  

**참고로, 파일이 변경되었을 경우 원격저장소에 push를 해줘야 netlify가 연동되어 재빌드,배포를 한다.**    

```
git add .
git commit -m "commit message"
git push origin master
```

push를 하면, netlify가 자동으로 빌드하여 재배포를 시도한다. 성공!!! 끝이다!!!

<br>
<br>

이제 자기가 원하는 대로 커스텀하거나 포스트를 작성하면 된다.  
이것이 나의 첫번째 포스트이다.  
아직 블로그를 수정해야할 부분이 아직 많지만, 포스트를 작성하면서 수정할 계획이다.  

<br>
<br>

*[Gatsby-tutorial](https://www.gatsbyjs.org/tutorial/part-zero/)*  

*[gatsby-starter-lumen](https://github.com/alxshelepenok/gatsby-starter-lumen)*
