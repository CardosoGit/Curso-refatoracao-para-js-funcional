const hello = (name) => {   // ✓ ok
  console.log( 'oi', name )
  console.log( 'tchau', name )
}

const hello = (name) => {   // ✗ evite
    console.log('oi', name)
    console.log('tchau', name)
}