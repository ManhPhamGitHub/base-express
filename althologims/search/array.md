# Return về một array chứa những elements chung của hai array

> Array
```javascript
const arr1 = [1, 2, 3, 4, 5 , 8 ,9], arr2 = [5, 6, 7, 8, 9];

const intersection = arr1.filter(function (val) { return arr2.indexOf(val) > -1 })
console.log(intersection) //[5, 8, 9]
```

> Array Object
```javascript
const arr1 = [{ name: 'name1', id: 1 }, { name: 'name2', id: 2 }, { name: 'name3', id: 3 }, { name: 'name5', id: 5 }];
const arr2 = [{ name: 'name1', id: 1 }, { name: 'name2', id: 2 }, { name: 'name3', id: 3 }, { name: 'name4', id: 4 }, { name: 'name5', id: 5 }];

const result = arr2.filter(function (v) {
  return arr1.some(n => JSON.stringify(n) === JSON.stringify(v))
});
console.log(result); // [{ name: 'name1', id: 1 },{ name: 'name2', id: 2 },{ name: 'name3', id: 3 },{ name: 'name5', id: 5 }]
```


# Return về một array chứa tất cả những elements của hai array không trùng lặp

> Array
```javascript
const arr1 = [1, 2, 3, 4, 5, 8, 9]
const arr2 = [5, 6, 7, 8, 9];
const result = arr1.concat(arr2.filter(v => !arr1.includes(v)))
console.log(result) //[1, 2, 3, 4, 5, 8, 9]
```

> Array Object
```javascript
const arr1 = [{ name: 'name1', id: 1 }, { name: 'name2', id: 2 }, { name: 'name3', id: 3 }];
const arr2 = [{ name: 'name1', id: 1 }, { name: 'name4', id: 4 }, { name: 'name5', id: 5 }];
let arr3 = arr1.concat(arr2);
let result = [];
let obj = [];
result = arr3.reduce(function (prev, cur, index, arr) {
  obj[cur.id] ? '' : obj[cur.id] = true && prev.push(cur);
  return prev;
}, []);
console.log(result); //[{ name: 'name1', id: 1 },{ name: 'name2', id: 2 },{ name: 'name3', id: 3 },{ name: 'name4', id: 4 },{ name: 'name5', id: 5 }]
```


# Return về một array chứa tất cả những elements của array thứ nhất không trùng với array thứ 2

> Array
```javascript
const arr1 = [1, 2, 3, 4, 5, 8, 9];
const arr2 = [5, 6, 7, 8, 9];
const diff = arr1.filter(item => !new Set(arr2).has(item));
console.log(diff) //[ 1, 2, 3, 4 ]
```

> Array Object
```javascript
let arr1 = [{ name: 'name1', id: 1 }, { name: 'name2', id: 2 }, { name: 'name3', id: 3 }];
let arr2 = [{ name: 'name1', id: 1 }, { name: 'name4', id: 4 }, { name: 'name5', id: 5 }];
let result = arr1.filter(function (v) {
  return arr2.every(n => JSON.stringify(n) !== JSON.stringify(v))
});
console.log(result); // [ { name: 'name2', id: 2 }, { name: 'name3', id: 3 } ]
```


# Return về một array chứa tất cả những elements không trùng giữa hai Array

> Array
```javascript
const arr1 = [1, 2, 3, 4, 5, 8, 9];
const arr2 = [5, 6, 7, 8, 9];
const difference = Array.from(new Set(arr1.concat(arr2).filter(v => !new Set(arr1).has(v) || !new Set(arr2).has(v)))) 
console.log(difference) //[ 1, 2, 3, 4, 6, 7 ]
```

> Array Object
```javascript
let arr1 = [{ name: 'name1', id: 1 }, { name: 'name2', id: 2 }, { name: 'name3', id: 3 }];
let arr2 = [{ name: 'name1', id: 1 }, { name: 'name4', id: 4 }, { name: 'name5', id: 5 }];
let arr3 = arr1.concat(arr2);
let result = arr3.filter(function (v) {
  return arr1.every(n => JSON.stringify(n) !== JSON.stringify(v)) || arr2.every(n => JSON.stringify(n) !== JSON.stringify(v))
});
console.log(result); // [{ name: 'name2', id: 2 },{ name: 'name3', id: 3 },{ name: 'name4', id: 4 },{ name: 'name5', id: 5 }]
```


# Tìm max element trong array và array object

> Array
```javascript
Math.max(...[1, 2, 3, 4]); //4
Math.max.apply(this, [1, 2, 3, 4]) //4
[1, 2, 3, 4].reduce((prev, cur, curIndex, arr) => {
   return Math.max(prev, cur);
}, 0) //4
```

> Array Object
```javascript
const arr = [{ id: 1, name: 'jack' },{ id: 2, name: 'may' },{ id: 3, name: 'shawn' },{ id: 4, name: 'tony' }];
const arr1 = Math.max.apply(Math, arr.map(item => { return item.id }));
const arr2 = arr.sort((a, b) => { return b.id - a.id })[0].id;
console.log(arr1); // 4
console.log(arr2) // 4
```

# Tìm SUM trong array và array object

> Array
```javascript
[1, 2, 3, 4].reduce(function (prev, cur) {
  return prev + cur;
}, 0) //10 
````

> Array Object
```javascript
const sum = [{age:1},{age:2}].reduce(function (prev, cur) {
  return prev + cur.age;
}, 0); //3
console.log(sum)
````

# Check điều kiện phù hợp của Array

> Array
```javascript
console.log([1, 2, 3].includes(4)) //false
console.log([1, 2, 3].indexOf(4)) //-1 
console.log([1, 2, 3].find((item) => item === 3)) //3 
console.log([1, 2, 3].findIndex((item) => item === 3)) //2 
```

> Array Object
```javascript
const flag = [{age:1},{age:2}].some(v=>JSON.stringify(v)===JSON.stringify({age:2}))
console.log(flag)
```

# Tìm element trong một array và array object

> Array
```javascript
[1, 2, 3].every(item => { return item > 2 });
``` 
 
> Array Object
```javascript
 const arr = [{ age: 3 }, { age: 4 }, { age: 5 }];
 arr.every(item => { return item.age > 2 }) // true
 ``` 

