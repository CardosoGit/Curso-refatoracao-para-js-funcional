# λAula02.(Atualizando seus códigos para ES6)



## λCodeStyle 

* **Use 2 espaços** para identação.

  ```js
  const hello = ( name ) => {
    console.log( 'oi', name )
    console.log( 'tchau', name )
  }
  ```

* **Use aspas simples para strings**.

  ```js
  console.log( 'Salveeee galera do Funcional!!!' )
  ```

* **Sem constiáveis não-utilizadas.**

  ```js
  const myFunction () => {
    const result = something()   // ✗ evite
  }
  ```

* **Adicione um espaço após as keywords.**

  ```js
  if ( condition ) { ... }   // ✓ ok
  if(condition) { ... }    // ✗ evite
  ```

* **Adicione um espaço antes do parêntese de declaração de funções.**

  ```js
  function name ( arg ) { ... }   // ✓ ok
  function name( arg ) { ... }    // ✗ evite

  run( () => { ... } )      // ✓ ok
  run(() => { ... } )       // ✗ evite
  ```

* **Sempre use** `===` ao invés de  `==`.<br>
  Exceção: `obj == null` é permitido pra checar se `null || undefined`.

  ```js
  if ( name === 'John')   // ✓ ok
  if ( name == 'John')    // ✗ evite
  ```

  ```js
  if ( name !== 'John')   // ✓ ok
  if ( name != 'John')    // ✗ evite
  ```

* **Operadores infix** devem ser espaçados.

  ```js
  // ✓ ok
  const a = 2
  const b = 5
  const soma = ( a, b ) => a + b
  ```

  ```js
  // ✗ evite
  const a=2
  const b=5
  const soma = ( a, b ) => a+b
  ```

* **Vírgulas devem ter um espaço** depois delas.

  ```js
  // ✓ ok
  const list = [1, 2, 3, 4]
  const greet ( name, options ) => { ... }
  ```

  ```js
  // ✗ evite
  const list = [1,2,3,4]
  const greet ( name,options ) => { ... }
  ```

* **Adicione um espaço no início e no final dos colchetes.**

  ```js
  // ✓ ok
  const list = [ 1, 2, 3, 4 ]
  ```

  ```js
  // ✗ evite
  const list = [1,2,3,4]
  ```

* **Mantenha os else** na mesma linha das suas chaves.

  ```js
  // ✓ ok
  if ( condition ) {
    // ...
  } else {
    // ...
  }
  ```

  ```js
  // ✗ evite
  if ( condition ) {
    // ...
  }
  else {
    // ...
  }
  ```

* **Para ifs com mais de uma linha,** use chaves.

  ```js
  // ✓ ok
  if ( options.quiet !== true)  console.log( 'done')
  ```

  ```js
  // ✓ ok
  if ( options.quiet !== true ) {
    console.log( 'done')
  }
  ```

  ```js
  // ✗ evite
  if ( options.quiet !== true )
    console.log( 'done' )
  ```

* **Sempre lide** com o parâmetro `err` .

  ```js
  // ✓ ok
  run( ( err ) {
    if ( err ) throw err
    window.alert( 'done' )
  } )
  ```

  ```js
  // ✗ evite
  run( ( err ) {
    window.alert( 'done' )
  } )
  ```

* **Sempre prefixe globais de browser** com `window.`.<br>
  Exceções: `document`, `console` e `navigator`.

  ```js
  window.alert( 'hi')   // ✓ ok
  ```

* **Não é permitido múltiplas linhas em branco.**

  ```js
  // ✓ ok
  const value = 'hello world'
  console.log( value )
  ```

  ```js
  // ✗ evite
  const value = 'hello world'


  console.log( value )
  ```

* **Se for usar operador ternário** em múltiplas linhas, deixe `?` e `:` em suas próprias linhas.

  ```js
  // ✓ ok
  const location = env.development ? 'localhost' : 'www.api.com'

  // ✓ ok
  const location = env.development
    ? 'localhost'
    : 'www.api.com'

  // ✗ evite
  const location = env.development ?
    'localhost' :
    'www.api.com'
  ```

* **Para declarações de const,** escreva cada declaração na sua própria instrução.

  ```js
  // ✓ ok
  const silent = true
  const verbose = true

  // ✗ evite
  const silent = true, verbose = true

  // ✗ evite
  const silent = true,
      verbose = true
  ```

