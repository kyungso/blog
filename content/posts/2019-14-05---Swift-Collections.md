---
title: "[Swift] Collection(컬렉션)"  
date: "2019-05-14T14:00:00.169Z"  
template: "post"  
draft: false  
slug: "/posts/swift-collections/"  
category: "iOS"  
tags:  
- "iOS"  
- "Swift"  
- "Collection"  
description: ""  
---

# Collections

- [Array](#Array)  

- [Dictionary](#Dictionary)  

- [Set](#Set)  

- [Closure](#Closure)  



## Array  

순서가 있고, 중복을 허용한다.



``` swift
var foods: [String] = ["donut", "pizza", "chicken", "cookie"]

foods[0]                //"donut"
foods[1...3]        //["pizza","chicken","cookie"]
```

배열의 인덱스를 사용해서 원소를 알 수 있다.  

배열의 인덱스는 0부터 시작한다.  



**append**

``` swift
foods.append("hamburger")
```

새로운 원소를 배열의 끝에 추가하는 메소드이다.  

foods는 ["donut", "pizza", "chicken", "cookie", "hamburger"] 가 된다.



**insert**

```swift
foods.insert("Apple", at: 1)
```

새로운 원소를 원하는 위치에 삽입하는 메소드이다.

foods는 ["donut", "Apple", "pizza", "chicken", "cookie", "hamburger"] 가 된다.  



**count**

``` swift
foods.count        //6
```

배열의 원소 개수를 반환해주는 메소드이다.   

여기선 원소를 6개 가지고 있으므로 6을 반환한다.  



**first**

``` swift
foods.first        //"donut"
```

배열의 첫번째 원소를 반환해주는 메소드이다.  

foods 배열의 첫번째 원소인 "donut"을 반환한다.  



**min**

```swift
foods.min()        //"Apple"
```

배열의 최솟값을 반환해주는 메소드이다.  

String은 A~Z~a~b 순서로 커진다.   

A < Z < a < b  

따라서 foods 배열의 min 원소는 "Apple" 이다.  



**max**

``` swift
foods.max()        //"pizza"
```

배열의 최댓값을 반환해주는 메소드이다.  

foods 배열의 max 원소는 " pizza" 이다.  



**contains**

```swift
foods.contains("pizza")        //true
foods.contains("pasta")        //false
```

배열이 주어진 원소를 가지고 있는지 Boolean 값을 반환하는 메소드이다.  



**swapAt**

``` swift
foods.swapAt(1, 3)        
```

원하는 위치의 원소들을 바꿔주는 메소드이다.  

배열의 index 1의 원소와 index 3의 원소를 바꿔  ["donut", "chicken", "pizza", "Apple", "cookie", "hamburger"] 가 된다.  



**enumerated**

``` swift
for (index, food) in foods.enumerated() {
print(index, food)
}
```

food의 값에 해당하는 index를 0부터 표현해주는 메소드이다.  

위의 코드를 실행하면, console 창에 아래와 같이 결과가 나올 것이다.  

``` swift
0 donut
1 chicken
2 pizza
3 Apple
4 cookie
5 hamburger
```



**remove**

``` swift
foods.remove(at: 4)        //"cookie"
```

원하는 위치의 원소를 삭제하는 메소드이다.  



**removeLast**

``` swift
foods.removeLast()    //"hamburger"
```

배열의 끝에 있는 원소를 삭제하는 메소드이다.  



**removeAll**

``` swift
foods.removeAll()
```

array의 모든 원소를 삭제한다.  



**isEmpty**

``` swift
foods.isEmpty
```

array가 비어있는지 확인한다.  







## Dictionary

key와 value로 이루어져 순서가 없고, key 값은 유일해야 한다.



``` swift
var emptyDictionary: [String: Int] = [:]

var namesAndAnimals = [
"Tom" : "🐶 Dog",
"Lisa" : "🐱 Cat",
"John" : "🐰 Rabbit",
"Ann" : "🐷 Pig"
]

namesAndAnimals["Tom"]        //🐶 Dog
namesAndAnimals["Bob"]        //nil
```



**Dictionary 값을 추가**

``` swift
namesAndAnimals["Bob"] = "🐵 monkey"
```



**Dictionary 값을 변경하거나 추가**

``` swift
namesAndAnimals.updateValue("Tiger", forkey: "Lisa")
namesAndAnimals["Lisa"] = "🐯 Tiger"
```

1) updateValue 메소드를 이용해 값을 변경

2) 원하는 key 값을 이용해 값을 변경



**Dictionary 값을 삭제**

``` swift
namesAndAnimals.removeValue(forKey: "Ann")
namesAndAnimals["Ann"] = nil
```

1) removeValue 메소드를 이용해 값을 삭제

2) 원하는 key 값에 nil을 할당해 값을 삭제



