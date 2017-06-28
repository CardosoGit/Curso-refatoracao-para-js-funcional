// ✓ ok
run( ( err, data ) => {
  if ( err ) throw err
  
  return data
} )

// ✗ evite
run( ( err, data ) => {
  console.log( 'done' )
} )
