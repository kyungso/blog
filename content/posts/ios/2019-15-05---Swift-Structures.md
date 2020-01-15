---
title: "[Swift] Structure(구조체)"  
date: "2019-05-15T14:00:00.169Z"  
template: "post"  
draft: false  
slug: "/posts/ios/swift-structures/"  
category: "iOS"  
tags:  
- "iOS"  
- "Swift"  
- "Structure"  
description: ""  
---

# Structures (구조체)



structures : Values

—> represent values 하게 디자인 되어있다.

classes : objects

—> represent objects 하게 디자인 되어있다.

두 개 very similar



Structures은 tuples와 비슷한데, 관련된 data끼리 같이 그룹으로 묶여있다고 생각하면 된다.

예를 들면, 한 사람의 정보 firstName, lastName, favoriteColor를 가지고 있다고 하자. tuples과 다르게 structure은 class처럼 method들을 가지고 있다.



##Property

what structure has

프로퍼티는 구조체, 클래스, 열거형 내부에 구현할 수 있습니다.



#### Stored Property (저장 프로퍼티)

구조체 안에 선언된 변수들로 아래의 예제에서 location과 deliveryDistance

``` swift
struct Restaurant {
  let location: Location
  var deliveryDistance: Miles
}
```



#### Computed Property (연산 프로퍼티)

기존에 선언된 저장 프로퍼티를 가지고 특정한 연산을 해주기 위한 프로퍼티. 예를 들면 한국 나이인 저장 프로퍼티를 가지고 미국 나이를 계산하기 위해 사용한다던지, 달러를 저장 프로퍼티로 가지고 원화로 연산하는 프로퍼티를 사용할 수 있다. 따라서 한국 나이와 미국 나이, 달러와 원화가 동기화되어 하나가 변경되면 다른 하나도 변경될 수 있다.

항상 var로 선언해야한다.  

``` swift
struct Money {
  var currencyRate: Double = 1100
  var dollar: Double = 0
  var won: Double {
    get {
    	return dollar * currencyRate
    }
    set {
      dollar = newValue / currencyRate
    }
  }
}

var moneyInMyPocket = Money()
moneyInMyPocket.won = 11000		//11000
```

보통은 get, set(willSet, didSet)



#### Type Properties (타입 프로퍼티)

static 키워드를 사용해서 타입과 관련된 프로퍼티를 선언할 때 사용한다.

```swift
struct Student {
	static var typeDescription: String = "학생"
}

print(Student.typeDescription)	//학생
```



#### Property Observers

observer 직역하면 '관찰자'라고 해석할 수 있는데, 그 의미를 가지고 보자면 프로퍼티 감시자를 사용하면 프로퍼티 값이 변경될 때 원하는 동작을 수행할 수 있다.   

프로퍼티 감시자는 함수, 메서드, 클로저, 타입 등의 외부에 위치한 지역, 전역 변수에 모두 사용 가능하다.  

쉽게 설명하자면, firstName 변수를 계속 지켜보면서 값의 변화가 있을 때마다 메세지를 출력한다던지 원하는 기능을 할 수 있다는 뜻이다.

``` swift
var firstName: String {
  willSet {...}
  didSet {...}
}

init(firstName: String, lastName: String) {
  self.firstName = firstName
  self.lastName = lastName
}

// Struct is initialized
var wizard = Wizard.init(
	firstName: "Gandalf",
  lastName: "Greyjot"
)

// firstName is changed
wizard.firstName = "Mustrum"

// Property observers are called
var firstName: String {
  willSet {...}
  didSet {...}
}
```



위에 let wizard 상수가 아닌 var wizard는 꼭 변수로 선언해야한다.

- willSet - 값이 저장되기 직전에 호출됩니다.

  ㄴ 암시적 매개변수 이름 (newValue)

- didSet - 새로운 값이 저장된 직후에 호출됩니다.

  ㄴ 암시적 매개변수 이름 (oldValue)



#### Lazy Variable vs Computed Properties

