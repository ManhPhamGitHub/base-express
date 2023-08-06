# A -> Z

```javascript
let fruits = ['Apples', 'Watermelon', 'Bananas', 'Cherries'];
fruits.sort();    // 👈 default sort

console.log( fruits );
// ["Apples", "Bananas", "Cherries", "Watermelon"]
// A → B → C → W
```
 
 # Z -> A
 
 ```javascript
let fruits = ['Apples', 'Watermelon', 'Bananas', 'Cherries'];
fruits.sort((a, b) => b.localeCompare(a));

console.log( fruits );
// ["Watermelon", "Cherries", "Bananas", "Apples"]
// W → C → B → A
 ```

# phân biệt hoa thường tăng dần (aA đến zZ)

```javascript
let fruits = ['Apples', 'Watermelon', 'Bananas', 'cherries'];
fruits.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())); 

console.log( fruits );
// ["Apples", "Bananas", "cherries", "Watermelon"]
// A → B → c → W
```

```javascript
let fruits = ['Apples', 'Watermelon', 'Bananas', 'cherries'];
fruits.sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' })); 

console.log( fruits );
// ["Apples", "Bananas", "cherries", "Watermelon"]
```

# Number tăng dần

```javascript
let numbers = [4, 2, 5, 1, 3, 10];
numbers.sort((a, b) => a - b);   // 👈 compare function, simply return a - b

console.log( numbers );
// [1, 2, 3, 4, 5, 10]
```

# Number giảm dần

```javascript
let numbers = [4, 2, 5, 1, 3, 10];
numbers.sort((a, b) => b - a);   // 👈 interchange `a` & `b` and return b - a

console.log( numbers );
// [10, 5, 4, 3, 2, 1]
```

# Date tăng dần

```javascript
let dates = [ '2021-08-1', '2021-08-4', '2021-08-10', '2021-08-2' ];
dates.sort((a, b) => new Date(a) - new Date(b))  // 👈 using `Date` constructor here

console.log( dates )
// ["2021-08-1", "2021-08-2", "2021-08-4", "2021-08-10"]
```

# Date giảm dần

```javascript
let dates = [ '2021-08-1', '2021-08-4', '2021-08-10', '2021-08-2' ];
dates.sort((a, b) => new Date(b) - new Date(a))  // 👈  here

console.log( dates )
// ["2021-08-10", "2021-08-4", "2021-08-2", "2021-08-1"]
```

# object by key tăng dần

```javascript
let inventory = [
  {name: 'Bananas', quantity: 5},
  {name: 'Apples',  quantity: 10},
  {name: 'Grapes',  quantity: 2}
];

// Sort by the "quantity" property value
inventory.sort((a, b) => a.quantity - b.quantity);  // 👈 here

console.log( inventory )
// Output
/*
[
  { "name": "Grapes",  "quantity": 2 },
  { "name": "Bananas", "quantity": 5 },
  { "name": "Apples",  "quantity": 10 }
]
*/
```

# object by key giảm dần

```javascript
let inventory = [
  {name: 'Bananas', quantity: 5},
  {name: 'Apples',  quantity: 10},
  {name: 'Grapes',  quantity: 2}
];

// Sort by the "quantity" property value
inventory.sort((a, b) => b.quantity - a.quantity);  // 👈 interchange `a` & `b` here

console.log( inventory )
// Output
/*
[
  { "name": "Apples",  "quantity": 10 },
  { "name": "Bananas", "quantity": 5 },
  { "name": "Grapes",  "quantity": 2 }
]
*/
```

# object by multi key

```javascript
let inventory = [
  {name:"Bananas", color:"Yellow", quantity:5},
  {name:"Apples", color:"Red", quantity:4},
  {name:"Apples", color:"Green", quantity:10},
  {name:"Grapes", color:"Green", quantity:2},
  {name:"Apples", color:"Yellow", quantity:6}
];

// Sort by the "name" property value, then by "quantity"
inventory.sort((a, b) => {
  let compareNames = a.name.localeCompare(b.name);
  let compareQuantity = a.quantity - b.quantity;

  // First compare using names
  // If values for "name" porperty for both a & b is same,
  // then compare by "quantity" property value
  return compareNames || compareQuantity;
})
```

```javascript
inventory.sort((a, b) => a.name.localeCompare(b.name) || a.quantity - b.quantity);
```


