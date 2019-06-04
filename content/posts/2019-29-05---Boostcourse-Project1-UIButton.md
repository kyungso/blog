---
title: [iOS] UIButton, UISlider, UILabel
date: "2019-05-29T14:00:00.169Z"  
template: "post"  
draft: false  
slug: "/posts/boostcourse-project1-UIButton/"  
category: "부스트코스"  
tags:  
- "iOS"  
- "Swift"  
- "UIButton"
- "UILabel"
- "UISlider"
description: ""  
---

## UIButton
UIButton 클래스는 사용자의 상호 작용(터치/탭 등의 이벤트)에 반응해 미리 지정된 코드를 실행하는 컨트롤 요소입니다.  
<br>

> **버튼 생성 3단계**
> 1. 버튼을 생성하고 버튼의 유형을 선택하세요.
> 2. 버튼을 나타내기 위한 문자(타이틀)를 입력하거나, 이미지를 설정한 뒤 크기를 조정하세요.
> 3. 버튼에 특정 이벤트가 발생할 때 작동할 하나 이상의 메서드를 연결하세요.

<br>
<br>

>**사용자 상호작용에 반응하기**
>사용자가 버튼을 터치하면 버튼에 연결된 액션 매서드가 호출되어 원하는 작업이 실행됩니다.

<br>
<br>

#### 버튼과 메서드 연결하는 방법


1. ```addTarget(_:action:for:)``` 메서드 사용
2. 인터페이스 빌더에서 연결 (@IBAction)

<br>

#### 버튼과 연결되는 메서드 형식

버튼을 탭 했을 때 필요한 정보에 따라 아래 3가지 중 한 가지를 선택해 사용합니다.
``` Swift
func doSomething()
func doSomething(sender: UIButton)
func doSomething(senter: UIButton, forEvent event: UIEvent)
```
<br>

#### 버튼의 상태

- 버튼의 상태는 5가지로 표현합니다.
  - default, highlighted, focused, selected, disabled
  - 버튼의 상태는 조합된 상태일 수 있습니다.
  - 예) [default + highlighted], [selected + disabled] 등등
<br>

- 버튼 생성 시 기본 상태 값은 default 입니다.
<br>

- 사용자가 버튼과 상호작용을 하면 상태 값이 변하게 됩니다.
<br>

- 프로그래밍 방식 혹은 인터페이스 빌더를 이용해 버튼의 각 상태에 대한 속성을 별도로 지정할 수 있습니다.
<br>


  - 별도로 속성을 지정하지 않으면 UIButton 클래스에서 제공하는 기본 동작을 사용하게 됩니다.
  - 예) disabled 버튼은 일반적으로 흐리게 표시되며 사용자가 탭 해도 highlighted 되지 않습니다.

<br>

#### 버튼 주요 프로퍼티

버튼의 프로퍼티 값을 설정하는 방식에는 코드를 이용하는 방법과 스토리보드의 인스펙터를 이용한 방법이 있습니다.

- enum UIButtonType 버튼의 유형
  - 버튼의 유형에 따라 버튼의 기본적인 외형과 동작이 달라집니다.
  - 처음 버튼을 생성할 때 init(type:) 메서드를 이용하거나, 인터페이스 빌더의 "Attribute Inspector"에서 버튼 유형을 지정할 수 있습니다.
  - 한 번 생성된 버튼의 유형은 이후 변경할 수 없습니다.
  - 가장 많이 사용하는 유형은 Custom과 System이지만 필요에 따라 유형(Detail Disclosure, Info Light, Info Dark, Add Contact)를 사용할 수 있습니다.
<br>


- var titleLabel: UILabel? : 버튼 타이틀 레이블
<br>

- var imageView: UIImageView? : 버튼의 이미지 뷰
<br>

- var tintColor: UIColor! : 버튼 타이틀과 이미지의 틴트 컬러

<br>

#### 버튼의 주요 메서드