**Lazy 변수** 는

- 상수(let)이 가능
- Expensive to calculate
- Might not be used by every instance

즉, 처음 사용되지 전까지는 로드되지 않다가 사용하고자 할 때 불러올 수 있는 것이다.



``` swift
struct Sample {
  var mutableProperty: Int = 100  // 가변 프로퍼티
  let immutableProperty: Int = 100  // 불변 프로퍼티

  static var typeProperty: Int = 100 // 타입 프로퍼티

  // 인스턴스 메서드
  func instanceMethod() {
    print("instance method")
  }

  // 타입 메서드
  static func typeMethod() {
    print("type method")
  }
}

// 구조체 사용

// 가변 인스턴스
var mutable: Sample = Sample()

mutable.mutableProperty = 200
//mutable.immutableProperty = 200  //error

// 불변 인스턴스
let immutable: Sample = Sample()

//immutable.mutableProperty = 200		//error
//immutable.immutableProperty = 200	//error

// 타입 프로퍼티 및 메서드
Sample.typeProperty = 400
Sample.typeMethod()

//mutable.typeProperty = 400	//error
//mutable.typeMethod()		//error
```



구조체를 이용해 인스턴스를 생성할 때,

가변 인스턴스 —> 가변 프로퍼티  O

가변 인스턴스 —> 불변 프로퍼티 X



불변 인스턴스 —> 가변 프로퍼티 X

불변 인스턴스 —> 불변 프로퍼티 X



타입 프로퍼티 & 메소드는 인스턴스 생성 X





##Method

what structure does (methods perform work)



Swift 4.2

- **enumeration** (열거형)

  CaseIterable (프로토콜)은 enum의 모든 case를 배열 속성으로 자동 생성시켜줍니다. 컴파일할 때, enum의 모든 case를 배열로 표현해주는 allCases 속성으로 내가 정한 순서로 자동으로 생성됩니다.

  ``` swift
  enum Weekday: CaseItable {
    case monday, tuesday, wednesday, thursday, friday, saturday, sunday
  }

  Weekday.allCases
  // [monday, tuesday, wednesday, thursday, friday, saturday, sunday]
  ```



- **mutating**

  swift에서   

  클래스(classes)는 reference type,  

  구조체(structures)와 열거형(enumerations)은 value type이다.  

  이 때, value types의 프로퍼티들은 인스턴스 메서드 안에서 변경될 수 없다. 값 타입의 프로퍼티를 변경하기 위해서 인스턴스 메서드에 **mutating** keyword를 사용해야 한다. 이 mutating 키워드를 가진 메서드는 프로퍼티의 값을 변경할 수 있고, 메서드 구현이 끝나면 원래 구조체로 돌아가 그 메서드를 사용할 수 있다.



  ``` swift
  struct Stack {
    public private(set) var items = [Int]()

    mutating func push(_ item: Int) {
      items.append(item)
    }

    mutating func pop() -> Int? {
      if !items.isEmpty {
        return items.removeLast()
      }
      return nil
    }
  }

  var stack = Stack()
  stack.push(4)
  stack.push(78)
  stack.items	// [4, 78]
  stack.pop()
  stack.items	// [4]
  ```





#### Computed Properties vs Methods

Extensive computation or DB access ?

- Yes : Method
- No : Computed Property



구조체 vs 클래스

구조체는 ?

- 연관된 몇몇의 값들을 모아서 하나의 데이터 타입으로 표현하고 싶을 때
- 다른 객체 또는 함수 등으로 전달될 때 참조가 아닌 복사를 원할 때
- 자신을 상속할 필요가 없거나, 자신이 다른 타입을 상속받을 필요가 없을 때
- Apple 프레임워크에서 프로그래밍을 할 때에는 주로 클래스를 많이 사용


<br>
<br>
<br>

참고 :

Raywenderlich.com

[Swift:Understanding Mutating Functions](https://medium.com/the-andela-way/swift-understanding-mutating-functions-in-two-minutes-d9e363904e3a)
