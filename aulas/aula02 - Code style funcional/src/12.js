// ✓ ok
if ( options.quiet !== true)  console.log( 'done')

// ✓ ok
if ( options.quiet !== true ) {
  console.log( 'done')
}

// ✗ evite
if ( options.quiet !== true )
  console.log( 'done' )