
const run = ( cb ) => cb( new Error( 'DEU MERDA!' ) )
const cb = ( err, data ) => {
  if ( err ) throw err
  
  return data
}


// ✓ ok
// run(  )

console.log( 'run:', run( cb ) )

// // ✗ evite
// run( ( err, data ) => {
//   console.log( 'done' )
// } )
