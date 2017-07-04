const isIn = ( list ) => ( value ) => 
  list.findIndex( v => value === v ) >= 0

module.exports = isIn