* **Coloque parẽnteses adicionais** em declarações em condições. Isso torna mais claro que a expressão é uma declaração ( `=`) e não um typo de equidade ( `===`)

  ```js
  // ✓ ok
  while ( ( m = text.match( expr ) ) ) {
    // ...
  }

  // ✗ evite
  while ( m = text.match( expr ) ) {
    // ...
  }
  ```
*
## Ponto-e-vírgula

* Não use. (veja: [1](http://blog.izs.me/post/2353458699/an-open-letter-to-javascript-leaders-regarding), [2](http://inimino.org/%7Einimino/blog/javascript_semicolons), [3](https://www.youtube.com/watch?v=gsfbh17Ax9I))

  ```js
  window.alert( 'hi' )   // ✓ ok
  window.alert( 'hi' );  // ✗ evite
  ```

* Nunca comece uma linha com `(`, `[`, ou `` ` ``. Esse é o único problema em omitir ponto-e-vírgula, e standard te protege desse problema em potencial.

  ```js
  // ✓ ok
  ;( () => {
    window.alert( 'ok' )
  }() )

  // ✗ evite
  ( () => {
    window.alert( 'ok' )
  }() )
  ```

  ```js
  // ✓ ok
  ;[ 1, 2, 3 ].join( ' - ' )

  // ✗ evite
  [ 1, 2, 3 ].join( ' - ' )
  ```

  ```js
  // ✓ ok
  ;`hello`.indexOf( 'o' )

  // ✗ evite
  `hello`.indexOf( 'o' )
  ```

  Nota: Se você frequentemente escreve código assim, você pode estar querendo ser o inteligentão. Cuidado.

  Atalhos inteligentes são desencorajados, em favor de expressões mais limpas e legíveis, sempre que possível.


  Ao invés disso:

  ```js
  ;[ 1, 2, 3 ].forEach( odd )
  ```

  **Isso é bem melhor!**

  ```js
  const nums = [ 1, 2, 3, 4 ]
  const evens = nums.filter( theEvens )
  ```


## λRefatorandoooo


Esses dias me deparei com um pedido de refatoração em algum grupo de JS do Telegram e o código original é [esse](https://gist.github.com/maugravena/0340828e9587352deb93ca4d004d7747):

```js
function rot13(str) { // LBH QVQ VG!
  var valoresUnicode = []

  for (let i in str) {
    valoresUnicode.push(str.charCodeAt(i))
  }
  
  var str13 = valoresUnicode.map((x) =>  {
    if (x == 32) return String.fromCharCode(x) //preserva o espaço
    if (x >= 65 && x <=90) { // range A-Z  
      if (x >= 78) return String.fromCharCode(x - 13) //Maior que 'N'
      if (x <= 78) return String.fromCharCode(x + 13) //Menor que 'N'
    } else {
      return String.fromCharCode(x) //Demais caracteres ñ aplica mudança
    }
  }).join('')
  
  return str13
}
```

É um exemplo bem simples mas que rola uma baita refatorada nele.

Vamos aplicar nosso codestyle nesse código:

```js
function rot13 ( str ) { // LBH QVQ VG!
  const valoresUnicode = []

  for ( let i in str ) {
    valoresUnicode.push( str.charCodeAt( i ) )
  }
  
  var str13 = valoresUnicode.map( ( x ) =>  {
    if ( x === 32 ) return String.fromCharCode(  x ) //preserva o espaço
    if ( x >= 65 && x <=90 ) { // range A-Z  
      if ( x >= 78 ) return String.fromCharCode( x - 13 ) //Maior que 'N'
      if ( x <= 78 ) return String.fromCharCode( x + 13 ) //Menor que 'N'
    } else {
      return String.fromCharCode( x ) //Demais caracteres ñ aplica mudança
    }
  } ).join( '' )
  
  return str13
}
```

Depois dessa ajeitadinha bora encapsular os testes lógicos em funções:


```js
const isSpace = ( x ) => ( x === 32 )
const isLowerThenN = ( x ) => ( x <= 78 )

function rot13 ( str ) { // LBH QVQ VG!
  const valoresUnicode = []

  for ( let i in str ) {
    valoresUnicode.push( str.charCodeAt( i ) )
  }
  
  const str13 = valoresUnicode.map( ( x ) =>  {
    if ( isSpace( x ) ) return String.fromCharCode( x ) //preserva o espaço
    if ( x >= 65 && x <=90 ) { // range A-Z  
      if ( !isLowerThenN( x ) ) return String.fromCharCode( x - 13 ) //Maior que 'N'
      if ( isLowerThenN( x ) ) return String.fromCharCode( x + 13 ) //Menor que 'N'
    } else {
      return String.fromCharCode( x ) //Demais caracteres ñ aplica mudança
    }
  }).join('')
  
  return str13
}
```

Agora perceba que chamamos a função `String.fromCharCode` em diversos lugares?

Podemos encapsula-la para facilitarmos a legibilidade:

```js
const isSpace = ( x ) => ( x === 32 )
const isLowerThenN = ( x ) => ( x <= 78 )
const getCharCode = String.fromCharCode

const rot13 = ( str ) => { // LBH QVQ VG!
  const valoresUnicode = []

  for ( let i in str ) {
    valoresUnicode.push( str.charCodeAt( i ) )
  }
  
  const str13 = valoresUnicode.map( ( x ) =>  {
    if ( isSpace( x ) ) return getCharCode( x ) //preserva o espaço
    if ( x >= 65 && x <=90 ) { // range A-Z  
      if ( !isLowerThenN( x ) ) return getCharCode( x - 13 ) //Maior que 'N'
      if ( isLowerThenN( x ) ) return getCharCode( x + 13 ) //Menor que 'N'
    } else {
      return getCharCode( x ) //Demais caracteres ñ aplica mudança
    }
  }).join( '' )
  
  return str13
}
```

Agora quero que você perceba que temos 2 `return`s iguais:

`return getCharCode( x )`

Logo podemos agrupar seus testes para que usemos o mesmo retorno: 

```js
const isSpace = ( x ) => ( x === 32 )
const isLowerThenN = ( x ) => ( x <= 78 )
const getCharCode = String.fromCharCode

const rot13 = ( str ) => { // LBH QVQ VG!
  const valoresUnicode = []

  for ( let i in str ) {
    valoresUnicode.push( str.charCodeAt( i ) )
  }
  
  const str13 = valoresUnicode.map( ( x ) =>  {
    if ( isSpace( x ) || !( x >= 65 && x <=90 ) ) return getCharCode( x )
    if ( !isLowerThenN( x ) ) return getCharCode( x - 13 ) //Maior que 'N'
    if ( isLowerThenN( x ) ) return getCharCode( x + 13 ) //Menor que 'N'
  }).join( '' )
  
  return str13
}

console.log( rot13( 'LBH QVQ VG!' ) )
```

Hora de aplicar a ténica do if ternário para deixarmos o `map` com apenas uma linha:


```js
const isSpace = ( x ) => ( x === 32 )
const isLowerThenN = ( x ) => ( x <= 78 )
const getCharCode = String.fromCharCode

const rot13 = ( str ) => { // LBH QVQ VG!
  const valoresUnicode = []

  for ( let i in str ) {
    valoresUnicode.push( str.charCodeAt( i ) )
  }
  
  const str13 = valoresUnicode.map( ( x ) =>  
    ( isSpace( x ) || !( x >= 65 && x <=90 ) ) 
      ? getCharCode( x )
      : ( !isLowerThenN( x ) )
        ? getCharCode( x - 13 )
        : getCharCode( x + 13 )
  ).join( '' )
  
  return str13
}

console.log( rot13( 'LBH QVQ VG!' ) )
```
 
<br>

**Entretanto, IMHO, nós só devemos ficar com 1 nível de if ternário.**

<br>

> E agora? #comofas

<br>


```js
const isSpace = ( x ) => ( x === 32 )
const isLowerThenN = ( x ) => ( x <= 78 )
const getCharCode = String.fromCharCode

const getCypherCharCode = ( x ) => 
  ( isLowerThenN( x ) )
    ? getCharCode( x + 13 )
    : getCharCode( x - 13 )

const rot13 = ( str ) => { // LBH QVQ VG!
  const valoresUnicode = []

  for ( let i in str ) {
    valoresUnicode.push( str.charCodeAt( i ) )
  }
  
  const str13 = valoresUnicode.map( ( x ) =>  
    ( isSpace( x ) || !( x >= 65 && x <=90 ) ) 
      ? getCharCode( x )
      : getCypherCharCode( x )
  ).join( '' )
  
  return str13
}

console.log( rot13( 'LBH QVQ VG!' ) )
```

![](http://geradormemes.com/media/created/zy5nts.jpg)


<br>

> Percebeu que inverti a lógica do `isLowerThenN`?

<br>

Pois é preferível utilizar a afirmação em vez da negação.


<br>

**Espereeeeee... ainda não acabou!**

<br>

Agora vou mostrar como criar uma função genérica que possa ser reusada.

```js
const getCharCode = String.fromCharCode
const isSpace = ( x ) => ( x === 32 )
const isLowerThenN = ( x ) => ( x <= 78 )
const isInRange = ( min, max ) => ( x ) => 
  ( ( x >= min ) &&  ( x <= max ) )

const getCypherCharCode = ( x ) => 
  ( isLowerThenN( x ) )
    ? getCharCode( x + 13 )
    : getCharCode( x - 13 )

const rot13 = ( str ) => { // LBH QVQ VG!
  const valoresUnicode = []

  for ( let i in str ) {
    valoresUnicode.push( str.charCodeAt( i ) )
  }
  
  const str13 = valoresUnicode.map( ( x ) =>  
    ( isSpace( x ) || !isInRange( 65, 90 )( x ) )
      ? getCharCode( x )
      : getCypherCharCode( x )
  ).join( '' )
  
  return str13
}

console.log( rot13( 'LBH QVQ VG!' ) )
```

Com isso podemos reusar a função `isInRange` em outros códigos quando precisarmos testar se um valor se encontra em uma determinada faixa.

Eu deixei uma parte muito ijmportante que irei abordar na próxima aula: **immutable data**.

Iremos aprender a não modificar nossos valores e com isso corrigir esse pedaço de código:

```js
const valoresUnicode = []

for ( let i in str ) {
  valoresUnicode.push( str.charCodeAt( i ) )
}
```


## λExercício

O exercício dessa aula é **BEM SIMPLES**. Quero apenas que você envie de 3 a 5 códigos, o original e o refatorado, aplicando o nosso *codestyle* e as técnicas aprendidas até agora.

Os códigos podem ou não serem seus, você que decide!


## λAviso

O meu código refatorado "final" foi esse:

```js

const CYPHER_LIMIT = 78
const A = 65
const Z = 90
const getCharCode = String.fromCharCode

const add = ( c ) => ( s ) => s.concat( c )
const isSpace = ( x ) => ( x === 32 )

const isInRange = ( min, max ) => ( x ) => 
  ( ( x >= min ) &&  ( x <= max ) )

const toCharCode = ( letter, i, str ) => 
  str.join( '' ).charCodeAt( i )

const getPosition = ( CYPHER_LENGTH ) => ( x ) =>
  ( x >= CYPHER_LIMIT ) ? x - CYPHER_LENGTH  : x + CYPHER_LENGTH 

const getCharCodeFromCypher = ( CYPHER_LENGTH ) => ( x ) => 
  ( isInRange( A, Z )( x ) ) ? getPosition( CYPHER_LENGTH )( x ) : x

const cypherThis = ( CYPHER_LENGTH ) => ( x, isSpace ) =>
  getCharCode( isSpace ?  x : getCharCodeFromCypher( CYPHER_LENGTH )( x ) )  

const toCypher = ( CYPHER_LENGTH ) => ( result, x, i ) => 
  add ( cypherThis( CYPHER_LENGTH )( x ), isSpace( x )  )( result )

const rot = ( CYPHER_LENGTH ) => ( str ) => 
  str.toUpperCase()
      .split( '' )
      .map( toCharCode )
      .reduce( toCypher( CYPHER_LENGTH ), '' )

const rot13 = rot( 13 )

console.log('rot13 LBH QVQ VG!', rot13( 'LBH QVQ VG!' ) )
console.log('rot13 suissa', rot13( 'suissa' ) )

```


> **Logo mais você também chegará nisso facilmente!**