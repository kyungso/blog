---
title: "[iOS] 오토레이아웃 (AutoLayout)"
date: "2019-06-03T14:00:00.169Z"  
template: "post"  
draft: false  
slug: "/posts/boostcourse-project1-AutoLayout/"  
category: "부스트코스"  
tags:  
- "iOS"  
- "AutoLayout"
description: ""  
---

<br>

*이전에는 하나의 사이즈였던 아이폰 기종이 이제는 iPhone4, iPhoneSE, iPhone8, iPhone8 Plus, iPhoneX 등 다양한 사이즈와 화면 비율로 출시 되면서, 사이즈에 구애받지 않고 시각적으로 동일한 화면을 구현해야하는데 이를 위한 가장 편리하고 권장되는 방법이 바로 오토레이아웃입니다. 오토레이아웃에 대해 알아보고, 코드로 오토레이아웃을 구현하는 방법인 NSLayoutConstraint와 Visual Format Language에 대해 알아봅시다*

<br>

- [오토레이아웃(AutoLayout)](#오토레이아웃(AutoLayout))

1. < 코드로 오토레이아웃 구현 >
- [NSLayoutConstraint](#NSLayoutConstraint)
- [Visual Format Language](#Visual-Format-Language)

2. < 인터페이스 빌더에서 오토레이아웃 구현 >
- [Interface Builder](#Interface-Builder)
- [생성된 제약 찾기](#생성된-제약-찾기)
- [제약 편집하기](#제약-편집하기)
<br>

## 오토레이아웃(AutoLayout)

오토레이아웃은 뷰의 제약 사항을 바탕으로 뷰 체계 내의 모든 뷰의 크기와 위치를 동적으로 계산합니다. 오토레이아웃은 애플리케이션을 사용할 때 발생하는 외부 변경과 내부 변경에 동적으로 반응하는 사용자 인터페이스를 가능하게 합니다.

<br>

#### 외부 변경(External Changes)

외부 변경은 슈퍼뷰의 크기나 모양이 변경될 때 발생합니다. 각각의 변화와 함께, 사용 가능한 공간을 가장 잘 사용할 수 있도록 뷰 체계의 레이아웃을 업데이트해줘야 합니다. 다음은 외부 변경이 발생하는 경우입니다.

- 사용자가 아이패드의 분할뷰(Split View)를 사용하거나 사용하지 않는 경우(iOS)
- 장치를 회정하는 경우(iOS)
- 활성화콜(active call)과 오디오 녹음 바가 보여지거나 사라지는 경우(iOS)
- 다른 크기의 클래스를 지원하기 원하는 경우
- 다른 크기의 스크린을 지원하기 원하는 경우

이러한 변경사항 대부분은 실행 시간에 발생할 수 있으며 애플리케이션으로부터 동적인 응답을 요구합니다. 다른 스크린 크기를 지원하는 것은 애플리케이션이 다른 환경에 적응하는 것을 나타냅니다. 스크린 크기가 일반적으로 실행 시간에 변경되지 않는다고 하더라도, 적응형 인터페이스를 만들면 애플리케이션이 아이폰 4S, 아이폰 6 Plus 또는 아이패드에서도 모두 동일하게 잘 작동할 수 있습니다. 오토레이아웃은 아이패드 내부 변경에서 슬라이드와 분할뷰를 지원하는 핵심 요소이기도 합니다.

<br>

#### 내부 변경(Internal Changes)

내부 변경은 사용자 인터페이스의 뷰의 크기 또는 설정이 변경되었을 때 발생합니다. 다음은 내부 변경이 발생하는 경우입니다.

- 애플리케이션 변경에 의해 콘텐츠가 보여지는 경우
- 애플리케이션이 국제화를 지원하는 경우
- 애플리케이션이 동적 타입을 지원하는 경우

애플리케이션 콘텐츠가 변경됐을 때, 새로운 콘텐츠는 예전과 다른 레이아웃을 요구할 수 있습니다. 텍스트나 이미지를 보여주는 애플리케이션에서 흔히 발생합니다. 예를 들면, 새로운 애플리케이션이 각각의 뉴스 기사들의 크기로 조정하길 원하는 것처럼 말입니다. 이와 비슷하게 사진 콜라주는 이미지 크기와 영상의 가로, 세로의 비율을 다뤄야만 합니다.

<br>

#### 오토레이아웃이 왜 필요할까?

오토레이아웃은 아래의 경우와 같이 인터페이스의 절대적인 좌표가 아닌 동적으로 상대적인 좌표가 필요한 경우에 유용합니다.

- 애플리케이션이 실행되는 iOS 기기의 스크린 화면의 크기가 다양한 경우
- 애플리케이션이 실행되는 iOS 기기의 스크린이 회전할 수 있는 경우
- 상태표시줄(Status Bar)에 전화 중임을 나타내는 액티브 콜(active call)과 오디오 녹음 중임을 나타내는 오디오 바가 보여지거나 사라지는 경우
- 애플리케이션의 콘텐츠가 동적으로 보여지는 경우
- 애플리케이션이 지역화(Localization)를 지원하는 경우
- 애플리케이션이 동적 타입을 지원하는 경우

<br>

#### 오토레이아웃 속성

오토레이아웃의 속성은 정렬 사각형을 기반으로 합니다.

<br>

![boot_autolayout.jpg](/media/boot_autolayout.jpg)

<br>

- Width : 정렬 사각형의 너비
- Height : 정렬 사각형의 높이
- Top : 정렬 사각형의 상단
- Bottom : 정렬 사각형의 하단
- Baseline : 텍스트의 하단
- Horizontal : 수평
- Vertical : 수직
- Leading : 리딩, 텍스트를 읽을 때 시작 방향
- Trailing : 트레일링, 텍스트를 읽을 때 끝 방향
- CenterX : 수평 중심
- CenterY : 수직 중심

<br>
#### 안전 영역(Safe Area)

- 안전 영역은 콘텐츠가 상태바, 내비게이션바, 툴바, 탭바를 가리는 것을 방지하는 영역입니다. 표준 시스템이 제공하는 뷰들은 자동으로 안전 영역 레이아웃 가이드를 준수하게 되어있습니다.
- 기존의 상/하단 레이아웃 가이드(Top/Bottom Layout Guide)를 대체하며, 하위 버전에도 호환하여 작동합니다.
  - 안전 영역은 iOS 11부터 사용할 수 있습니다.
  - iOS 11 미만의 버전에서는 상/하단 레이아웃 가이드를 사용합니다.

<br>

![boot_autolayout2.jpg](/media/boot_autolayout2.jpg)

<br>

안전 영역 레이아웃 가이드는 UIView 클래스의 var safeAreaLayoutGuide: UILayoutGuide로 접근할 수 있습니다.

<br>

#### 제약(Constraint)

제약은 뷰 스스로 또는 뷰 사이의 관계를 속성을 통하여 정의합니다. 제약은 방정식으로 나타낼 수 있습니다.

<br>

![boot_autolayout3.jpg](/media/boot_autolayout3.jpg)

<br>

- Item1 : 방정식에 있는 첫 번째 아이템(B View)입니다. 첫 번째 아이템은 반드시 뷰 또는 레이아웃 가이드이어야 합니다.
- Attribute1 : 첫 번째 아이템에 대한 속성입니다. 위의 경우, B View의 리딩입니다.
- Multiplier : 속성 2에 곱해지는 값입니다. 위의 경우, 1.0입니다.
- Item2 : 방정식에 있는 두 번째 아이템(A View)입니다.
- Attribute2 : 두 번째 아이템에 대한 속성입니다. 이 경우, A View의 트레일링입니다.
- Constant : 두 번째 아이템의 속성에 더해지는 상수 값입니다.

> 위의 예제 방정식의 제약을 해석하면, 'B View의 리딩은 A View의 트레일링의 1.0배에 8.0을 더한 위치'가 됩니다.

<br>

#### 고유 콘텐츠 크기(Intrinsic Content Size)

뷰의 고유 콘텐츠 크기는 뷰가 갖는 원래의 크기로 생각할 수 있습니다. 예를 들어 버튼의 고유 콘텐츠 크기는 제목의 크기와 작은 여백을 더한 크기입니다. 또한, 레이블의 고유 컨텐츠 크기는 레이블의 텍스트의 크기고, 이미지의 고유 콘텐츠 크기는 이미지 자체의 크기입니다.

<br>

#### 제약 우선도(Constraint Priorities)

오토레이아웃은 뷰의 고유 콘텐츠 크기를 각 크기에 대한 한 쌍의 제약을 사용하여 나타냅니다. 우선도가 높을수록 다른 제약보다 우선적으로 레이아웃에 적용하며, 같은 속성의 다른 제약과 겹치는 경우, 우선도가 낮은 제약은 무시됩니다.

> 1. 콘텐츠 허깅 우선도(Content hugging priority) : 콘텐츠 고유 사이즈보다 뷰가 커지지 않도록 제한합니다. 다른 제약사항보다 우선도가 높으면 뷰가 콘텐츠 사이즈보다 커지지 않습니다.
> <br>
> 2. 콘텐츠 축소 방지 우선도(Content compression resistance priority) : 콘텐츠 고유 사이즈보다 뷰가 작아지지 않도록 제한합니다. 다른 제약사항보다 우선도가 높으면 뷰가 콘텐츠 사이즈보다 작아지지 않습니다.

<br>

![boot_autolayout4.jpg](/media/boot_autolayout4.jpg)

<br>

<br>

#### 레이아웃 마진

뷰에 콘텐츠 내용을 레이아웃할 때 사용하는 기본 간격(default spacing)입니다.

- 레이아웃 마진 가이드(Layout Margins Guide) : 레이아웃 마진에 따라 형성되는 사각의 프레임 영역

<br>

#### 앵커(Anchor)

오토레이아웃을 코딩으로 구현하여 제약(Constraint)을 만들기 위해 앵커(Anchor)를 사용할 수 있습니다.

**Layout Anchor 사용 예제**
중앙에 버튼을 배치하고 버튼의 top anchor를 사용하여 레이블을 버튼의 상단으로부터 10만큼 떨어지도록 배치해봅시다.

1. 객체 라이브러리에서 버튼과 레이블을 추가하고, @IBOutlet을 활용하여 인터페이스 빌드에서 ViewController.swift 파일로 버튼과 레이블을 연결해줍니다.

<br>

![boot_autolayout_anchor.jpg](/media/boot_autolayout_anchor.jpg)

<br>

2. 버튼을 중앙에 배치하기 위해 버튼의 수평과 수직의 중앙 앵커를 뷰 컨트롤러의 뷰의 중앙에 기준을 잡아줍니다. 생성된 제약을 적용하기 위해선 isActive 프로퍼티의 값을 true로 설정해주면 됩니다.

<br>

![boot_autolayout_anchor2.jpg](/media/boot_autolayout_anchor2.jpg)

<br>

*translatesAutoresizingMaskIntoConstraints : 오토레이아웃이 도입되기 전 뷰를 유연하게 표현할 수 있도록 오토리사이징 마스크를 사용하였습니다. 오토레이아웃을 사용하게 되면 기존의 오토리사이징 마스크가 가지고 있던 제약조건이 자동으로 추가되기 때문에 충돌하게 될 가능성이 발생합니다. 그래서 translatesAutoresizingMaskIntoConstraints의 값을 false로 지정한 뒤 오토레이아웃을 적용해줍니다. 참고로 인터페이스 빌더에서 오토레이아웃을 적용한 경우에는 자동으로 값이 false로 설정됩니다.*


3. 레이블의 수평 중앙을 버튼의 수평 중앙 앵커를 기준으로 제약을 생성한 후, 레이블의 하단 앵커를 버튼의 상단 앵커로부터 10만큼의 거리를 두도록 합니다. (상단 앵커기준으로 위로의 거리는 부호가 -라는 점을 주목하세요.) 생성된 제약을 적용하기 위해 isActive 프로퍼티를 true로 설정해줍니다. 그림과 같이 레이블이 버튼의 상단에 자리 잡고 있는 것을 볼 수 있습니다.

<br>

![boot_autolayout_anchor3.jpg](/media/boot_autolayout_anchor3.jpg)

<br>

추가로 속성에 곱해지는 multiplier를 활용하여, 레이블의 너비가 버튼의 너비의 2배가 되도록 제약을 만들어봅시다.

<br>

![boot_autolayout_anchor4.jpg](/media/boot_autolayout_anchor4.jpg)

<br>

위의 코드를 추가하여 레이블의 너비가 버튼의 너비의 2배가 된 것을 확인할 수 있습니다.

<br>

**앵커와 관련된 프로퍼티**

``` Swift
//뷰에 부여한 제약사항들을 담은 배열
var constraints: [NSLayoutConstraint]

//뷰 프레임의 수평 중심부 레이아웃 앵커
var centerXAnchor: NSLayoutXAxisAnchor { get }

//뷰 프레임의 수직 중심부 레이아웃 앵커
var centerYAnchor: NSLayoutYAxisAnchor { get }

//뷰 프레임의 상단부 레이아웃 앵커
var topAnchor: NSLayoutYAxisAnchor { get }

//뷰 프레임의 하단부 레이아웃 앵커
var bottomAnchor: NSLayoutYAxisAnchor { get }

//뷰 프레임의 리딩을 가리키는 레이아웃 앵커
var leadingAnchor: NSLayoutXAxisAnchor { get }

//뷰 프레임의 트레일링을 가리키는 레이아웃 앵커
var trailingAnchor: NSLayoutXAxisAnchor { get }

//뷰 프레임의 높이를 가리키는 레이아웃 앵커
var heightAnchor: NSLayoutDimension { get }

//뷰 프레임의 넓이를 가리키는 레이아웃 앵커
var widthAnchor: NSLayoutDimension { get }

```

<br>
<br>

## NSLayoutConstraint

코드로 오토레이아웃을 구현하는 다른 방법인 NSLayoutConstraint 인스턴스 생성을 사용하여 제약조건을 지정하는 방법에 대해 알아봅시다.

- NSLayoutConstraint 인스턴스 생성 제약조건의 설명입니다.
**view1.attr1 = view2.attr2 * multiplier + constant
item.attribute = toItem.attribute * multiplier + constant**

<br>

![boot_autolayout_ns.jpg](/media/boot_autolayout_ns.jpg)

<br>

- button과 textField에 기본간격(Standard Space, iOS 11 현재 8포인트)에 제약을 주기 위해 NSLayoutConstraint 인스턴스를 생성하는 코드입니다.

``` Swift
NSLayoutConstraint(item: button,
                   attribute: .right,
                   relatedBy: .equal,
                   toItem: textField,
                   attribute: .left,
                   multiplier: 1.0,
                   constant: 8.0)
```


<br>

## Visual Format Language

이번에는 Visual Format Language를 사용하여 제약조건을 지정하는 방법에 대해 알아보고, 위에서 NSLayoutConstraint를 이용해 만들었던 동일한 제약조건을 Visual Format Language를 이용해 만들어보겠습니다.

- 사용 가능한 기호 및 문자열

|  기호 및 문자열 |  설명 |
|:--------|:--------|
|\| | superView 입니다. |
|- | 표준 간격입니다. 기본은 8포인트입니다. |
|== | 같은 너비입니다. |
|-10- | 사이의 간격이 10포인트입니다. |
|<=50 | 50보다 작거나 같습니다. |
|>=50 | 50보다 크거나 같습니다. |
|@750 | 우선도를 지정할 수 있습니다. |
|H | 수평 방향입니다. (가로) |
|V | 수직 방향입니다. (세로) |

<br>

- 위의 NSLayoutConstraint 예제와 동일하게, button과 textField에 기본간격(Standard Space, iOS 현재 8포인트)의 제약을 줍니다.

``` Swift
H:[button]-8-[textField] 또는 H:[button]-[textField]
```

<br>

## Interface Builder

인터페이스 빌더에서 오토레이아웃 제약을 설정하는 3가지 방법
1. 뷰와 뷰 사이에 control키 누르고 드래그하는 방식
2. 스택, 정렬, 핀 그리고 리졸브를 사용하는 방식
3. 인터페이스 빌더가 제약 설정하는 방식

<br>

##### 1. 컨트롤-드래그 제약(Control-Dragging constraints)
두 뷰 사이의 제약을 생성하기 위해, 뷰 중 하나를 클릭한 뒤 컨트롤(ctr) 키를 누른 상태에서 다른 뷰로 드래그합니다. 마우스를 원하는 뷰 위에서 놓을 때, 인터페이스 빌더는 HUD 메뉴를 통해 생성 가능한 제약을 보여줍니다.

예를 들면, 아이디를 입력하는 textField가 있고, 로그인 버튼이 있는 경우 둘 중 하나를 클릭한 뒤, 컨트롤 키를 누른 상태에서 다른 하나로 드래그하면 제약을 선택할 수 있습니다.

<br>

##### 2. 스택, 정렬, 핀 그리고 리졸브 툴 사용(Using the Stack, Align, Pin and Resolve Tools)

인터페이스 빌더는 에디터 윈도우 우측 하단 모서리에 4개의 레이아웃 툴을 제공합니다.

<br>

![boot_autolayout_ib.jpg](/media/boot_autolayout_ib.jpg)

<br>

**스택 툴(Stack Tool)**
스택 툴을 스택뷰를 재빠르게 생성할 수 있게 해줍니다. 레이아웃에서 하나 혹은 그 이상의 아이템을 선택한 후, 스택툴을 클릭하면 됩니다. 인터페이스 빌더는 스택뷰에 선택된 아이템을 추가하고, 스택을 콘텐츠의 최근 피팅 사이즈에 맞게 크기를 재설정합니다.

**정렬 툴(Align)**
정렬하려는 뷰를 선택한 뒤, 정렬 툴을 선택하면 팝오버 창이 뜹니다. 선택한 뷰를 정렬하기 위한 옵션을 선택하고 제약 추가 버튼을 클릭하면 됩니다.

**핀 툴(Pin Tool)**
핀 툴은 뷰의 이웃과 연관된 뷰의 위치 또는 그 크기를 재빠르게 정의하도록 합니다. 고정되기 원하는 아이템의 위치나 크기를 선택하고 핀 툴을 클릭하세요.

**리졸브 툴(Resolve Tool)**
리졸브 툴은 오토레이아웃 문제 해결을 위한 도구로, 일반적인 오토레이아웃의 문제를 고치는 몇 가지 옵션을 제공합니다. 아래의 그림에서 경계선 위쪽으로의 옵션은 현재 선택된 뷰에 한해 영향을 줍니다. 경계선 아래쪽으로의 옵션은 씬(scene)에 있는 모든 뷰에 영향을 줍니다.

<br>

##### 3. 인터페이스 빌더의 제약 생성(Letting Interface Builder Create Constraints)

인터페이스 빌더 스스로 제약 몇 가지 혹은 전부를 생성할 수 있습니다. 이 방법을 사용할 때, 인터페이스 빌더는 캔버스에 있는 뷰의 현재 크기와 위치에 맞는 최선의 제약을 추론합니다.

인터페이스 빌더가 모든 제약을 생성하게 하기 위해, 위에 2번에서 말한 '리졸브 툴 선택' > '추천 제약으로 재설정(Reset to Suggested Constraints)'을 클릭. 인터페이스 빌더는 선택된 뷰(또는 씬(scene)에 있는 모든 뷰)에서 요구되는 모든 제약을 생성합니다.
다른 방법으로는, 몇 가지 제약은 직접 추가해준 다음 '리졸브 툴 선택' > '빠진 제약 추가하기(Add Missing Constraints)'을 클릭해주는 방법이 있습니다.

하지만 레이아웃은 원하는 대로 동작하지 않을 수도 있습니다. 의도된 결과를 얻을 수 있을 때까지 항상 사용자 인터페이스를 시험해보고 제약을 수정해야 합니다.

<br>

## 생성된 제약 찾기

위에 설명한 것은 제약을 생성하는 방법입니다. 이번에는 생성된 제약을 찾는 방법에 대해 알아봅시다.

제약을 확인하는 3가지 방법
1. 스토리보드 캔버스에 있는 제약 보기
2. 도큐먼트 아웃라인에서 그룹화된 제약 목록 보기
3. 크기 인터페이스에서 제약 보기

<br>

## 제약 편집하기

생성된 제약을 편집할 수 있는 2가지 방법
1. 사이즈 인스펙터
2. 속성 인스펙터

<br>
<br>
<br>

참고 링크

[1. 애플 공식 문서 - Auto Layout Guide](https://developer.apple.com/library/archive/documentation/UserExperience/Conceptual/AutolayoutPG/index.html#//apple_ref/doc/uid/TP40010853-CH7-SW1)

[2. iOS H.I.G - Adaptivity and Layout](https://developer.apple.com/design/human-interface-guidelines/ios/visual-design/adaptivity-and-layout/)

From [부스트코스 - iOS](https://www.edwith.org/boostcourse-ios/)
