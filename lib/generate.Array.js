const generateArray = ( length, fn = ( v, k ) => k ) => 
  Array.from( { length }, fn )

module.exports = generateArray