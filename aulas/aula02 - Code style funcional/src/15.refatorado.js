const throwError = ( err ) => { throw err  }
const run = ( cb ) => cb( null, 'Suissa' )

const cb = ( err, data ) => 
  ( err ) 
    ? throwError( err )
    : data



console.log( 'run:', run( cb ) )
