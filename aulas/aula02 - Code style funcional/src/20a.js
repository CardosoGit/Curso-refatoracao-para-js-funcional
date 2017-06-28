// ✓ ok
const sum = ( x, y ) => x + y
const minus = ( x, y ) => x - y

const resultSum = sum( 3, 5 )
const resultMinus = minus( 5, 3 )

console.log( 'resultSum', resultSum )
console.log( 'resultMinus', resultMinus )


// ✗ evite
const sum = ( x, y ) => x + y
const minus = ( x, y ) => x - y
const resultSum = sum( 3, 5, )
const resultMinus = minus( 5, 3 )
console.log( 'resultSum', resultSum )
console.log( 'resultMinus', resultMinus )