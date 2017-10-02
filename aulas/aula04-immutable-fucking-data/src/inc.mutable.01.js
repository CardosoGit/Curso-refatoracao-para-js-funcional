let i = 0;

const conteAte10 = () => {

  for ( i; i < 10; i++ ) {
    console.log( 'i:', i )
  }

  return i
}

console.log( '\n' )

const conteAte15 = () => {
  
  for ( i; i < 15; i++ ) {
    console.log( 'i:', i )
  }

  return i
}

console.log( "conteAte10: ", conteAte10() )
console.log( "conteAte15: ", conteAte15() )

