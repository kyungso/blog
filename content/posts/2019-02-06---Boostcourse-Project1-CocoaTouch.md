---
title: "[iOS] Cocoa Touch 프레임워크 (UIKit, Foundation)"
date: "2019-06-02T14:00:00.169Z"  
template: "post"  
draft: false  
slug: "/posts/boostcourse-project1-CocoaTouch/"  
category: "IOS"  
tags:  
- "iOS"  
- "Cocoa Touch Framework"
- "UIKit"
- "Foundation"
description: "코코아 터치 프레임워크는 iOS 애플리케이션 개발 환경으로, 애플리케이션의 다양한 기능 구현에 필요한 여러 프레임워크를 포함하는 최상위 레벨의 프레임워크입니다."  
---

<br>

## Cocoa Touch Framework

코코아 터치 프레임워크는 iOS 애플리케이션 개발 환경으로, 애플리케이션의 다양한 기능 구현에 필요한 여러 프레임워크를 포함하는 최상위 레벨의 프레임워크입니다. 참고로 코코아 프레임워크는 macOS 애플리케이션 제작에 사용하는 프레임워크입니다.

> - 'Cocoa'라는 단어는 Objective-C 런타임을 기반으로 하고, NSObject를 상속받는 모든 클래스 또는 객체를 가리킬 때 사용합니다.
> <br>
> - 'Cocoa'는 Foundation과 AppKit을 포함하고, macOS(OS X)의 전반적인 기능을 활용해 애플리케이션을 제작할 때 사용하는 프레임워크입니다.
> <br>
> - 'Cocoa Touch'는 핵심 프레임워크인 UIKit과 Foundation을 포함하고, iOS 애플리케이션을 제작할 때 사용하는 프레임워크입니다.

<br>

![boot_cocoaTouch.jpg](/media/boot_cocoaTouch.jpg)

<br>

#### Main frameworks
프레임워크는 기능적으로 공유되는 라이브러리(런타임 시, 프로그램의 주소 공간으로 로드될 수 있는 컴파일된 오브젝트)와 비슷하다고 생각하면 됩니다. 그러나 프레임워크는 관련된 리소스, 헤더 파일, 문서 등을 더 추가로 가지고 있다고 보면 됩니다. 코코아 프레임워크는 표준 위치에 있는 위의 것들을 포함한 bundle 타입으로 구성되었습니다.

- **Foundation Kit(Foundation)**
: NeXTSTEP 3의 Enterprise Objects Framework로 처음 등장했습니다. macOS의 Foundation은 Core Foundation을 기반으로 했습니다. Foundation은 문자열 및 값 조작, 컨테이너 및 반복, 분산 컴퓨팅, 이벤트 루프(실행 루프) 및 그래픽 사용자 인터페이스에 직접 연결되지 않은 기타 기능을 제공하는 일반적인 객체 지향 라이브러리입니다.
<br>

  \* 프레임워크의 모든 클래스와 상수에 사용되는 'NS' 접두어는 NeXT와 Sun Microsystems가 개발한 Cocoa의 OPENSTEP 상속으로 나온 것입니다.
<br>

- **Application Kit(AppKit)**
: AppKit는 원래 NeXTSTEP Application Kit의 자식입니다. NeXTSTEP AppKit에는 그래픽 사용자 인터페이스를 만들고 상호작용할 수 있는 코드 프로그램을 포함하고 있습니다. AppKit는 Foundation의 top 부문에 구축되었으며, 동일한 NS 접두어를 사용합니다.
<br>

- **Core Data**
: Core Data는 Foundation 및 Cocoa에 포함되어 있으며, Cocoa.h에 있는 객체 지속성 프레임워크입니다.
<br>
<br>

## UIKit Framework

코코아 터치 프레임워크에 포함된 UIKit에 대해 알아봅시다.  
UIKit은 iOS 애플리케이션 개발시 사용자에게 보여질 화면을 구성하고 사용자 액션에 대응에 관련된 다양한 요소를 포함합니다.

즉, UIKit은 iOS 애플리케이션의 사용자 인터페이스를 구현하고 이벤트를 관리하는 프레임워크입니다.  
> - UIKit 프레임워크는 제스처 처리, 애니메이션, 그림 그리기, 이미지 처리, 텍스트 처리 등 사용자 이벤트 처리를 위한 클래스를 포함합니다.
> <br>
> - 테이블 뷰, 슬라이더, 버튼, 텍스트 필드, alert 창 등 애플리케이션의 화면을 구성하는 요소를 포함합니다.
><br>
> - UIKit 클래스 중 UIResponder에서 파생된 클래스나 사용자 인터페이스에 관련된 클래스는 애플리케이션의 메인 스레드(혹은 메인 디스패치 큐)에서만 사용하세요.
><br>
> - UIKit은 iOS와 tvOS 플랫폼에서만 사용합니다.

<br>

#### UIKit 기능별 요소

<br>

##### 사용자 인터페이스
- View and Control : 화면에 콘텐츠 표시
- View Controller : 사용자 인터페이스 관리
- Animation and Haptics : 애니메이션과 햅틱을 통한 피드백 제공
- Window and Screen : 뷰 계층을 위한 윈도우 제공

<br>

##### 사용자 액션
- Touch, Press, Gesture : 제스처 인식기를 통한 이벤트 처리 로직
- Drag and Drop : 화면 위에서 드래그 앤 드롭 기능
- Peek and Pop : 3D 터치에 대응한 미리 보기 기능
- Keyboard and Menu : 키보드 입력을 처리 및 사용자 정의 메뉴 표시

<br>


