const unmaskNumbers = ( num ) => num.match( /\d+/g ).join( '' )
const mod11 = ( num ) => num % 11 
const NOT = ( x ) => !x
const isEqual = ( a ) => ( b ) => b === a 
const mergeDigits = ( num1, num2 ) => `${num1}${num2}`
const getTwoLastDigits = ( cpf ) => `${cpf[ 9 ]}${cpf[ 10 ]}`
const getCpfToCheckInArray = ( cpf ) => cpf.substr( 0, 9 ).split( '' )
const generateArray = ( length ) => Array.from( { length }, ( v, k ) => k )
const isSameValuesInString = ( arr ) => 
  arr.split( '' ).every( ( elem ) => elem === arr[ 0 ] )

const isIn = ( list ) => ( value ) => 
  list.findIndex( v => value === v ) >= 0

const isSameDigitsCPF = ( cpf ) => isSameValuesInString( unmaskNumbers( cpf )  )

const generateStringSequence = ( times ) => ( char ) => 
  ( `${char}`.repeat( times ) )

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
  const cpf = getCpfToCheckInArray( unmaskNumbers( cpfFull )  )
  const firstDigit = getValidationDigit( 10 )( cpf )
  const secondDigit = getValidationDigit( 11 )( cpf.concat( firstDigit ) )

  return isEqual( getTwoLastDigits( unmaskNumbers( cpfFull )  ) )
                ( mergeDigits( firstDigit, secondDigit ) )
}

const validate = ( cpfFull ) => 
  NOT( isSameDigitsCPF( cpfFull ) ) && isValidCPF( cpfFull )




const CPFS = [ 
  '04998264931', '03506838326','048.647.139-01',
  '03506838321', '22222222222', '00000000000', '11111111111',
  ]

CPFS.forEach( ( cpf ) => console.log( `${cpf}: ${validate( cpf )}` ) )