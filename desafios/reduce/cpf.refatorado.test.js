const NOT = ( a ) => !a
const times = ( a ) => ( b ) => b * a 
const mod11 = ( num ) => num % 11 
const times10 = ( num ) => times( 10 )( num )
const isEqual = ( a ) => ( b ) => b === a
const isNotEqual = ( a ) => ( b ) => !( isEqual( a )( b ) )
const getDigit = ( cpf ) => `${cpf.charAt( 9 )}${cpf.charAt( 10 )}` 
const getGeneratedDigit = ( sum1, sum2 ) => times10( sum1 ) + sum2 + ''
const generateStringSequence = ( tam ) => ( num ) => `${num}`.repeat( tam )
const generateArray = ( length ) => Array.from( { length }, ( v, k ) => k )

const generateSum = times
const generateSequenceSize11 = generateStringSequence( 11 )

const inSameDigits = ( cpf ) => ( num ) => 
  isEqual( cpf )( generateSequenceSize11( num ) )

const isIn = ( list ) => ( value ) => 
  list.findIndex( inSameDigits( value ) ) >= 0

const testIfHasSameDigits = ( list ) => ( cpf ) =>
  ( isIn( list )( cpf ) )

const getResultOfSum1 = ( sum1 ) =>
  ( isNotEqual( mod11( times10( sum1 ) ), 10 ) ) // ( isNotEqual( mod11(  sum1  ), 1 ) )
    ? ( mod11( times10( sum1 ) ) )
    : 0 

const getResultOfSum2 = ( sum1, sum2 ) =>
  ( mod11( times10( sum2 + ( times( 2 )( sum1 ) ) ) ) )

const toSums = ( total ) => ( [ sum2, sum1 ] , n ) =>
  [ sum2 + generateSum( n )( total ), 
    sum1 + generateSum( n )( --total ) 
  ] 

const getSums = ( cpf, total = 11 ) => 
  cpf.split( '' )
      .slice( 0, 9 )
      .reduce( toSums( total ), [ 0, 0 ] )
      .reverse()

const getResultOfSums = ( [ sum1, sum2 ] ) => {
  const resultOfSum1 = getResultOfSum1( sum1 )
  return [ resultOfSum1, getResultOfSum2( resultOfSum1, sum2 ) ]
}

const validate = ( cpf ) => {
  const CPF_LENGTH = 11
  const [ result1, result2 ] = getResultOfSums( getSums( cpf, CPF_LENGTH ) )
  
  return (  
    NOT( testIfHasSameDigits( generateArray( 10 ) )( cpf ) ) &&
    NOT( getGeneratedDigit( result1, result2 ) !== getDigit( cpf ) ) 
  )
}

const CPFS = [ 
  '04998264931', '03506838326', 
  '03506838321', '22222222222', '00000000000' 
  ]

CPFS.forEach( ( cpf ) => console.log( `${cpf}: ${validate( cpf )}` ) )

module.exports = validate