> < *참고* >
**앱을 빌드하면, Xcode는 소스 파일을 컴파일하고 프로젝트의 앱 bundle을 생성** 합니다. 그 app bundle은 앱에 관련된 코드와 리소스들을 포함한 구조화된 디렉토리입니다. 리소스들은 코드를 지원해주는 이미지 에셋, 스토리보드 파일, 문자열 파일, 앱 메타데이터를 포함하고 있습니다.

<br>


*생각해보기*

Xcode 프로젝트에서 새로운 ViewController를 생성하면 상단에 'import UIKit'이 기본적으로 명시되어 있습니다. 왜 ViewController와 UIKit는 단짝일까요?

ㄴ ViewController는 UIViewController를 상속받습니다. UIViewController는 UIKit 프레임워크에 정의된 클래스이기 때문에, UIKit을 import 해주지 않으면 컴파일러는 UIViewController가 누군지 알 수 없습니다.

<br>
<br>

## Foundation Framework
코코아 터치 프레임워크에 포함된 Foundation 프레임워크에 대해 알아봅시다.
Foundation은 iOS 애플리케이션의 운영체제 서비스와 기본 기능을 포함하는 프레임워크입니다.

Foundation은 원시 데이터 타입(String, Int, Double), 컬렉션 타입(Array, Dictionary, Set) 및 운영체제 서비스를 사용해 애플리케이션의 기본적인 기능을 관리하는 프레임워크입니다.

> - Foundation 프레임워크는 데이터 타입, 날짜 및 시간 계산, 필터 및 정렬, 네트워킹 등의 기본 기능을 제공합니다.
><br>
> - Foundation 프레임워크에서 정의한 클래스, 프로토콜 및 데이터 타입은 iOS뿐만 아니라 macOS, watchOS, tvOS 등 모든 애플 SDK에서 사용됩니다.

*Foundation에서 제공하는 데이터 타입 및 컬렉션 타입의 대부분은 Objective-C 언어의 기능에서 지원하지 않는 것이기 때문에 언어기능을 보완하기 위한 구현이며, Swift에서는 이에 해당하는 데이터 타입과 기능 대부분을 Swift 표준 라이브러리에서 제공합니다.*

<br>

#### Foundation 기능별 요소

<br>

##### 기본

- Number, Data, String : 원시 데이터 타입 사용

- Collection : Array, Dictionary, Set 등과 같은 컬렉션 타입 사용

- Data and Time : 날짜와 시간을 계산하거나 비교하는 작업

- Unit and Measurement : 물리적 차원을 숫자로 표현 및 관련 단위 간 변환 가능

- Data Formatting : 숫자, 날짜, 측정값 등을 문자열로 변환 또는 반대 작업

- Filter and Sorting : 컬렉션의 요소를 검사하거나 정렬하는 작업

<br>

##### 애플리케이션 지원
- Resources : 애플리케이션의 에셋과 번들 데이터에 접근 지원
- Notification : 정보를 퍼뜨리거나 받아들이는 기능 지원
- App Extension : 확장 애플리케이션과의 상호작용 지원
- Error and Exceptions : API와의 상호작용에서 발생할 수 있는 문제 상황에 대처할 수 있는 기능 지원

<br>

##### 파일 및 데이터 관리
- File System : 파일 또는 폴더를 생성하고 읽고 쓰는 기능 관리
- Archives and Serialization : 속성 목록, JSON, 바이너리 파일들을 객체로 변환 또는 반대 작업 관리
- iCloud : 사용자의 iCloud 계정을 이용해 데이터를 동기화하는 작업 관리

<br>

##### 네트워킹
- URL Loading System : 표준 인터넷 프로토콜을 통해 URL과 상호작용하고 서버와 통신하는 작업
- Bonjour : 로컬 네트워크를 위한 작업

<br>

*생각해보기*

*새롭게 ViewController 파일을 생성하면 상단에 'import UIKit'이 기본적으로 명시되어있죠. 그렇다면 어떤 파일을 생성하면 'import Foundation'이 기본적으로 명시되어있을까요?*

ㄴ ViewController를 생성시 기본으로 UIKit이 import되는데 UIKit을 import하면 Foundation이 간접적으로 추가되기 때문이다. 더 자세히 설명하자면 **command 버튼을 누른 상태로 'import UIKit'의 UIKit을 클릭 --> Jump to Definition 누르면 UIKit 정의하는 파일이 나오는데, 거기에 보면 맨 위에 'import Foundation'로 Foundation 프레임워크를 import 했기 때문에 따로 import 하지 않아도 UIKit에 의해서 추가되는 것입니다.**

<br>
<br>
<br>

참고 링크  

[1. 애플 공식 문서 - Cocoa(Touch)](https://developer.apple.com/library/archive/documentation/General/Conceptual/DevPedia-CocoaCore/Cocoa.html)  

[2. 위키피디아 - Cocoa(API)](https://en.wikipedia.org/wiki/Cocoa_(API))

[3. Github - CocoaCoreCompetencies](https://github.com/conqueror/CocoaCoreCompetencies/blob/master/CocoaCoreCompetencies.pdf)

[4. 애플 공식 문서 - UIKit](https://developer.apple.com/documentation/uikit)

[5. 애플 공식 문서 - app development with UIKit](https://developer.apple.com/documentation/uikit/about_app_development_with_uikit)

[6. 애플 공식 문서 - Foundation](https://developer.apple.com/documentation/foundation)

[7. 애플 공식 문서 - Swift Standard Library](https://developer.apple.com/documentation/swift)

From [부스트코스 - iOS](https://www.edwith.org/boostcourse-ios/)
