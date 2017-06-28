const something = () => 'something'

const myFunction = () => {
  return something() // ✓ ok
}

// const myFunction = () => {
//   const result = something()   // ✗ evite
//   return something()
// }

console.log( myFunction() )