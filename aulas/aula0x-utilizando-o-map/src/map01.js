const numbers = [ 1, 2, 3, 4, 5 ]
let square = []

for( let i = 0; i < numbers.length; i++ ) {
  square[ i ] = numbers[ i ] * numbers[ i ]
  //square.push( numbers[ i ] * numbers[ i ] )
}

console.log('square: ', square)
// square:  [ 1, 4, 9, 16, 25 ]

const resultado = square.reverse()

console.log('resultado: ', resultado)
// resultado:  [ 25, 16, 9, 4, 1 ]