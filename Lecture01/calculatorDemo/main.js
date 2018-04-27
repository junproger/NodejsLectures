const calculator = require('./calculator');
const constants = require('./constants');

console.log(constants.HELLO);
console.log("22 + 479 = " + calculator.add(22, 479));
console.log("22 - 479 = " + calculator.sub(22, 479));
console.log("22 * 479 = " + calculator.mult(22, 479));
console.log("22 / 479 = " + calculator.div(22, 479));
