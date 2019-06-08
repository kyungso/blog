---
title: "[iOS] 뷰 계층 (View hierarchy)"
date: "2019-06-04T14:00:00.169Z"  
template: "post"  
draft: false  
slug: "/posts/boostcourse-project1-View/"  
category: "부스트코스"  
tags:  
- "iOS"  
- "View hierarchy"
- "뷰 계층"
description: "뷰 계층 구조와 계층에 포함된 뷰가 어떻게 행동하는지, 뷰 계층을 생성하고 관리하는 방법을 알아봅시다."  
---


## 뷰의 기본적인 역할

iOS에서 화면에 애플리케이션의 콘텐츠를 나타내기 위해 윈도우와 뷰를 사용합니다. **윈도우는 그 자체로 콘텐츠를 표현할 수 없지만 애플리케이션의 뷰를 위한 컨테이너 역할** 을 합니다. 뷰는 UIView 클래스 또는 UIView 클래스의 하위클래스(Subclass)의 인스턴스로 윈도우의 한 영역에서 콘텐츠를 보여줍니다. **뷰가 나타낼 수 있는 콘텐츠는 이미지, 문자. 도형 등** 과 같이 다양합니다. 뷰는 또 다른 뷰를 관리하고 구성하기 위해 사용되기도 합니다.
뷰는 제스처 인식기(gesture recognizer)를 사용하거나 직접 터치 이벤트를 처리할 수 있습니다. 또한 뷰 계층(view hierarchy) 구조에서 부모뷰(parent view)는 자식뷰(child view)의 위치와 크기를 관리합니다.
나타내고자 하는 유형의 콘텐츠에 적합한 뷰를 여러 개 사용하여 뷰 계층(view hierarchy) 구조를 구성하고 이를 통해 콘텐츠를 보여주는 것이 좋습니다. 예를 들어 UIKit에는 이미지, 텍스트 그리고 다른 유형의 콘텐츠를 나타내는 뷰가 포함되어 있습니다.

<br>

## 뷰 계층 (View hierarchy)

#### 뷰 계층구조와 서브뷰 관리

뷰는 자신의 콘텐츠를 보여주는 것과 더불어, 다른 뷰를 위한 컨테이너로써의 역할도 합니다. 하나의 뷰가 다른 뷰를 포함할 때, 두 뷰 사이에 부모-자식 관계가 생성됩니다. 해당 관계에서 자식뷰는 서브뷰(subview)로, 부모뷰는 슈퍼뷰(superview)로 불려집니다. 부모-자식 관계 형성은 애플리케이션의 시각적 모습과 동작 모두에 영향을 미칩니다.

1. 슈퍼뷰와 서브뷰의 관계에서 서브뷰가 불투명할 경우, 슈퍼뷰가 서브뷰에 가려집니다.

2. 서브뷰가 반투명할 경우, 서브뷰와 슈퍼뷰의 콘텐츠가 서로 섞여 화면에 보여지게 됩니다.

3. 슈퍼뷰는 하나의 배열 안에 서브뷰를 순서대로 저장합니다. 만약 하나의 슈퍼뷰에 포함된 두 서브뷰가 서로 겹치게 되면, 나중에 추가된(또는 서브뷰 배열의 끝으로 옮겨진) 서브뷰가 맨 위에 보여지게 됩니다.

4. 두 서브뷰가 모두 반투명할 경우, 뒤에 있는 모든 뷰들이 섞여 화면에 보여지게 됩니다.

<br>

#### 뷰 계층의 생성과 관리

OS 애플리케이션에서 뷰 계층을 만드는 방법에는 인터페이스 빌더를 이용하는 방법과 코드를 작성하는 방법이 있습니다.
코드작성 방식을 사용할 경우 서브뷰를 부모뷰에 추가하기 위해, 부모뷰의 addSubView(_ : ) 메서드를 호출합니다. 이 메서드는 해당 서브뷰를 서브뷰 목록의 마지막에 추가합니다. 부모뷰의 서브뷰를 제거하기 위해서는 서브뷰의 removeFromSuperView() 메서드를 호출합니다. 이 외에도 서브뷰를 부모뷰 목록의 중간에 삽입하기 위해 insertSubview(_ :at:), 부모뷰 내에 이미 존재하는 서브뷰를 정렬하기 위해 bringSubView(toFront:), sendSubView(toBack:) 등의 메서드들을 호출할 수 있습니다.

<br>

#### 뷰의 좌표계

UIKit에서 기본이 되는 좌표계는 좌측 상단 모서리를 원점으로 하며, 원점으로부터 아래쪽, 오른쪽 방향으로 확장됩니다. 좌표값은 해상도와 상관없이 콘텐츠의 위치를 잡는 부동소수점을 사용하여 나타냅니다.

<br>

##### 프레임과 바운드

iOS의 좌표체계의 시작은 왼쪽 위부터 시작입니다. 즉, 제일 왼쪽의 제일 위의 지점이 (0,0) 입니다. 또, 수평축은 x로, 수직축은 y로 표현합니다.
뷰의 프레임(frame)은 뷰의 크기와 위치를 슈퍼뷰의 좌표계를 기준으로 나타냅니다. 바운드(bounds)는 뷰의 크기와 위치를 해당 뷰 자신의 좌표계를 기준으로 나타냅니다.

<br>
<br>

참고 링크

[1. 애플 공식 문서 - Windows and Views](https://developer.apple.com/library/archive/documentation/WindowsViews/Conceptual/ViewPG_iPhoneOS/Introduction/Introduction.html)

[2. 애플 공식 문서 - Creating and Managing a View Hierarchy](https://developer.apple.com/library/archive/documentation/WindowsViews/Conceptual/ViewPG_iPhoneOS/CreatingViews/CreatingViews.html#//apple_ref/doc/uid/TP40009503-CH5-SW47)

From [부스트코스 - iOS](https://www.edwith.org/boostcourse-ios/)
