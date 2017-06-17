const divisors = [...Array(10).keys()].slice(1)

const mergeInArray = ( a, b ) => 
  [].concat( a, b ) 

const getGreater = ( divisors ) => Math.max( ...divisors )

const isGreaterThan = ( divisors ) => ( number ) =>
  ( number > getGreater( divisors ) )

const allDivisors = ( number ) => 
  ( isGreaterThan( divisors )( number ) )
    ? mergeInArray( divisors, number )
    : divisors

const ifHasDivisor = ( number ) => ( cur ) => 
  ( ( number % cur ) === 0 )

const primeTest = ( number ) => 
  allDivisors( number ).filter( ifHasDivisor( number ) )

const yesIsPrime = ( number ) => `O numero ${number} é primo`
const notIsPrime = ( number ) => `Ops, o numero ${number} não é primo, 
pois é divisivel por mais de 2 números inteiros [${primeTest(number)}]` 

const hasONLYTwoDivisors = ( number ) => 
  ( primeTest( number ).length === 2 )

const isPrime = ( number ) => 
  ( hasONLYTwoDivisors( number ) )
    ? yesIsPrime( number ) 
    : notIsPrime( number )

console.log(isPrime(289)) // Ops, o numero 10 não é primo, pois é divisivel por mais de 2 números inteiros [1,2,5,10]
// console.log(isPrime(100003)) // O numero 100003 é primo
// console.log(isPrime(100004)) // Ops, o numero 100004 não é primo, pois é divisivel por mais de 2 números inteiros [1,2,4,100004]
