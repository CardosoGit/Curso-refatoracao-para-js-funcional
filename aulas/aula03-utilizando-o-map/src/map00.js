let numbers = [ 1, 2, 3, 4, 5 ]
let square = []

for( let i = 0; i < numbers.length; i++ ) {
    square[ i ] = numbers[ i ] * numbers[ i ]
}

console.log('square: ', square)