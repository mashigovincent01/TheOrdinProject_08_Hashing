
const HashMap = require("./HashMap");

// Testing the HashMap implementation
const test = new HashMap(0.75);
test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');

// Overwrite some values
test.set('apple', 'green');
test.set('banana', 'ripe');

// Add one more to exceed load factor
test.set('moon', 'silver');

// Check the states
console.log(test.get('apple')); // 'green'
console.log(test.has('banana')); // true
console.log(test.length()); // Should reflect the number of entries
console.log(test.keys()); // Array of keys
console.log(test.values()); // Array of values
console.log(test.entries()); // Array of [key, value] pairs

// Remove a key
test.remove('carrot');
console.log(test.has('carrot')); // false

// Clear the map
test.clear();
console.log(test.length()); // 0
