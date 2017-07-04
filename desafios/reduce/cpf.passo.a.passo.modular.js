const mod11 = require( '../../lib/mod' )( 11 )
const NOT = require( '../../lib/not' )
const isEqual = require( '../../lib/isEqual' ) 
const isIn = require( '../../lib/isIn' ) 
const mergeDigits = require( '../../lib/mergeToString' ) 
const generateArray = require( '../../lib/generate.Array' )
const generateStringSequence = require( '../../lib/generate.String.sequence' )

const getTwoLastDigits = ( cpf ) => `${cpf[ 9 ]}${cpf[ 10 ]}`
const getCpfToCheckInArray = ( cpf ) => cpf.substr( 0, 9 ).split( '' )

const isSameDigitsCPF = ( cpfFull ) => 
  isIn( generateArray( 10 ).map( generateStringSequence( 11 ) ) )( cpfFull )

const toSumOfMultiplication = ( total ) => ( result, num, i ) => 
  result + ( num * total-- )

const getSumOfMultiplication = ( list, total ) => 
  list.reduce( toSumOfMultiplication( total ), 0 )

const getValidationDigit = ( total ) => ( cpf ) =>
  getDigit( mod11( getSumOfMultiplication( cpf, total ) ) )

const getDigit = ( num ) => 
  ( num > 1 )
    ? 11 - num
    : 0

const isValidCPF = ( cpfFull ) => {
  const cpf = getCpfToCheckInArray( cpfFull )
  const firstDigit = getValidationDigit( 10 )( cpf )
  const secondDigit = getValidationDigit( 11 )( cpf.concat( firstDigit ) )

  return isEqual( getTwoLastDigits( cpfFull ) )
                ( mergeDigits( firstDigit, secondDigit ) )
}

const validate = ( cpfFull ) => 
  NOT( isSameDigitsCPF( cpfFull ) ) && isValidCPF( cpfFull )




const CPFS = [ 
  '04998264931', '03506838326','04864713901',
  '03506838321', '22222222222', '00000000000' 
  ]

CPFS.forEach( ( cpf ) => console.log( `${cpf}: ${validate( cpf )}` ) )