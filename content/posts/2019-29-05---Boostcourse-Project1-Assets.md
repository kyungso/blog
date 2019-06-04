---
title: [iOS] 프로젝트에 이미지 추가하기(Asset)  
date: "2019-05-29T14:00:00.169Z"  
template: "post"  
draft: false  
slug: "/posts/boostcourse-project1-assets/"  
category: "부스트코스"  
tags:  
- "iOS"  
- "Swift"  
- "Asset"  
description: "에셋(asset)을 이용해 프로젝트에서 사용할 이미지를 추가하는 방법"  
---

# Asset

## 에셋 카탈로그 (Asset Catalog)
Xcode에서 프로젝트를 처음 생성했을 때 자동으로 **Assets.xcassets** 이라는 폴더가 생성되는데, 이 폴더에서 애플리케이션에 사용될 다양한 에셋을 관리하며,이를 에셋 카탈로그라고 합니다.
에셋 카탈로그는 에셋과 다양한 디바이스의 속성에 대한 파일의 연결(mapping) 통해서 애플리케이션 리소스에 쉽게 접근할 수 있도록 도와줍니다. (리소스는 애플리케이션이 실행 중일 때 사용하는 이미지와 음악 파일 등을 말합니다.) 여기서 말하는 속성은 디바이스의 특징, 사이즈 클래스, 주문형 리소스. 특정 타입의 정보를 포함하고 있습니다.
에셋 카랄로그에 관한 더 자세한 정보는 [How To Create Asset Catalog](https://help.apple.com/xcode/mac/current/#/dev10510b1f7)

### 에셋 카탈로그 구성
에셋 카탈로그가 어떻게 구성 되어 있으며, 각 요소는 어떤 역할을 하는지 이미지와 함께 살펴봅시다.

<br>

![boot_asset_1.jpg](/media/boot_asset_1.jpg)  

<br>

\- Groups : 그룹은 한 개 이상의 또 다른 그룹이나 에셋을 가질 수 있습니다.

\- Assets : 에셋은 한 가지 타입의 관련된 속성과 파일들의 집합을 나타냅니다.

\- 에셋 이름(Asset name) : 에셋에 접근하기 위해 개발자가 정의한 문자열입니다.

\- 에셋 파일(Asset files) : 선택한 에셋의 데이터 파일 또는 리소스 입니다. (사이즈별로 1x,2x,3x - 1x의 크기가 30x30이였다면, 2x의 크기는 60x60, 3x의 크기는 90x90 --> 해상도를 표현)

\- Attributes : 속성은 선택한 그룹, 에셋, 에셋 파일의 속성을 나타냅니다. (속성 인스펙터를 선택하면 볼 수 있습니다.)

<br>

>프로젝트 내의 같은 타겟에는 에셋(폴더)의 이름은 반드시 고유해야 합니다. 리소스 타입에 상관없이 이름은 고유해야 합니다.

<br>

![boot_asset_2.jpg](/media/boot_asset_2.jpg)

<br>

\- Asset variations : 위 그림에서 선택된 하나의 조각(에셋 파일들의 집합)을 나타냅니다. 이 조각은 같은 속성 값(value)이 적용되는 단위입니다.

<br>

![boot_asset_3.jpg](/media/boot_asset_3.jpg)

<br>

에셋 카탈로그의 컨텐츠는 3가지 타입을 갖습니다.

\- Folders : 에셋 카탈로그 폴더는 다른 그룹 폴더나 에셋 폴더를 포함할 수 있습니다. 파일시스템의 폴더 이름은 대체적으로 확장자를 갖지 않습니다. 하지만 에셋 카탈로그 폴더는 위의 그림과 같이 해당 에셋 타입의 확장자가 자동으로 붙습니다.

\- JSON files : .json 확장자 파일로써 속성에 대한 정보를 포함하고 있습니다.

\- Content files : 콘텐츠 파일은 리소스 파일을 나타냅니다.

<br>
<br>
<br>

### 에셋 카탈로그 타입
에셋 카탈로그의 대표적인 타입과 확장자에 대해 알아봅시다.

|  폴더 타입 |  확장자 |  설명 |
|:--------|:--------|:--------|
|App Icon Type | .appiconset |애플리케이션의 아이콘 입니다. |
|Catalog Type | .xcassets |에셋 카탈로그의 최상위 폴더입니다. |
|Image Set Type | .imageset |객체들이 사용하는 이미지입니다. |
|Data Set Type | .dataset |애플리케이션에서 사용되는 데이터 파일입니다. |
<br>

- App Icon Type : 다양한 크기와 해상도의 애플리케이션 아이콘 원본 이미지입니다.
- Catalog Type : 에셋 카탈로그 폴더구조의 최상위 폴더입니다. 한 개의 에셋 카탈로그에 하나만 존재할 수 있습니다.
- Image Set Type : 이미지 에셋에서 UIImage와 NSImage의 인스턴스에 사용되는 이미지 파일입니다.
- Data Set Type : 장치 실행 가능 코드(device-executable code)를 제외한 Xcode에 의해 생성된 모든 종류의 데이터를 포함하는 파일들의 집합입니다.

<br>
<br>
<br>

## 앱 시닝과 앱 슬라이싱
- #### 앱 시닝(app thinning)
  앱 시닝이란 애플리케이션이 디바이스에 설치될 때 앱 스토어와 운영체제가 그 디바이스의 특성에 맞게 설치하도록 하는 설치 최적화 기술을 의미합니다. 이를 통해 애플리케이션의 설치용량을 최소화하고 다운로드의 속도를 향상시킬 수 있습니다. 앱 시닝(app thinning)의 기술 구성요소는 슬라이싱(slicing), 비트코드(bitcode), 주문형 리소스(on-demand resource)가 있습니다.

<br>

  > 나의 용어로 정리해보자면, 앱 시닝은 **나의 디바이스에 맞게 최소한으로 가볍게(thinning) 맞춤화 설치!!**  

<br>

- #### 슬라이싱(slicing)

  슬라이싱(slicing)은 애플리케이션이 지원하는 다양한 디바이스에 대한 여러 조각의 애플리케이션 번들(app bundle)을 생성하고 디바이스에 알맞은 조각을 전달하는 기술입니다. 개발자가 애플리케이션의 전체 버전을 iTunes Connect에 업로드하게 되면, 앱 스토어에는 각 디바이스 특성에 다양한 버전의 조각들이 생성됩니다. 사용자가 애플리케이션을 설치할 때 전체 버전이 아닌 슬라이싱(slicing)된 조각들 중 사용자의 디바이스의 가장 적합한 조각이 다운로드되어 설치됩니다. 에셋 카탈로그에서 관리하는 이미지들은 자동으로 적용이 됩니다. (슬라이싱(slicing)은 iOS 9.0 버전 이상만 지원합니다.)

  * iTunes Connect란 개발자가 앱 스토어에 판매할 애플리케이션을 제출하고 관리할 수 있도록 도와주는 웹 기반 도구입니다.  

<br>

  > 나의 용어로 정리해보자면, 앱 슬라이싱은 **여러 디바이스에 대한 앱 번들 조각들을 슬라이싱하여 iTunes Connect에 업로드 해놓으면, 나의 디바이스에 알맞은 조각을 다운로드되어 설치!!**

<br>

<br>

![boot_asset_4.jpg](/media/boot_asset_4.jpg)

<br>
<br>
<br>

## 이미지 추가하기
실제로 사용할 이미지를 추가해 보도록 하겠습니다.

<br>

![boot_asset_5.jpg](/media/boot_asset_5.jpg)

<br>

위의 방법말고도 원하는 group 폴더를 생성하거나, 원하는 이미지나 파일을 드래그 해서 쉽게 추가하는 방법도 있습니다.

<br>
<br>


참고 링크
[1. 애플 공식 문서 - Asset Catalogs](https://help.apple.com/xcode/mac/current/#/dev10510b1f7)
[2. 애플 공식 문서 - Types Reference](https://developer.apple.com/library/archive/documentation/Xcode/Reference/xcode_ref-Asset_Catalog_Format/AssetTypes.html)

From [부스트코스 - iOS](https://www.edwith.org/boostcourse-ios/)