``` Swift
// 특정 상태의 버튼의 문자열 설정
func setTitle(String?, for:UIControlState)

// 특정 상태의 버튼의 문자열 반환
func title(for: UIControlState) -> String?

// 특정 상태의 버튼 이미지 설정
func setImage(UIImage?, for: UIControlState)

// 특정 상태의 버튼 이비지 반환
func image(for: UIControlState) -> UIImage?

// 특정 상태의 백그라운드 이미지 설정
func setBackgroundImage(UIImage?, for: UIControlState)

// 특정 상태의 백그라운드 이미지 반환
func backgroundImage(for: UIControlState) -> UIImage?

// 특정 상태의 문자열 색상 설정
func setTitleColor(UIColor?, for: UIControlState)

// 특정 상태의 attributed 문자열 설정
func setAttributedTitle(NSAttributedString?, for: UIControlState)
```
<br>
<br>
<br>

## UILabel
UILabel은 한 줄 또는 여러 줄의 텍스트를 보여주는 뷰로, UIButton 등의 컨트롤의 목적을 설명하기 위해 사용하는 경우가 많습니다.
<br>

> **레이블의 생성 단계**
> 1. 레이블을 생성하십시오.
> 2. 레이블이 표시할 문자열을 제공하십시오.
> 3. 레이블의 모양 및 특성을 설정하십시오.

<br>
#### 레이블 주요 프로퍼티

레이들의 프로퍼티에 접근해 나타내려는 문자의 내용, 색상, 폰트, 문자정렬 방식, 라인 수 등을 조정할 수 있습니다.
레이블의 프로퍼티의 값을 설정하는 방식에는 프로그래밍 방식과 스토리보드의 인스펙터를 이용한 방법이 있습니다.

- var text: String? : 레이블이 표시할 문자열
  - 문자열이 모두 동일한 속성(폰트, 생상, 기울임꼴 등)으로 표시됩니다.
  - text 프로퍼티에 값을 할당하면 attributedText 프로퍼티에도 똑같은 내용의 문자열이 할당됩니다.
<br>

