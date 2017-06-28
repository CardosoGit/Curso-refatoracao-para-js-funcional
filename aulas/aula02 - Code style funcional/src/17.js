// ✓ ok
const log = ( msg ) => ( data ) => 
  console.log( `${msg}: ${data}` )

// ✓ ok
const log = ( msg ) => ( data ) => ( fim ) =>
  console.log( `${msg}: ${data}. ${fim}` )


// ✗ evite
const log = ( msg ) => ( data ) => console.log( `${msg}: ${data}` )

// ✗ evite
const log = ( msg ) => 
  ( data ) => ( fim ) => console.log( `${msg}: ${data}. ${fim}` )

// ✗ evite
const log = ( msg ) => 
  ( data ) => 
    ( fim ) => 
      console.log( `${msg}: ${data}. ${fim}` )