const getCharCode = String.fromCharCode

const isSpace = ( x ) => ( x === 32 )
const isLowerThenN = ( x ) => ( x <= 78 )
const isInRange = ( min, max ) => ( x ) => 
  ( x >= min && x <= max )

const isInRangeAtoZ = isInRange( 65, 90 )

const getCypherCharCode = ( x ) => 
  ( isLowerThenN( x ) )
    ? getCharCode( x + 13 ) //Maior que 'N'
    : getCharCode( x - 13 ) //Menor que 'N'

function rot13 ( str ) { // LBH QVQ VG!
  const valoresUnicode = []

  for ( let i in str ) {
    valoresUnicode.push( str.charCodeAt( i ) )
  }
  
  const str13 = valoresUnicode.map( ( x ) =>  
    ( isSpace( x ) || !isInRangeAtoZ( x ) )
      ? getCharCode( x ) //preserva o espaço
      : getCypherCharCode( x )
  ).join( '' )
  
  return str13
}

console.log( rot13( 'LBH QVQ VG!' ) )