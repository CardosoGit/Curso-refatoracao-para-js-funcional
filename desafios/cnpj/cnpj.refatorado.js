const unmaskNumbers = ( num ) => num.match(/\d+/g).join('')
const NOT = ( x ) => !x

const getS = ( numCnpj ) => numCnpj.length - 2
const getData = ( numCnpj, s ) => [
  numCnpj.substr( 0, s ),
  0,
  s - 7
]

const getSomeData = ( t, b, s, p, i ) => [
  t + ( b.charAt( s - i ) * p ), 
  ( --p < 2 ? 9 : p )
]

const getR = ( t ) => 
  ( t < 2 )
    ? 0 
    : 11 - t

const getDigit = ( numCnpj, s ) => {

  let [ b, t, p ] = getData( numCnpj, s )

  for ( let i = s; i >= 1; i-- )
    [ t, p ] = getSomeData( t, b, s, p, i )

  return getR( t % 11 )
}

const getValidationDigits = ( numCnpj, s ) => [ 
  getDigit( numCnpj, s ), 
  getDigit( numCnpj, s + 1 ) 
]

const isInvalidDigit = ( d1, d2 ) => String( d1 ) !== String( d2 )
const isRepeatingChars = ( str ) => 
  str.split( '' ).every( ( elem ) => elem === str[ 0 ] )

const isInvalidCnpj = ( numCnpj ) =>
  ( numCnpj.length !== 14 || isRepeatingChars( numCnpj ) )

const validateCnpj = ( DV = [], digits = [] ) => 
  ( digits.length === 2 && DV.length === 2 )
    ? NOT( isInvalidDigit( digits[ 0 ], DV[ 0 ] ) || 
      isInvalidDigit( digits[ 1 ], DV[ 1 ] ) )
    : false

const isValidCnpj = ( numCnpj ) =>
  validateCnpj( numCnpj.substr( getS( numCnpj ) ),
                getValidationDigits( numCnpj, getS( numCnpj ) ) )

const testIfIsValid = ( numCnpj ) => 
  ( !( isInvalidCnpj( numCnpj ) ) && isValidCnpj( numCnpj ) )

const validate = ( cnpj ) => testIfIsValid( unmasker( cnpj ) )


module.exports = validate
