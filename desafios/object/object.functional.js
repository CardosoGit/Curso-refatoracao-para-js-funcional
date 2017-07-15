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

const 
  fields = [
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

  , isObject = ( something ) =>  
      something.constructor === Object

  , isNullOrUndefined = ( something ) =>  
      something !== null && something !== undefined

  , createObjectFrom = ( obj ) => ( key ) =>
      Object.assign( {}, { key, value: obj[ key ] } )

  , mapThis = ( obj ) => ( { 
      with: ( key ) => ( {
        and: ( transform ) => 
            obj[ key ].map( transform )
      } )
    } )

  ,  transformObjectUsingThis = ( fields, obj ) => ( key ) => 
      ( fields.includes( key ) )
        ? ifKeyExistsInFieldsList( obj, key, fields )
        : orIfKeyIsObjectThenCreate( obj, key, fields )

  , createArrayFrom = ( something ) => ( fields ) => 
      Object.keys( something )
            .map( transformObjectUsingThis( fields, something ) )

  ,  ifIsArrayThenCreate = ( obj, key, fields ) => 
      ( obj[ key ].map ) 
        ? mapThis( obj ).with( key )
                        .and( transformObjectUsingThis( fields, obj ) ) 
        : createObjectFrom( obj )( key )

  ,  orIfKeyIsObjectThenCreate = ( obj, key, fields ) => 
      ( isObject( key ) ) 
          ? createArrayFrom( key )( fields )
          : createObjectFrom( obj )( key )

  ,  ifKeyExistsInFieldsList = ( obj, key, fields ) => 
      ( isNullOrUndefined( obj[ key ] ) )
          ? ifIsArrayThenCreate( obj, key, fields )
          : createObjectFrom( obj )( key )

  , toCreateArrayBasedOn = ( fields, create ) => 
      Object.assign( {}, { key, value: obj[ key ] } )

  ,  arrayOfObjects = createArrayFrom( obj )( fields )

console.log('arrayOfObjects: ', arrayOfObjects)
