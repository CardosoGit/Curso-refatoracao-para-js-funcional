const obj = {
    "data": "13/04",
    "dia": "Qui",
    "inicio": "16:24",
    "inicio_intervalo": null,
    "fim_intervalo": null,
    "fim": "20:55",
    "jornada": "05:01",
    "ocorrencia": null,
    "folga": null,
    "veiculo": null,
    "viagens": [{
        "saida": "00:00",
        "chegada": "00:00",
        "local_origem": "RODOVIARIA DE RIO BONITO / RBO",
        "local_destino": "RODOVIARIA DE SAQUAREMA / SAQ",
        "sentido": "ida"
    }, {
        "saida": "00:00",
        "chegada": "00:00",
        "local_origem": "RODOVIARIA DE RIO BONITO / RBO",
        "local_destino": "RODOVIARIA DE SAQUAREMA / SAQ",
        "sentido": "volta"
    }]
}

const fields = [
  `data`,
  `dia`,
  `inicio`,
  `inicio_intervalo`,
  `fim_intervalo`,
  `fim`,
  `jornada`,
  `ocorrencia`,
  `folga`,
  `veiculo`,
  `viagens`,
  `saida`,
  `chegada`,
  `local_origem`,
  `local_destino`,
  `sentido`,
]

const isObject = ( something ) =>  
  something.constructor === Object

const isNullOrUndefined = ( something ) =>  
  something !== null && something !== undefined

const createObjectFrom = ( obj ) => ( {
  usingThis: ( key ) => 
    Object.assign( {}, { key, value: obj[ key ] } )
} )

const mapThis = ( obj ) => ( { 
  with: ( key ) => ( {
    and: ( transform ) => 
        obj[ key ].map( transform )
  } )
} )

const createArrayFrom = ( something ) => ( {
  usingThis: ( fields ) => 
                Object.keys( something )
                      .map( transformObjectUsingThis( fields, something ) )
} )

const ifIsArrayThenCreate = ( obj, key, fields ) => 
  ( obj[ key ].map ) 
    ? mapThis( obj ).with( key )
                    .and( transformObjectUsingThis( fields, obj ) ) 
    : createObjectFrom( obj ).usingThis( key )

const orIfKeyIsObjectThenCreate = ( obj, key, fields ) => 
  ( isObject( key ) ) 
      ? createArrayFrom( key ).usingThis( fields )
      : createObjectFrom( obj ).usingThis( key )

const ifKeyExistsInFieldsList = ( obj, key, fields ) => 
  ( isNullOrUndefined( obj[ key ] ) )
      ? ifIsArrayThenCreate( obj, key, fields )
      : createObjectFrom( obj ).usingThis( key )

const transformObjectUsingThis = ( fields, obj ) => ( key ) => 
  ( fields.includes( key ) )
    ? ifKeyExistsInFieldsList( obj, key, fields )
    : orIfKeyIsObjectThenCreate( obj, key, fields )


const arrayOfObjects = createArrayFrom( obj ).usingThis( fields )

console.log('arrayOfObjects: ', arrayOfObjects)
