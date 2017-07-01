const SPACE = 32
const CYPHER_LIMIT = 78
const A = 65
const Z = 90
const getCharCode = String.fromCharCode

const toCharCode = ( letter, i, arr ) => arr.join( '' ).charCodeAt( i )

const add = ( element ) => ( list ) => 
  list.concat( element )

const isInRange = ( min, max ) => ( x ) => 
  ( ( x >= min ) &&  ( x <= max ) )

const isSomething = ( something ) => ( x ) =>
  ( x === something )

const isSpace = isSomething( SPACE )
const isInRangeFromAtoZ = isInRange( A, Z )

const getPosition = ( CYPHER_LENGTH ) => ( x ) =>
  ( x >= CYPHER_LIMIT ) 
    ? x - CYPHER_LENGTH  
    : x + CYPHER_LENGTH 

// const getPosition = ( CYPHER_LENGTH ) => ( x ) =>
//   x + ( x >= CYPHER_LIMIT 
//         ? - CYPHER_LENGTH  
//         : + CYPHER_LENGTH 
//       )

const getCharCodeFromCypher = ( CYPHER_LENGTH ) => ( x ) => 
  ( isInRangeFromAtoZ( x ) ) 
    ? getPosition( CYPHER_LENGTH )( x ) 
    : x

const cypherThis = ( CYPHER_LENGTH ) => ( x, isSpace ) =>
  getCharCode( isSpace 
                ? x 
                : getCharCodeFromCypher( CYPHER_LENGTH )( x ) 
              )

const toCypher = ( CYPHER_LENGTH ) => ( result, x, i ) => 
  add( cypherThis(  CYPHER_LENGTH )( x ), 
                    isSpace( x ) 
                  )( result )

const rot = ( CYPHER_LENGTH ) => ( str ) => 
  str.toUpperCase()
      .split( '' )
      .map( toCharCode )
      .reduce( toCypher( CYPHER_LENGTH ), '' )

const rot13 = rot( 13 )

console.log('rot13 LBH QVQ VG!', rot13( 'LBH QVQ VG!' ) )
console.log('rot13 suissa', rot13( 'suissa' ) )