**Dictionary 모든 key, value 출력**

``` swift
for (name, animal) in namesAndAnimals {
print("\(name) has a \(animal)")
}
```

namesAndAnimals은 [key: value] 형태이다.

각각 key는 name에, value는 animal에 할당되어 모든 원소들을 출력한다.



**Dictionary key만 출력**

1)  _(underscore) 이용

``` swift
for (name, _) in namesAndAnimals {
print(name)
}
```



2) keys 메소드 사용

``` swift
for name in namesAndAnimals.keys {
print(name)
}
```



**Dictionary value만 출력**

1) _(underscore) 이용

``` swift
for (_, animal) in namesAndAnimals {
print(animal)
}
```



2) values 메소드 사용

``` swift
for animal in namesAndAnimals.values {
print(animal)
}
```







## Set

순서가 없고, 중복을 허용하지 않는다.



``` swift
var thisSet: Set<Int> = [1, 2, 3, 1]        //{3,1,2}

thisSet.contains(1)            //true
thisSet.contains(99)        //false

thisSet.insert(5)                //{1,3,5,2}

thisSet.remove(3)                //{5,1,2}

let thatSet: Set<Int> = [2,4,8]

// intersection (교집합)
let intersection = thisSet.intersection(thatSet)

// difference (차집합)
let difference = thisSet.symmetricDifference(thatSet)

// union (합집합)
let union = thisSet.union(thatSet)
```







## Closure



Closure은 **anonymous function** 이라고도 한다.



일반 function과 비교해보자.

``` swift
typealias Operate = (Int, Int) -> (Int)

func add(a: Int, b: Int) -> Int {
return a + b
}

func printOperationResult(_ a: Int, _ b: Int, operation: Operate) {
let result = operation(a, b)
print("Operation result is \(result)")
}

printOperationResult(2, 7, operation: add)    //9
```



위의 add 함수를 closure로 만들어보자 !  

3가지로 만들어 볼 수 있다.   



첫 번째는, 파라미터의 데이터형, returun 타입을 다 적는 방법

``` swift
let add: (Int, Int) -> Int = { (a: Int, b: Int) -> Int in
return a + b
}
```



두 번째는, 파라미터 데이터형, return 타입을 생략하는 방법

``` swift
let add: (Int, Int) -> Int = { (a, b) in
a + b
}
```



세 번째는, 파라미터 이름을 사용하지 않고 각각의 파라미터를 숫자에 부여받는 방법

이 방법은 짧은 코드로 구현할 수 있는 방법이다.

``` swift
let add: (Int, Int) -> Int = {
$0 + $1
}
```



또한, **Closure은 자신의 범위 안에서 변수나 상수의 기능에 가깝게 사용할 수 있다.  **

그 뜻은 변수나 상수처럼 값을 저장하거나 조작할 수 있다는 의미이다.  



간단한 예제를 보자.

``` swift
var count = 0
let increamentCount = {
count += 1
}

incrementCount()
incrementCount()
incrementCount()
print(count)            // 3
```

incrementCount가 3번 호출되면서 count 값은 3이 된다.







## Closures & Collections

위에 설명된 Collections(Array, Dictionary, Set)과 Closures을 어떻게 같이 사용할 수 있는지 알아보자.



``` swift
var foods = ["banana", "pizza", "chicken", "hamburger"]
```



**sort() 와 sort(by: )**

``` swift
//Default는 오름차순
foods.sort()

//내림차순 정렬을 하기 위해 closure을 사용
foods.sort(by: { (a, b) -> Bool in
a > b
})
```

오름차순으로 하면,  ["banana", "chicken", "hamburger", "pizza"] ,  

내림차순으로 하면, ["pizza", "hamburger", "chicken", "banana"] 이다.





**sorted() 와 sorted(by: )**

원하는 조건에 맞는 정렬을 하기 위해 사용하는 메소드이다.  



문자 길이가 긴 순서대로 정렬하게 만들어 보자.

``` swift
let longToShortStrings = foods.sorted {
$0.count > $1.count
}
```

["hamburger", "chicken", "banana", "pizza"] 로 긴 문자 순서대로 출력된다.





####filter

Collection 내부의 값을 걸러서 추출한다.



for문을 사용한 5보다 큰 원소를 찾는 로직이다.

``` swift
var numbers = [5, 2, 6, 9, 4, 1]

var filterResult: [Int] = []
for number in numbers where number > 5 {
filterResult.append(number)
}
print(filterResult)        //[6, 9]
```



위에 주어진 for문을 사용하지 않고, 같은 로직으로 filter를 적용해보자.

``` swift
let filterResult2 = numbers.filter { number -> Bool in
return number > 5
}
```



위에 코드보다 더 짧게 한 줄로 축약할 수 있습니다.

