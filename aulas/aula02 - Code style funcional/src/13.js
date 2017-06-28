const cb = ( err, data ) => {
  if ( err ) throw err
  
  return data
}

const run = ( cb ) => cb( new Error( 'DEU MERDA!' ) )

// ✓ ok
console.log( run( cb ) )

// // ✗ evite
// run( ( err, data ) => {
//   console.log( 'done' )
// } )