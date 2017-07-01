const path = require( 'path' )
const fs = require( 'fs' )

const getFileName = ( dir, file ) => path.join( dir, file )
const isDirectory = ( name ) => fs.statSync( name ).isDirectory()
const isDotOrTwoDots = ( name ) => ( name == '.' || name == '..' )
const isFile = ( name ) => 
  ( !isDirectory( name ) && !isDotOrTwoDots( name ) )//|| name
    ? name
    : false

const toFileName = ( dir ) => ( name ) => 
  ( isFile( getFileName( dir, name ) ) )

const getFilesNames = ( dir ) => 
  fs.readdirSync( dir )
    .map( toFileName( dir ) )
    .filter( e => !!e )

console.log( 'getFilesNames .', getFilesNames( '.' ) )
console.log( 'getFilesNames ..', getFilesNames( '..' ) )
console.log( 'getFilesNames ../..', getFilesNames( '../..' ) )