- var attributedText: NSAttributedString? : 레이블이 표시할 속성 문자열
  - [NSAttributed 클래스](https://developer.apple.com/documentation/foundation/nsattributedstring)를 사용한 속성 문자열 중 특정 부분의 속성을 변경할 수 있습니다. (예] 일부 글자 색상 변경 / 일부 글자 폰트 변경)
  - attributedText 프로퍼티에 값을 할당하면 text 프로퍼티에도 똑같은 내용의 문자열이 할당됩니다.
<br>

- var textColor: UIColor! : 문자 생상
<br>

- var font: UIFont! : 문자 폰트
<br>

- var textAlignment: NSTextAlignment : 문자열의 가로 정렬 방식
  - left, right, center, justified, natural 중 하나를 선택할 수 있습니다.
<br>

- var numberOfLines: Int : 문자를 나타내는 최대 라인 수
  - 문자열을 모두 표시하는 데 필요한 만큼 행을 사용하려면 0으로 설정. 기본 값은 1입니다.
  - 설정한 문자열이 최대 라인 수를 초과하면 lineBreakMode 프로퍼티의 값에 따라 적절히 잘라서 표현합니다.
  - adjustsFontSizeToFitWidth 프로퍼티를 활용하면 폰트 사이즈를 레이블의 넓이에 따라 자동으로 조절해줍니다.
<br>

- var baselineAdjustment: UIBaselineAdjustment: 문자열이 Autoshrink 되었을 때의 수직 정렬 방식
  - Align Baseline : 문자가 작아졌을 때 기존 문자열의 기준선에 맞춤
  - Align Center : 문자가 작아졌을 때 작아진 문자의 중앙선에 맞춤
  - None : 문자가 작아졌을 때 기존 문자열의 위쪽 선에 맞춤
<br>

- var lineBreakMode: NSLineBreakMode : 레이블의 경계선을 벗어나는 문자열에 대응하는 방식
  - Character wrap : 여러 줄 레이블에 주로 적용되며, 글자 단위로 줄 바꿈을 결정합니다.
  - Word wrap : 여러 줄 레이블에 주로 적용되며, 단어 단위로 줄바꿈을 결정합니다.
  - Truncate head : 한 줄 레이블에 주로 적용되며, 앞쪽 텍스트를 자르고 ...으로 표시합니다.
  - Truncate middle : 한 줄 레이블에 주로 적용되며, 중간 텍스트를 자르고 ...으로 표시합니다.
  - Truncate tail : 한 줄 레이블에 주로 적용되며, 끝쪽 텍스트를 자르고 ...으로 표시합니다. 기본 설정 값입니다.
<br>
<br>

## UISlider
UISlider은 연속된 값 중에서 특정 값을 선택하는데 사용되는 컨트롤입니다.
<br>

> **슬라이더 생성 3단계**
> 1. 슬라이더를 생성하고, 슬라이더가 나타내는 값의 범위를 지정하세요.
> 2. 적절한 색상과 이미지를 이용해 슬라이더의 모양을 구성하세요.
> 3. 하나 이상의 메서드를 슬라이더와 연결하세요.

<br>
<br>

> **사용자 상호작용에 반응하기**   
> 사용자가 슬라이저의 값을 변경하면 슬라이더에 연결된 메서드가 호출되어 원하는 작업이 시작됩니다. 기본적으로는 사용자가 슬라이더의 Thumb을 이동시키면 연속적으로 이벤트를 호출하지만, isContinuous 프로퍼티 값을 false로 설정하면 슬라이더의 Thumb에서 손을 떼는 동시에 이벤트를 호출합니다.

<br>
<br>

#### 슬라이더와 메서드 연결하는 방법
1. addTarget(_:action:for:) 메서드 사용
2. 인터페이스 빌더에서 연결 (@IBAction)

<br>
#### 슬라이더와 연결하는 메서드 형식
슬라이더의 값을 변경했을 때 필요한 정보에 따라 아래 3가지 중 한 가지를 선택하여 사용하세요.

``` Swift
func doSomething()
func doSomething(sender: UISlider)
func doSomething(sender: UISlider, forEvent event: UIEvent)
```

<br>
#### 슬라이더 주요 프로퍼티

- var minimumValue: Float, var maximumValue: Float : 슬라이더 양끝의 최소, 최대 값 (범위)
<br>

- var value: Float : 슬라이더의 현재 값
<br>

- var isContinuous: Bool : 슬라이더의 연속적인 값 변화에 따라 이벤트 역시 연속적으로 호출할 것인지의 여부
<br>

- var minimumValueImage: UIImage?, var maximumValueImage: UIImage? : 슬라이더 양끝단의 이미지
<br>

- var thumbTintColor: UIColor? : thumb의 틴트 색상
<br>

- var minimumTrackTintColor: UIColor?, var maximumTrackTintColor: UIColor? : thumb을 기준으로 앞쪽 트랙과 뒤쪽 트랙인 틴트 색상
<br>

#### 슬라이더 주요 메서드

``` Swift
// 슬라이더의 현재 값 설정
func setValue(Float, animated: Bool)

// 특정 상태의 minimumTrackImage 설정
func setMinimumTrackImage(UIImage?, for: UIControlState)

// 특정 상태의 minimumTrackImage 반환
func minimumTrackImage(for: UIControlState) -> UIImage?

// 특정 상태의 maximumTrackImage 설정
func setMaximumTrackImage(UIImage?, for: UIControlState)

// 특정 상태의 maximumTrackImage 반환
func maximumTrackImage(for: UIControlState) -> UIImage?

// 특정 상태의 thumbImage 설정
func setThumbImage(UIImage?, for: UIControlState)

// 특정 상태의 thumbImage 반환
func thumbImage(for: UIControlState) -> UIImage?
```
<br>
<br>
<br>

참고 링크
[1. 애플 공식 문서 - UIButton](https://developer.apple.com/documentation/uikit/uibutton)
[2. 애플 공식 문서 - UILabel](https://developer.apple.com/documentation/uikit/uilabel)
[3. 애플 공식 문서 - UISlider](https://developer.apple.com/documentation/uikit/uislider)

From [부스트코스 - iOS](https://www.edwith.org/boostcourse-ios/)
