const calculations = require('calculations');

x = parseInt(process.argv[2]);
y = parseInt(process.argv[3]);

const addition = calculations.add(x, y);
console.log(`${x} + ${y} is equal to ${addition}`);

const subtraction = calculations.subtract(x, y);
console.log(`${x} - ${y} is equal to ${subtraction}`);