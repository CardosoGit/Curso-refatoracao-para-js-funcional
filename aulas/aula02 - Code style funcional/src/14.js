const throwError = ( err ) => {
  throw err
}

const cb = ( err, data ) => 
  ( err ) 
    ? throwError( err )
    : data

const run = ( cb ) => cb( new Error( 'DEU MERDA!' ) )

// ✓ ok
console.log( run( cb ) )

// run( )