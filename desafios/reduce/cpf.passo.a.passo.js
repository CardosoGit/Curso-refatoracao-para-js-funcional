const mod11 = ( num ) => num % 11 

const testDigit = ( num ) => 
  ( num < 2 )
    ? 0
    : 11 - num

const getCpfToCheck = ( cpf ) => 
  ( cpf.map )
    ? cpf.slice( 0, 9 )
    : cpf.substr( 0, 9 ).split( '' )

const CPF1 = '04998264931'
let total = 10

const toSumOfMultiplication = ( total ) => ( result, num, i ) => 
  result + ( num * total-- )

const getSumOfMultiplication = ( list, total ) => 
  list.reduce( toSumOfMultiplication( total ), 0 )


const getTwoLastDigits = ( cpf ) => `${cpf.charAt( 9 )}${cpf.charAt( 10 )}` 
const mergeDigits = ( num1, num2 ) => `${num1}${num2}`

const isEqual = ( a ) => ( b ) => b === a


const generateStringSequence = ( times ) => ( char ) => `${char}`.repeat( times )
const generateArray = ( length ) => Array.from( { length }, ( v, k ) => k )

const sequenceFrom0To9 = generateArray( 10 )
const generateSequenceSize11 = generateStringSequence( 11 )

const isIn = ( list ) => ( value ) => 
  list.findIndex( v => value === v ) >= 0

const validate = ( cpfFull ) => {
  
  const cpf = getCpfToCheck( cpfFull )
  const firstDigit = testDigit( mod11( getSumOfMultiplication( cpf, 10 ) ) )
  const secondDigit = testDigit( mod11( 
                                    getSumOfMultiplication( cpf.concat( firstDigit ), 
                                                            11 ) ) )

  return !isIn( generateArray( 10 ).map( generateSequenceSize11 ) )( cpfFull ) &&
    isEqual( getTwoLastDigits( cpfFull ) )( mergeDigits( firstDigit, secondDigit ) )

}

// console.log( CPF1, validate( CPF1 ) ) //true


const CPFS = [ 
  '04998264931', '03506838326','04864713901',
  '03506838321', '22222222222', '00000000000' 
  ]

CPFS.forEach( ( cpf ) => console.log( `${cpf}: ${validate( cpf )}` ) )