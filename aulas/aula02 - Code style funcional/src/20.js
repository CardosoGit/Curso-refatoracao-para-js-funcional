// ✓ ok
const sum = ( x, y ) => x + y
const minus = ( x, y ) => x - y

const resultSum = sum( 3, 5 )
console.log( 'resultSum', resultSum )

const resultMinus = minus( 5, 3 )
console.log( 'resultMinus', resultMinus )


// ✗ evite
// const sum = ( x, y ) => x + y
// const minus = ( x, y ) => x - y
// const resultSum = sum( 3, 5, )
// console.log( 'resultSum', resultSum )
// const resultMinus = minus( 5, 3 )
// console.log( 'resultMinus', resultMinus )
