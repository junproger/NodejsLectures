function *getNumbers() {
    yield 1;
    yield 2;
    return 3;
}
 
const myGetNumbers = getNumbers();
console.log(myGetNumbers.next()); // => {value: "1", done: false}
console.log(myGetNumbers.next()); // => {value: "2", done: false}
console.log(myGetNumbers.next()); // => {value: "3", done: true}
console.log(myGetNumbers.next()); // => {value: undefined, done: true}