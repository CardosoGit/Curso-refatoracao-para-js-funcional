// https://github.com/suissa/Curso-refatoracao-para-js-funcional/issues/35

const padLeft = ( LIMIT ) => ' '.repeat( LIMIT )

const menorQue = ( tam ) => ( str ) => {
    // console.log('tam', tam)
    // console.log('str', str)
  const LIMIT = 32
  const t = tam - str.length
  let b = ''
  _str = str.split( '#' )
            .map( e => e.trim() )
  _str[ 0 ] += ' ' 
    // console.log('_str', _str)
  _t = _str[ 1 ].length + _str[ 0 ].length
  if ( _t > LIMIT ) {
    if (_str[ 0 ].length < LIMIT ) {
      // b += ' '.repeat( LIMIT - _str[ 0 ].length ) + '\n'
      b += padLeft( LIMIT - _str[ 0 ].length ) + '\n'
    }
    if ( _str[1].length < LIMIT ) {
      // b += ' '.repeat( 33 - _str[ 1 ].length )
      b += padLeft( 32 - _str[ 1 ].length - 1 )
      // console.log('_str[1] < LIMIT b', b)
    }
    if ( _str[1].length > LIMIT ) {
      const diff = LIMIT - _str[1].length
      // console.log('_str[ 1 ]', _str[1].length)
      line1 = _str[ 1 ].slice( 0, LIMIT - _str[0].length  )
      line2 = _str[ 1 ].slice( diff - _str[0].length )
      // console.log('diff', diff)
      // console.log('line1', line1)
      // console.log('line2', line2)
      b += padLeft( LIMIT - line2.length )
      _str[ 1 ] = line1 + b + line2
      // console.log('b', b)
    }
    return ( _str[ 0 ] + _str[ 1 ] )
  }
  b = padLeft( LIMIT - _t )
  // console.log('_t', _t)
  // console.log('b.length', b.length)
  // console.log('_str[ 0 ].length', _str[ 0 ].length)
  // console.log('_str[ 1 ].length', _str[ 1 ].length)
  // console.log('_str[ 0 ] + b + _str[ 1 ]', _str[ 0 ].length + b.length + _str[ 1 ].length)
  return ( _str[ 0 ] + b + _str[ 1 ] )
}

function formataLinha ( str ) {
  let tamanho = str.length
  let t = 0
  let b = ''
  if ( str.length < 32 ) {
    return menorQue( 32 )( str )
  } else if ( ( tamanho > 32 ) && ( tamanho <= 64 ) ) {
    return menorQue( 64 )( str )
  } else if ( ( tamanho > 64 ) && ( tamanho <= 96 ) ) {
    return menorQue( 96 )( str )
  } else if ( ( tamanho > 96 ) && ( tamanho <= 128 ) ) {
  } else if ( ( tamanho > 128 ) && ( tamanho <= 160 ) ) {
  } else if ( ( tamanho > 160 ) && ( tamanho <= 192 ) ) {
  }
}

const str1 = 'Valor pago: # 1.30\n'
const str2 = 'Nome: # Suissera da Bahia Cabuloso\n'
const str3 = 'Nome: # Suissera da Bahia Cabuloso pacas mermaooo\n'
const str4 = 'Nome: # Suissera da Bahia Cabuloso pacas mermaooo VIVA EH NOIS\n'

// console.log( str ); // Valor pago: # 1.30
console.log( formataLinha( str1 ) ); // Valor pago:                1.30
console.log( formataLinha( str2 ) ); 
console.log( formataLinha( str3 ) ); 
console.log( formataLinha( str4 ) ); 