// The prime factors of 13195 are 5, 7, 13 and 29.

// What is the largest prime factor of the number 600851475143 ?

const NUM = 600851475143

const getLength = ( n ) => Math.floor( Math.sqrt( n ) ) - 1 
const isPrime = ( n ) =>
  ( n > 1 && Array.from( { length: getLength( n ) }, ( v, k ) => k + 2 )
                  .every( m => n % m ) 
  )

 const generateRange = ( from, to ) => 
  Array.from( { length: to - from + 1 }, ( v, k ) => k + from)

const from = 1
const to = Math.sqrt( NUM ) 

 console.log (
    `largest prime factor of the number 600851475143 are : `,
    generateRange( from, to ).filter( isPrime )
                              .filter( ( prime ) => NUM % prime === 0  )
  )

