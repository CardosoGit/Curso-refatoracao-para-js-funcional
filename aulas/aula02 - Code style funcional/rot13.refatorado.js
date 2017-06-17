const isSpace = ( x ) => ( x === 32 )
const isLowerThenN = ( x ) => ( x <= 78 )
const getCharCode = String.fromCharCode

const rot13 = ( str ) => { // LBH QVQ VG!
  const valoresUnicode = []

  for ( let i in str ) {
    valoresUnicode.push( str.charCodeAt( i ) )
  }
  
  const str13 = valoresUnicode.map( ( x ) =>  
    ( isSpace( x ) || !( x >= 65 && x <=90 ) ) 
      ? getCharCode( x )
      : ( !isLowerThenN( x ) )
        ? getCharCode( x - 13 )
        : getCharCode( x + 13 )
  ).join('')
  
  return str13
}

console.log( rot13( 'LBH QVQ VG!' ) )