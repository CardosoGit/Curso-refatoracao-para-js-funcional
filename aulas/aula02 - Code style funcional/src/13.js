// ✓ ok

const cb = ( err, data ) => {

  if ( err ) throw err

  console.log( `done: ${data}` )
} 

// const run = ( cbSemErro ) => cbSemErro( null, 'Suissa' )
const run = ( cbComErro ) => 
  cbComErro( new Error( 'DEU MERDA!' ) )

run( cb )

// // ✗ evite
// run( ( err ) {
//   window.alert( 'done' )
// } )