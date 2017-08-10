/**
Consider the term x+y√+z√−−−−−−−−−−−√x+y+z that is representing a 
nested square root. xx, yy and zz are positive integers and yy and zz are 
not allowed to be perfect squares, so the number below the outer square 
root is irrational. Still it can be shown that for some combinations of 
xx, yy and zz the given term can be simplified into a sum and/or difference 
of simple square roots of integers, actually denesting the square roots in 
the initial expression.

You are given that F(10)=17, F(15)=46, F(20)=86, 
F(30)=213 and F(100)=2918 and F(5000)=11134074.
Find F(5000000).
*/

const testX = ( x, n ) => ( x > 0 && x <= n )

const F = ( n ) => {
  if ( !testX( x, n ) ) {
    return false
  }
}

const getFactors = ( n ) => {
  let i = n
  let factors = []

  while( i-- ) {
    if ( !( n % i ) && ( n / 2 !== i ) ) factors.push( i )
  }
  console.log('factors: ', factors)
  return factors
}

const resolveToX = ( x, y, z ) => {
  console.log( '\n\nValues of x, y, z: ', x, y, z )
  const squareOfX = Math.sqrt( x )
  const firstFactorOfX = Math.ceil( squareOfX )
  const secondFactorOfX = Math.floor( squareOfX )
  console.log('firstFactorOfX: ', firstFactorOfX)
  console.log('secondFactorOfX: ', secondFactorOfX)

  if ( firstFactorOfX + secondFactorOfX === x) {

    return [ firstFactorOfX, secondFactorOfX ]

  } else if ( y === z ) {

    const factors = getFactors( y )
    const sum = factors.reduce( ( res, curr ) => {
      if ( res[ 0 ] < x  ) {
        res[ 0 ] = res[ 0 ] + curr
        
        return res.concat( curr )
      }

      return res
    }, [ 0 ] )

    console.log('sum: ', sum)
    return sum.slice( 1 )
  }
}

const resolve = ( x, y, z ) => 
  Math.sqrt( x + Math.sqrt( y ) + Math.sqrt( z ) )
// console.log('resolve: ', resolve( 3, 2, 2 ) )

const x = 3
const y = 2
const z = 2

// console.log('resolveToX: ', resolveToX( 3, 2, 2 ) )
console.log('resolveToX: ', resolveToX( 8, 15, 15 ) )
// console.log('resolveToX: ', resolveToX( 20, 96, 12 ) )
// console.log('resolveToX: ', resolveToX( 7, 3, 27 ) )
// console.log('resolveToX: ', resolveToX( 7, 12, 12 ) )
// console.log('resolveToX: ', resolveToX( 7, 27, 3 ) )
