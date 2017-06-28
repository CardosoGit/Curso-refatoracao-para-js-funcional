const throwError = ( err ) => { throw err }

const log = ( msg ) => ( data ) => 
  console.log( `${msg}: ${data}` )

const cb = ( err, data ) => 
  ( err ) 
    ? throwError( err )
    : log( 'Sucesso' )( data )

const run = ( cb ) => cb( new Error( 'DEU MERDA!' ) )
console.log( run( cb ) )