const getCharCode = String.fromCharCode

const isSpace = ( x ) => ( x === 32 )
const isLowerThenN = ( x ) => ( x <= 78 )
const isInRange = ( min, max ) => ( x ) => 
  ( ( x >= min ) &&  ( x <= max ) )

const getCypherCharCode = ( x ) => 
  ( isLowerThenN( x ) )
    ? getCharCode( x + 13 )
    : getCharCode( x - 13 )

const toCharCode = ( c ) => c.charCodeAt( 0 )

const toCypher = ( x ) => 
  ( isSpace( x ) || !isInRange( 65, 90 )( x ) )
    ? getCharCode( x )
    : getCypherCharCode( x )

const rot13 = ( str ) => 
  str.toUpperCase()
      .split( '' )
      .map( toCharCode )
      .map( toCypher )
      .join( '' )

console.log( rot13( 'LBH QVQ VG!' ) )
console.log( rot13( 'LBH QVQ VG!'.toLowerCase() ) )