const getCharCode = String.fromCharCode

const isSpace = ( x ) => ( x === 32 )
const isLowerThenN = ( x ) => ( x <= 78 )
const isInRange = ( min, max ) => ( x ) => 
  ( ( x >= min ) &&  ( x <= max ) )

const getCypherCharCode = ( x ) => 
  ( isLowerThenN( x ) )
    ? getCharCode( x + 13 )
    : getCharCode( x - 13 )

const rot13 = ( str ) => { // LBH QVQ VG!

  const str13 = str.split( '' )
                    .map( ( c ) => c.charCodeAt( 0 ) )
                    .map( ( x ) => ( isSpace( x ) || !isInRange( 65, 90 )( x ) )
                                      ? getCharCode( x )
                                      : getCypherCharCode( x ) )
                    .join( '' )
  
  return str13
}

console.log( rot13( 'LBH QVQ VG!' ) )