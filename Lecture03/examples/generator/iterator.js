

function customIterator(array) {
    let index = -1;

    return {
        next() {
            index++;
            if (index < array.length) {
                return {
                    value: array[index],
                    done: false
                }
            }

            return {
                done: true
            }
        }
    }
}

let myIterator = customIterator(["a", "b", "c", "d"]);

console.log(myIterator.next());
console.log(myIterator.next());
console.log(myIterator.next());
console.log(myIterator.next());
console.log(myIterator.next());
