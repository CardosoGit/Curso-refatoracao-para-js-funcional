const times = ( i ) => ( vlr ) => i * vlr 
const mod11 = ( num ) => num % 11 
const times10 = ( num ) => times( 10 )( num )
const isEqual = ( a ) => ( b ) => b === a
const isNotEqual = ( a ) => ( b ) => !( isEqual( a )( b ) )
const getDigit = ( cpf ) => cpf.charAt( 9 ) + cpf.charAt( 10 )
const getGeneratedDigit = ( sum1, sum2 ) => times10( sum1 ) + sum2
const generateStringSequence = ( tam ) => ( num ) => `${num}`.repeat( tam )
const gerenateArray = ( length ) => Array.from( { length }, ( v, k ) => k )

const generateSum = times

const inSameDigits =  ( cpf ) => ( num ) => 
  isEqual( cpf )( generateSequenceSize11( num ) )

const isIn = ( list ) => ( value ) => 
  list.findIndex( inSameDigits( value ) ) >= 0

const testSameDigits = ( list ) => ( cpf ) =>
  ( isIn( list )( cpf ) )

const getResultOfSum1 = ( sum1 ) =>
  ( isNotEqual( mod11( times10( sum1 ) ), 10 ) )
    ? ( mod11( times10( sum1 ) ) )
    : 0 

const getResultOfSum2 = ( sum1, sum2 ) =>
  ( mod11( times10( sum2 + ( times( 2 )( sum1 ) ) ) ) )

const toSums = ( total ) => ( [ sum1, sum2 ] , n, i ) => {

  const some = generateSum( n.charAt( 0 ) )
  
  sum1 += some( total - 1 )
  sum2 += some( total )
  total--

  return [ sum1, sum2 ] 
}

const getSums = ( cpf, vlr = 11 ) => 
  cpf.split( '' )
      .slice( 0, 9 )
      .reduce( toSums( vlr ), [ 0, 0 ] )

const validate = ( cpf ) => {
  const sameDigits = gerenateArray( 10 )
  let [ sum1, sum2 ] = getSums( cpf, 11 )
  
  sum1 = getResultOfSum1( sum1 )
  sum2 = getResultOfSum2( sum1, sum2 )

  return (  !( testSameDigits( sameDigits )( cpf ) ) &&
            !( getGeneratedDigit( sum1, sum2 ) != getDigit( cpf ) ) )
}

const generateSequenceSize11 = generateStringSequence( 11 )

const CPFS = [ 
  '04998264931', '03506838326', 
  '03506838321', '22222222222', '00000000000' 
  ]

CPFS.forEach( ( cpf ) => console.log( `${cpf}: ${validate( cpf )}` ) )

module.exports = validate