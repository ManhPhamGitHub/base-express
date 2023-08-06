# with Array

```javascript
console.log(Array.from(new Set([1, 2, 3, 3, 4, 4]))); //[1,2,3,4]
console.log([...new Set([1, 2, 3, 3, 4, 4])]); //[1,2,3,4]
```

# with Array Object

```javascript
const arr = [{ name: 'name1', id: 1 }, { name: 'name2', id: 2 }, { name: 'name3', id: 3 }, { name: 'name1', id: 1 }, { name: 'name4', id: 4 }, { name: 'name5', id: 5 }];
 const result = [];
 arr.forEach(item=>{
    !result.some(v => JSON.stringify(v) === JSON.stringify(item)) && result.push(item)
 });
 console.log(result) //[{ name: 'name1', id: 1 },{ name: 'name2', id: 2 },{ name: 'name3', id: 3 },{ name: 'name4', id: 4 },{ name: 'name5', id: 5 }]
```