---
title: View Controller Catalog
date: "2019-05-24T14:00:00.169Z"
template: "post"
draft: false
slug: "/posts/boostcourse-view-controller/"
category: "부스트코스"
tags:
- "부스트코스"
- "iOS"
- "View Controller"
description: ""
---

```html
View Controller Catalog for iOS 첫 번째 읽기 리스트입니다.
```

[원문 링크](https://developer.apple.com/library/archive/documentation/WindowsViews/Conceptual/ViewControllerCatalog/Introduction.html)
<br>

### Index

[1. Navigation Controllers](#navigation-controllers)

[2. Customizing the Navigation Bar Appearance](#) (네비게이션 바를 커스텀 하는 방법)

[3. Displaying a Navigation Toolbar](#) (툴바를 커스텀 하는 방법)

<br>

## Introduction
View controller는 뷰 계층 구조를 관리하거나 표현하게 해줍니다.
UIKit framework는 iOS에서 흔하게 많이 사용되는 사용자 상호작용 어법들인 View Controller class를 포함하고 있습니다.
view controller를 커스텀할 때 사용할 수 있습니다. 이 문서는 UIKit framework에서 제공되는 view controller를 사용하는 방법을 설명하고 있습니다.

<br>
<br>

## Navigation Controllers

navigation controller는 계층적인 내용을 더 깊게 자세히 파고들 수 있는 인터페이스를 제공하는 view controller의 스택을 다룹니다. navigation controller는 뷰 계층구조를 스스로 포함하고 있습니다. navigation controller는 직접적으로 처리하는 뷰와 커스텀된 content view controller에 의해 처리되는 뷰로 구성됩니다. 각각의 content view controller는 별개의 뷰 계층구조를 처리하고, navigation controller는 이러한 뷰 계층구조 사이의 네비게이션을 조정합니다.

비록 네이게이션 인터페이스는 커스텀된 내용의 대부분으로 구성되지만, 코드는 navigation controller 오브젝트와 직접적으로 상호작용 되야합니다. navigation controller를 새로운 뷰를 나타낼 때 사용하고, 사용자 기기의 스크린 가장 위쪽에 위치하는 네비게이션 바를 구성해야 합니다. 또한, navigation controller의 툴바를 사용해 아이템들을 제공할 수도 있습니다.
<br>

#### [ Anatomy of a Navigation Interface ]
Navigation Controller의 주된 역할과 Navigation interface의 구조에 관한 내용입니다.
navigation controller의 주요 하는 일은 컨텐트 view controller의 표현을 처리하는 것입니다. 그리고 그 컨텐트 view controller는 커스텀된 뷰들의 표현도 처리해야 합니다. 특히, 커스텀하고 싶은 뒤로가기 버튼이나 몇몇 버튼을 포함하는 네이게이션 바를 표현합니다. 또한, navigation controller는 선택적으로 navigation toolbar를 사용하거나 커스텀 버튼들로 채울 수 있습니다.

<br>

![boot_view_1.jpg](/media/boot_view_1.jpg)   

<br>

navigation bar와 toolbar가 사용자가 원하는 뷰로 설정 가능하지만, 네비게이션 계층구조의 뷰들을 직접적으로 수정해서는 절대 안된다. 이 뷰들은 오직 UINavigationController, UIViewController 클래스의 메서드를 통해 커스터마이즈 할 수 있다.

<br>

#### [ The Objects of a Navigation Interfaces ]

Navigation Controller가 Navigation Interface를 구현하기 위해 사용하는 객체에 관한 내용입니다.
navigation controller는 네비게이션 인터페이스를 구현하는 몇 개의 오브젝트를 사용합니다. navigation controller 그 자체가 만든 오브젝트를 제공해야하고, 특히 나타내고자 하는 내용을 담은 view controller를 제공해야 합니다. navigation controller로부터 알림을 받고 싶다면 **delegate object** 를 사용할 수 있습니다.

<br>

![boot_view_2.jpg](/media/boot_view_2.jpg)   

<br>

navigation controller에 관련된 navigation bar, toolbar 오브젝트는 외관으로 보여지는 것(appearance)과 동작하는 것(behavior)만 커스텀할 수 있습니다. navigation controller는 혼자 앞에 말했던 것들을 설정하고 나타내야 합니다. 게다가 navigation controller 오브젝트는 자동으로 UINavigationBar의 delegate를 자기자신에게 할당하고, 다른 오브젝트들이 그 관계 변경하지 못하도록 합니다.

navigation stack에 있는 delegate와 다른 view controller들을 수정할 수 있고, navigation stack은 기존 stack 특성과 같은 LIFO(last-in, first-out) 입니다. stack에 처음 추가된 item은 *root view controller* 가 되고, 절대 갑자기 사라지지 않습니다. 계속해서 추가되는 item들은 UINavigationController 클래스의 메서드를 사용해서 stack에 추가할 수 있습니다.

<br>

![boot_view_3.jpg](/media/boot_view_3.jpg)

<br>

위의 그림을 보면 topViewController와 visibleViewController가 맨 앞의 같은 view controller를 가르키고 있습니다. 하지만 topViewController와 visibleViewController는 반드시 같은 것은 아닙니다. 예를 들어, 하나의 view controller를 모달창으로 나타낸다면, visibleViewController은 모달 view controller를 가르킬 것이고, topViewController는 변하지 않을 것입니다.
<br>
> 모달(Modal)이란?
> 모달은 집중해야 하는 화면을 다른 화면 위로 띄워 표현하는 방식입니다. 쉽게 말해 부모창에서 자식창을 모달로 띄우면 모달창을 닫기 전엔 부모창 제어가 안돼죠.

<br>

navigation controller의 주요 책임은 새로운 content view controller를 stack에 push해주거나 content view controller를 stack에서 pop하는 사용자 액션에 응답해 주는 것입니다. navigation stack에 push되는 각 view controller는 앱의 데이터의 일부를 표현해야 합니다.
일반적으로 사용자가 현재 보여지는 뷰 안의 하나의 item을 선택했을 때, 그 item의 더 자세한 정보를 가지고 있는 view controller를 설정하고, navigation stack에 push 해야 합니다. 예를 들면, 사용자가 'Photos' 앱 안의 어떤 하나의 photo album을 선택했을 때, 그 앱은 선택한 앨범의 사진들을 나타내는 view controller도 push 해야 합니다.

이러한 프로세스는 각 stack 안에 있는 content view controller가 설정하고, stack의 맨 상단에 있는 content view controller를 push하는 단순한 디자인 패턴을 따릅니다. 특정한 클래스의 인스턴스로 stack에 push되는 view controller를 만드는 것은 피해야 합니다.

**view controller를 pop 하면서 데이터를 스택 아래로 전달하려면, stack에서 그것보다 더 낮은 view controller를 그것 위의 view controller의 delegate로 설정합니다.**
<br>

> 내 생각을 적어보자면 맨 위 = 맨 앞, 맨 아래 = 맨 뒤라고 생각하면, main view controller가 있고, 그 위에 login view controller가 pop 되었다고 생각하면, login view controller가 맨 앞에 있고, main view controller가 뒤에 있습니다. 그래서 login view controller에서 처리하는 아이디, 비밀번호 등 데이터를 main view controller로 전달하려면, main view controller를 login view controller의 delegate로 설정하는 것입니다.

<br>

#### [ Creating a Navigation Interfaces ]

Navigation Interface를 생성할 때 유의할 점과 생성하기 위한 방법에 관한 내용입니다.
navigation interface를 생성할 때, navigation interface를 어떻게 사용할 것인지 결정해야 합니다. 사용 방법은 데이터의 포괄적인 구성에 영향을 미치기 때문에 아래와 같은 특정한 방법으로만 사용해야 합니다.
```
- 화면(window)의 root view controller에 직접적으로 설치해라

- tab bar interface 안의 tab의 view controller로 설치해라

- split view interface 안의 two root view controller 중 하나에 설치해라(iPad only)

- 또다른 view controller로부터 madal로 표현해라

- popover로 나타내라(iPad only)
```
<br>

> Note: [how to present a navigation controller modally](#Displaying-a-Navigation-Controller-Modally)

<br>

**1\) Defining the Content View Controllers for a Navigation Interface**

모든 navigation interface는 root level data를 대표로 가집니다. 이 level은 interface의 시작점입니다. 예를 들면, 'Photos' 앱은 root level로 가능한 photo 앨범 리스트를 나타냅니다. 사진 앨범 하나를 선택하면 그 앨범의 사진들이 보일 것이고, 그 사진들 중 하나를 선택하면 그 사진을 더 크게 볼 수 있습니다.

<br>

![boot_view_4.jpg](/media/boot_view_4.jpg)

<br>

다중 level의 프레젠테이션이 같다면, 같은 view controller class의 여러 개 instance들을 만들 수 있고, 각자 자신의 데이터 세트를 관리하도록 구성할 수 있습니다. 예를 들면, 위의 Figure 1-4 그림을 보면 'Photos' 앱은 3가지 다른 프레젠테이션 타입을 가지고 있으므로, 3개의 다른 view controller 클래스들을 사용할 필요가 있습니다.

각 content view controller는 사용자가 데이터 계층 구조의 다음 level로 조정할 수 있는 방법을 제공해야 합니다. (leaf data(자식 노드가 없는 노드)를 관리하는 view controller들은 제외)
<br>

> [View Controller Programming Guide for iOS](https://developer.apple.com/library/archive/featuredarticles/ViewControllerPGforiPhoneOS/index.html#//apple_ref/doc/uid/TP40007457)

<br>

**2\) Creating a Navigation Interface Using a Storyboard**

Xcode 프로젝트의 storyboard에서 생성하는 방법입니다. 아래의 순서대로 만들 수 있습니다.

```
- library(shift + command + L)로부터 navigation controller를 드래그한다.

- Interface builder는 navigation controller와 view controller를 생성하는데,
  새롭게 생성된 view controller를 navigation controller의 root view controller로
  식별되도록 관계를 만듭니다.

- 생성된 view controller의 attribute inspector로 가서 처음에 나타내고자 하는 view controller
  이름을 설정한다.
```

<br>

**3\) Creating a Navigation Interface Programmatically**

프로그래밍 방식으로 코드의 적절한 지점에 만드는 방법입니다.
예를 들면, navigation controller는 app window인 root view를 위해 delegate의 메서드인[applicationDidFinishLauching](https://developer.apple.com/documentation/uikit/uiapplicationdelegate/1623053-applicationdidfinishlaunching) 안에 생성할 수 있습니다.

아래의 방법을 따라야 합니다.

```
- navigation interface를 위해 root view controller를 생성해야 합니다.
  이것은 navigation stack 내의 top-level view controller이고, navigation bar에는
  뒤로가기 버튼이 나타나지 않습니다. 그리고 navigation stack에서 절대 pop 될 수 없습니다.

- navigation controller를 생성하고, initWithRootViewController 메서드를 사용하여 초기화 합니다.

- window의 root view controller로 navigation controller를 설정합니다.
```

<br>

#### [ Adapting a Full-Screen Layout for Navigation Views ]

View가 전체화면을 사용해야하는지 결정해야 할 때, Navigation Controller가 고려해야 할 사항과 설정방법에 관한 내용입니다.
사용자를 위한 navigation bar, status bar, toolbar가 아래로 가면서 content의 최대 화면을 볼 수 있게 해줍니다. 이것은 사진을 최대로 보거나 더 많은 공간을 원한다면 사용할 수 있습니다.

View가 전체화면을 사용해야하는지 결정해야 할 때, Navigation Controller가 고려해야 할 사항

```
- 전체 화면 크기의 경계를 채울 수 있는 사이즈의 화면이나 부모 뷰 입니까?

- 반투명(투명)하게 구성된 navigation bar 입니까?

- 반투명(투명)하게 구성된 navigation toolbar 입니까?

- 아래에 있는 view controller의 wantsFullScreenLayout 프로퍼티가 YES로 설정되어 있습니까?
```

앞의 목록에 있는 항목의 순서는 각 요소를 고려한 우선 순위도 반영합니다. 창 크기가 첫 번째 제한 요소입니다. 앱의 기본 창 (또는 모달로 제공되는 view controller의 경우에 포함된 parent view)이 화면을 확장하지 않으면, 그것을 포함한 뷰들 또한 수행할 수 없습니다.

**설정 방법**
```
1. custom view의 프레임에 fill the screen bounds로 설정

2. navigation bar를 밑으로 가게 하기 위해, navigation controller의 translucent 프로퍼티를
   YES로 설정

3. optional toolbar를 밑으로 가게 하기 위해, toolbar의 translucent 프로퍼티를 YES로 설정

4. status bar를 아래로 가게 하기 위해, 너의 view controller의 wantsFullScreenLayout 프로퍼티를
   YES로 설정
```

applicationFrame 프로퍼티가 아닌, UIScreen class의 프로퍼티인 bounds에 사이즈를 맞춰 설정해야 합니다.

<br>

#### [ Modifying the Navigation Stack ]

Navigation Controller 클래스가 제공하는 Navigation Stack을 관리하기 위한 옵션에 관한 내용

<br>

#### [ Monitoring Changes to the Navigation Stack ]

Navigation Stack에 있는 View Controller가 push 또는 pop이 되어 Navigation Stack이 변할 때 이루어지는 일련의 과정과 Navigation Controller가 보내는 메시지에 관한 내용

<br>

#### [ Customizing the Navigation Bar Appearance ]

Navigation Bar을 커스터마이징하는 방법에 관한 내용

<br>

#### [ Displaying a Navigation Toolbar ]

Toolbar를 표시하거나 숨기기 위한 설정방법과 Toolbar Item에 관한 내용

<br>
<br>
<br>

## Tab Bar Controllers

> Tab Bar Controller에 대한 소개 Tab Bar Controller의 뷰 계층구조(view hierarchy)에 관한 내용 Tab Bar Controller의 구성과 사용법에 관한 내용

- #### Anatomy of a Tab Bar Interface
Tab Bar Interface의 역할과 구성과 Tab Bar Controller의 역할에 관한 내용

- #### The Objects of a Tab Bar Interface
Tab Bar Interface를 구성하고 있는 객체들에 관한 내용

- #### Creating a Tab Bar Interface
Tab Bar Interface를 생성하기 전에 고려해야 할 사항과 Tab Bar Interface를 생성하기 위한 방법에 관한 내용

- #### Managing Tabs at Runtime
Tab Bar Interface 생성 후 Tab 관리에 관한 내용

- #### Tab Bar Controllers and View Rotation
Tab Bar Controller가 지원하는 화면 방향과 회전에 관한 내용

- #### Tab Bars and Full-Screen Layout
Tab Bar Controller가 지원하는 전체화면에 관한 내용과 관련 프로퍼티를 통한 설정방법

<br>
<br>
<br>

## Page View Controllers

> Page View Controller의 사용 목적 Page View Controller가 뷰 계층구초에 관한 내용

- #### Anatomy of a Page View Controller Interface
Page View Controller Interface 구성에 관한 내용

- #### The Objects of a Page View Controller Interface
Page View Interface를 구성하고 있는 객체에 관한 내용

- #### Creating a Page View Controller Interface
Page View Controller Interface를 생성할 수 있는 방법과 Initial View Controller를 세팅하는 방법에 관한 내용

- #### Customizing Behavior at initialization
초기화 시 Page View Controller를 커스터마이징 할 수 있는 방법에 관한 내용

- #### Customizing Behavior at Run Time with a Delegate
디바이스 방향이 바뀌고 유저가 새로운 페이지를 탐색할 때 Page View Controller의 델리게이트의 역할에 관한 내용

- #### Supplying Content by Providing a Data Source
Data Source를 제공하고 Gesture recognizer를 활용하는 방법에 관한 내용

- #### Supplying Content by Setting the Current View Controller
보여지고 있는 컨텐츠를 직접 제어하기 위한 방법에 관한 내용

- #### Special Consideration for Right-to-Left and Bottom-to-Top Content
left-to-right와 top-to-bottom식의 컨텐츠를 보여주기 위해 Page Controller View를 사용하는 방법에 관한 내용

<br>
<br>
<br>

## Split View Controllers

> Split View Controller의 역할에 관한 내용 Split View Interface의 Pane에 관한 내용

- #### Creating a Split View Controller Using a Storyboard
스토리보드에서 Split View Controller를 생성하는 방법에 관한 내용

- #### Creating a Split View Controller Programmatically
프로그래밍으로 Split View Controller를 생성하는 방법에 관한 내용

- #### Supporting Orientation Changes in a Split View
Split View Controller가 화면의 가로방향과 세로방향 지원에 관한 내용

<br>
<br>
<br>

## Popovers

> Popover의 역할과 사용되는 상황에 관한 내용 Modal View와의 비교에 대한 간략한 내용

- #### Creating and Presenting a Popover
Popover를 생성하고 표시하기 위한 방법에 관한 내용

- #### Implementing a Popover Delegate
Popover 델리게이트의 사용과 동작에 관한 내용

- #### Tips for Managing Popovers in Your App
Popover 관련있는 코드를 작성할 때 고려해야할 사항들에 관한 내용

<br>
<br>
<br>

## Combined View Controller Interfaces
> 여러 View Controller 결합하여 인터페이스를 생성할 때, View Controller의 결합순서 iOS에서 Table view, navigation, tab bar controller를 결합하는 방법에 대한 설명

- #### Adding a Navigation Controller to a Tab Bar Interface
Tab Bar Controller에 Navigation Controller를 결합시키는 방법(스토리보드와 프로그래밍)

- #### Displaying a Navigation Controller Modally (작성)
Navigation Controller를 Modal로 표시하기 위한 방법에 관한 내용

- #### Displaying a Tab Bar Controller Modally
Tab Bar Controller를 Modal로 표시하기 위한 방법에 관한 내용

- #### Using Table View Controllers in a Navigation Interface (작성)
Table View Controller를 Navigation Interface로 활용하는 방법에 관한 내용

<br>
<br>

#### Prerequisites

[1. View Controller Programming Guide for iOS](https://developer.apple.com/library/archive/featuredarticles/ViewControllerPGforiPhoneOS/index.html#//apple_ref/doc/uid/TP40007457)

[2. App Programming Guide for iOS](https://developer.apple.com/library/archive/documentation/iPhone/Conceptual/iPhoneOSProgrammingGuide/Introduction/Introduction.html#//apple_ref/doc/uid/TP40007072)
