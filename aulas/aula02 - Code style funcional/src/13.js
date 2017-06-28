const options = {
  quiet: false
}

// ✓ ok
if ( options.quiet )  console.log( 'true')
if ( !options.quiet )  console.log( 'false')


// ✗ evite
// if ( options.quiet === true ) console.log( 'true' )
// if ( options.quiet !== true ) console.log( 'false' )