``` swift
let filterResult3 = number.filter { $0 > 5 }
```





####map

Collection 내부의 기존 데이터를 변형하여 새로운 collection을 생성한다.



for문을 사용한 배열의 값들을 2배로 만드는 로직이다.

``` swift
var numbers = [5, 2, 6, 9, 4, 1]

var DoubleNumbers: [Int] = []
for number in numbers {
DoubleNumbers.append(number * 2)
}
print(DoubleNumbers)
```



위에 주어진 for문을 사용하지 않고, 같은 로직으로 map을 적용해보자.

``` swift
let doubleNumber = numbers.map { number -> Int in
return number * 2
}

// [10, 4, 12, 18, 8, 2]
```

map을 통해 numbers의 원소 하나하나에 변형을 줘서 기존 원소에 2배를 한 새로운 배열이 만들어진다.





####reduce

Collection 내부의 모든 내용을 하나로 통합해주는 기능을 한다.



> Array 인 경우에 reduece를 사용하는 예제를 알아보자.

for문을 사용한 배열의 값들을 다 더하는 로직이다.

``` swift
let numbers = [5, 2, 6, 9, 4, 1]
var sum = 0
for number in numbers {
sum += number
}
print(sum)        //27
```



위에 주어진 for문을 사용하지 않고, 같은 로직으로 reduce를 적용해보자.

``` swift
let reduceResult = numbers.reduce(0) { (result, number) -> Int in
return result + number
}
print(reduceResult)        //27
```

.reduce(0)에 0은 초기값으로  result 초기값이 0을 의미합니다.

정수 배열의 모든 값을 더한 값이 출력됩니다.



위에 코드보다 더 짧게 한 줄로 축약할 수 있습니다.

``` swift
let reduceResult2 = numbers.reduce(0, +)
```





> 이제 Dictionary 인 경우에 reduece를 사용하는 예제를 알아보자.

먼저, for문을 사용해 수량에 따른 가격을 가지는 로직이다.

``` swift
var store = [1000: 5, 5000: 2, 3000: 20, 2500: 5, 1800: 30]

var resultForStoreValues: [Int] = []
for (price, quantity) in store {
let value = price * Int(quantity)
resultForStoreValues.append(value)
}
print(resultForStoreValues)
```



위에 주어진 for문을 사용하지 않고, 같은 로직으로 reduce를 적용해보자.

이번엔 배열인 경우에 사용했던 메소드 대신, 아래의 메소드를 사용한다.

``` swift
func reduce<Result>(into initialResult: Result, _ updateAccumulatingResult: (inout Result, (key: Int, value: Int)) throws -> ()) rethrows -> Result
```



``` swift
let storeValues2 = store.reduce(into: []) { result, pair in
result.append(pair.key * Int(pair.value))
}
print(storeValues2)
```



*➤ String 배열인 경우,   stringArray.reduce("") 해주면 된다.*





#### compactMap

compactMap은 nil 값을 필터링 해준다.



for문을 사용해 배열의 원소들을 Int 형으로 변환했을 때, int 형이 되는지 찾는 로직이다.

``` swift
let userInput = ["letter", "3.14", "33", "three"]

var  validInput: [Int] = []
for input in userInput {
guard let input = Int(input) else {
continue
}
validInput.append(input)
}
print(validInput)        //[33]
```



위에 주어진 for문을 사용하지 않고, 같은 로직으로 compactMap을 적용해보자.

``` swift
let validInput2 = userInput.compactMap { input in
Int(input)
}
print(validInput2)        //[33]
```





#### flatMap

여러 배열을 한 개의 배열로 평평하게 만들 때 사용



for문을 사용해 알파벳 "M" 이후로 시작되는 이름을 가진 원소들을 찾는 로직이다.

``` swift
let arrayOfDwarf = [
["Sleepy", "Grumpy", "Doc"],
["Thorin", "Nori"]
]

var dwarvesAfterM: [String] = []
for dwarves in arrayOfDwarf {
var dwarfAfterM: [String] = []
for dwarf in dwarves {
if dwarf > "M" {
dwarfAfterM.append(dwarf)
}
}
dwarvesAfterM += dwarfAfterM
}
print(dwarvesAfterM)
```



위에 주어진 for문을 사용하지 않고, 같은 로직으로 flatMap을 적용해보자.

``` swift
let dwarvesAfterM2 = arrayOfDwarf.flatMap { dwarves -> [String] in
return dwarves.filter({ dwarf -> Bool in
dwarf > "M"
})
}
```



위에 코드보다 더 짧게 축약해보자.

``` swift
let dwarvesAfterM3 = arrayOfDwarf.flatMap {
$0.filter { $0 > "M" }
}
```





참고 : Raywenderlich.com
