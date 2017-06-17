const NOT = ( i ) => !i

const isEvenAndIsNotTwo = ( num ) => {
  console.log('isEvenAndIsNotTwo')
  return true
}

const hasIntegerSquareRoot = ( num ) => {
  console.log('isEvenAndIsNotTwo')
  return false
}

const hasDivisor = ( num ) => {
  console.log('isEvenAndIsNotTwo')
  return false
}

const isPrime = (num) => 
  NOT ( isEvenAndIsNotTwo( num ) ||
        hasIntegerSquareRoot( num ) ||
        hasDivisor( num ) )


console.log('isPrime 10002', isPrime(10002))
// console.log('isPrime 10003', isPrime(10003))
// console.log('isPrime 10007', isPrime(10007))