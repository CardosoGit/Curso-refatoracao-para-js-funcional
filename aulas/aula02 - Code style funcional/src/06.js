function name ( arg ) { 
  console.log( 'arg: ', arg )
}   // ✓ ok
// function name( arg ) { ... }    // ✗ evite

// run( () => { ... } )      // ✓ ok
// run(() => { ... } )       // ✗ evite

[ 1, 2, 3, 4 ].filter( ( num, i ) => num > 2 )
[ 1, 2, 3, 4 ].filter( num => num > 2 )