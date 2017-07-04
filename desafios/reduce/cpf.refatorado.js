const getLength = ( a ) => a.length
const mod11 = ( num ) => num % 11 
const times10 = ( num ) => num * 10
const isEqual = ( a ) => ( b ) => b === a
const isNotEqual = ( a ) => ( b ) => !( isEqual( a )( b ) )
const generateSum = ( i ) => ( vlr ) => i * vlr 
const getDigit = ( cpf ) => cpf.charAt( 9 ) + cpf.charAt( 10 )
const getGeneratedDigit = ( sum1, sum2 ) => ( sum1 * 10 ) + sum2
const generateStringSequence = ( tam ) => ( num ) => `${num}`.repeat( tam )


const onlyAllowedCPFs =  ( cpf ) => ( num ) => 
  isEqual( cpf )( generateSequenceSize11( num ) )

const testSameDigits = ( list ) => ( cpf ) =>
  getLength( list.filter( onlyAllowedCPFs( cpf ) ) )

const getResultOfSum1 = ( sum1 ) =>
  ( isNotEqual( mod11( times10( sum1 ) ), 10 ) )
    ? ( mod11( times10( sum1 ) ) )
    : 0 

const getResultOfSum2 = ( sum1, sum2 ) =>
  ( mod11( times10( sum2 + ( 2 * sum1 ) ) ) )

const toSums = ( cpf, total ) => ( [ sum1, sum2 ] , n, i ) => {
  const some = generateSum( cpf.charAt( i ) )
  
  sum1 += some( total - 1 )
  sum2 += some( total )
  total--

  return [ sum1, sum2 ] 
}

const getSums = ( cpf, vlr ) => 
  cpf.split( '' )
      .slice( 0, 9 )
      .reduce( toSums( cpf, vlr ), [ 0, 0 ] )

const validate = ( cpf ) => {
  const sameDigits = Array.from( { length: 10 }, ( v, k ) => k )
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
