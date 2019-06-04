---
title: [Swift] Initializer(생성자)  
date: "2019-05-22T14:00:00.169Z"  
template: "post"  
draft: false  
slug: "/posts/swift-initializer/"  
category: "iOS"  
tags:  
- "iOS"  
- "Swift"  
- "Initializer"  
description: ""  
---

# Initializer



## Designated init

클래스에 반드시 1개 이상 필요한 초기화 이니셜라이저.  

이 init은 클래스의 모든 프로퍼티가 초기화 될 수 있어야한다.





## convenienct init

단독으로 모든 프로퍼티를 초기화할 수 없고, 일부 프로퍼티만 처리한 뒤 다른 Initializer를 이용해서 전체 초기화를 수행하는 보조 이니셜라이저

클래스의 Designated init을 도와주는 역할을 한다.

Designated init의 파라미터 중 일부를 기본값으로 설정해서, 이 convenience init안에서 Designated init을 호출하여 초기화를 진행할 수 있다.

**그러니 convenience init을 사용하려면 Designated init이 꼭 먼저 선언되어야 한다.**

또한, Swift의 이니셜라이저 규칙이 중,

"convenience init은 같은 클래스에서 다른 이니셜라이저를 호출해야 한다." 라는 규칙이 있다.

아래에서 다시 자세히 살펴보자.

—> 내생각은 convenience init은   

1) superclass의 required된 init을 그대로 파라미터까지 override한 subclass의 required convenience init에서

subclass의 프로퍼티들로 만들어놓은 init을 호출할 수 있게 해주는 기능.



2) convenience init은 무조건 자신의 class designated init(self.init)을 호출한다.

- required convenience init 은 superclass required init 이랑 파라미터까지 동일
- convenience init은 subclass만의 프로퍼티를 가지고 init 만들 때 사용



### Initializer Chaining (이니셜라이저 연쇄)

Designated init와 Convenience init의 관계를 간단하게 하기 위해  Swift는 다음 세가지 규칙을 적용했다.

- 규칙 1. Designated init은 직접 관련있는 슈퍼클래스로부터 Designated init을 호출해야 한다.
- 규칙 2. Convenience init은 같은 클래스에서 다른 init을 호출해야 한다.
- 규칙 3. Convenience init은 Designated init으로 끝맺어야 한다.

간단하게 다음 사항을 기억하면 된다.

- Designated init은 항상 위로 위임을 한다.
- Convenience init은 항상 가로질러 위임한다.
