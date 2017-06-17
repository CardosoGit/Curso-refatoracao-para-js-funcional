const generateSequenceFromOneUntil = ( max ) => 
  [ ...Array(max).keys() ].slice(1)

const isLowerThan = ( divisors ) => ( number ) => 
  ( number > Math.max( ...divisors ) )

const mergeInArray = ( x, y ) => [].concat( x,y )

const hasDivisor = ( number ) => ( cur ) => 
  ( ( number % cur ) === 0 )

const divisors = generateSequenceFromOneUntil( 10 )
const isLower = isLowerThan( divisors )

const allDivisors = ( number ) => 
  ( isLower( number ) ) 
    ? mergeInArray( divisors, number ) 
    : divisors

const yesIsPrime = ( number ) => `O numero ${number} é primo` 
const notIsPrime = ( number ) => `Ops, o numero ${number} não é primo, pois é divisivel por mais de 2 números inteiros [${primeTest(number)}]` 
 
const primeTest = (number) => allDivisors( number ).filter( hasDivisor( number ) )

const hasONLYTwoDivisors = ( number ) => primeTest(number).length === 2

const isPrime = (number) => 
  ( hasONLYTwoDivisors( number )  )
    ? yesIsPrime( number )
    : notIsPrime( number )


console.log(isPrime(11))
console.log(isPrime(10)) // Ops, o numero 10 não é primo, pois é divisivel por mais de 2 números inteiros [1,2,5,10]
// console.log(isPrime(100003)) // O numero 100003 é primo
// // // ESTA ERRADO
// console.log(isPrime(100004)) // Ops, o numero 100004 não é primo, pois é divisivel por mais de 2 números inteiros [1,2,4,100004]
