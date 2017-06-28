# λAula02.(Atualizando seus códigos para ES6)

![Hadouken](https://www.thinkful.com/learn/static/guides/intro-to-jquery/images/ryu_hadoken_pose.png)

<br>
<br>

Nesse curso iremos seguir o [Standard](https://github.com/feross/standard), porém com algumas modificações<br> 
para melhorar a legibilidade do código funcional.

*ps: a explicação de cada regra se encontra na documentação linkada acima.*

<br> 

**Não usaremos `;` nesse curso, porém quando programamos para *Frontend* é** <br>  **recomendável usar para não ter problemas com a minificação.**

<br> 

## λCodeStyle 

<br> 

![Hadouken Code](https://brunolm.files.wordpress.com/2017/01/hadouken-code.jpg)

<br> 

> **O que é um *Code Style?**

<br> 

É o estilo do nosso código, ou seja, como o escrevemos e sim<br>
é deveras importante para nosso curso.

Como vimos no início, esse *Code Style* é baseado no *Standard*, que tende<br>
a virar um padrão futuramente, assim espero.

Porém com algumas pequenas mudanças para deixar o formato de como<br>
escreveremos de uma forma mais "limpa" e "bonita", não falei<br>
legibilidade pois já havia falado anteriormente.

<br> 

Então vamos ao que interessa: as nossas regras.

### λRegras

* **Use 2 espaços** para identação. [#01]()

  ```js
  const hello = (name) => {   // ✓ ok
    console.log( 'oi', name )
    console.log( 'tchau', name )
  }

  const hello = (name) => {   // ✗ evite
      console.log('oi', name)
      console.log('tchau', name)
  }
  ```

* **Use aspas simples para strings**. [#02]()

  ```js
  console.log( 'Salve galera do JS Funcional!!!' )   // ✓ ok

  console.log( "Salve galera do JS Funcional!!!" )   // ✗ evite
  ```

* **Use *[template string](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/template_strings)* em *Strings* com concatenação**. [#03]()

  ```js
  const hello = ( name ) => {   // ✓ ok
    console.log( `oi ${name}!` )
    console.log( `tchau ${name}!` )
  }

  const hello = (name) => {   // ✗ evite
      console.log('oi' + name)
      console.log('tchau' + name)
  }
  ```


* **Sem variáveis/constantes não-utilizadas.** [#04]()

  ```js
  const myFunction = () => {
    return something() // ✓ ok
  }

  const myFunction = () => {
    const result = something()   // ✗ evite
    return something()
  }
  ```

> Se existe a possibilidade de retornar direto a chamada<br>
> de uma função, faça-o.

  <br>

* **Adicione um espaço após as keywords.** [#05]()

  ```js
  if ( condition ) { ... }   // ✓ ok
  if(condition) { ... }    // ✗ evite
  ```

* **Adicione um espaço antes do parêntese de declaração de funções.** [#06]()

  ```js
  function name ( arg ) { ... }   // ✓ ok
  function name( arg ) { ... }    // ✗ evite

  run( () => { ... } )      // ✓ ok
  run(() => { ... } )       // ✗ evite
  ```

* **Sempre use** `===` ao invés de  `==`. [#07]() <br>
  Exceção: `obj == null` é permitido pra checar se `null || undefined`.

  ```js
  if ( name === 'John' )   // ✓ ok
  if ( name == 'John' )    // ✗ evite
  
  if ( name !== 'John' )   // ✓ ok
  if ( name != 'John' )    // ✗ evite
  ```

* **Operadores infix** devem ser espaçados. [#08]()

  ```js
  // ✓ ok
  const a = 2
  const b = 5
  const soma = ( a, b ) => a + b
  
  // ✗ evite
  const a=2
  const b=5
  const soma = ( a, b ) => a+b
  ```

* **Vírgulas devem ter um espaço** depois delas. [#09]()

  ```js
  // ✓ ok
  const list = [1, 2, 3, 4]
  const greet ( name, options ) => { ... }
  
  // ✗ evite
  const list = [1,2,3,4]
  const greet ( name,options ) => { ... }
  ```

* **Adicione um espaço no início e no final dos colchetes.** [#10]()

  ```js
  // ✓ ok
  const list = [ 1, 2, 3, 4 ]
  
  // ✗ evite
  const list = [1,2,3,4]
  ```

* **Mantenha os else** na mesma linha das suas chaves. [#11]()

  ```js
  // ✓ ok
  if ( condition ) {
    // ...
  } else {
    // ...
  }
  
  // ✗ evite
  if ( condition ) {
    // ...
  }
  else {
    // ...
  }
  ```

  Isso é bom para quando você precisa retirar apenas o else<br>
  e quer continuar com o code interno dele, você poderá<br>
  comentar apenas a linha do `else`.

* **Para ifs com mais de uma linha,** use chaves. [#12]()

  ```js
  // ✓ ok
  if ( options.quiet !== true)  console.log( 'done')

  // ✓ ok
  if ( options.quiet !== true ) {
    console.log( 'done')
  }
  
  // ✗ evite
  if ( options.quiet !== true )
    console.log( 'done' )
  ```

* **Sempre lide** com o parâmetro `err` . [#13]()

  ```js
  // ✓ ok
  run( ( err, data ) => {
    if ( err ) throw err
    
    return data
  } )
  
  // ✗ evite
  run( ( err, data ) => {
    console.log( 'done' )
  } )
  ```

* **Sempre prefixe globais de browser** com `window.`. [#14]()<br>
  Exceções: `document`, `navigator` e `console`.

  ```js
  window.alert( 'hi' )   // ✓ ok

  alert( 'hi' )   // ✗ evite


  document.querySelector( '.menu' )   // ✓ ok

  window.document.querySelector( '.menu' )   // ✗ evite
  ```

  Retirei o `console` dessa regra, pois se formos escrever um código<br>
  que seja Isomórfico e Universal o mesmo deve rodar tanto no navegador<br>
  como no Node.js e como utilizamos o `console` nas duas plataformas **EU** <br>
  acredito ser melhor e mais reusável um código apenas com `console`.

* **Não é permitido múltiplas linhas em branco.** [#15]()

  ```js
  // ✓ ok
  const value = 'hello world'
  console.log( value )
  

  // ✗ evite
  const value = 'hello world'


  console.log( value )


  // ✓ ok
  const sum = ( x, y ) => x + y

  const result = sum( 3, 5, )
  console.log( 'result', result )

  ```

* **É permitido 1 linha em branco quando mudar de contexto.** [#16]()

  ```js
  // ✓ ok
  const sum = ( x, y ) => x + y

  const result = sum( 3, 5, )
  console.log( 'result', result )


  // ✗ evite
  const sum = ( x, y ) => x + y

  const result = sum( 3, 5, )
  console.log( 'result', result )

  ```
* **Quando usar `console.log` sempre usar um texto para identifica-lo.** [#17]()

  ```js
  // ✓ ok
  const sum = ( x, y ) => x + y

  const result = sum( 3, 5, )
  console.log( 'result', result )


  // ✗ evite
  const sum = ( x, y ) => x + y

  const result = sum( 3, 5, )
  console.log( result )

  ```

Isso irá facilitar muito a sua vida quando for utiliza-lo para debugar.


* **Se for usar operador ternário** em múltiplas linhas,  [#18]()<br>
deixe o `?` e o `:` em suas próprias linhas.

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

* **Para declarações de const,**  [#19]() <br>
escreva cada declaração na sua própria instrução.

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

* **Coloque parẽnteses adicionais** em declarações em condições.  [#20]()<br> 
Isso torna mais claro que a expressão é uma declaração `=` e <br> 
não um operador de equidade `===`.

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
## Ponto-e-vírgula  [#21]()

* Não use. (veja: [1](http://blog.izs.me/post/2353458699/an-open-letter-to-javascript-leaders-regarding), [2](http://inimino.org/%7Einimino/blog/javascript_semicolons), [3](https://www.youtube.com/watch?v=gsfbh17Ax9I))

  ```js
  window.alert( 'hi' )   // ✓ ok
  window.alert( 'hi' );  // ✗ evite
  ```

* **Nunca comece uma linha com `(`, `[`, ou `` ` ``.**  [#22]() <br>
Esse é o único problema em omitir ponto-e-vírgula, o Standard <br> 
te protege desse problema em potencial.

  ```js
  // ✓ ok
  ;( () => {
    window.alert( 'ok' )
  } () )

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

  Nota: Se você frequentemente escreve código assim, você pode <br> 
  estar querendo ser o inteligentão. Cuidado!

  Atalhos inteligentes são desencorajados, em favor de expressões <br> 
  mais limpas e legíveis, sempre que possível.


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


Esses dias me deparei com um pedido de refatoração em algum grupo <br> 
de JS do Telegram e o código original é [esse](https://gist.github.com/maugravena/0340828e9587352deb93ca4d004d7747):

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

<br>

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

<br>

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

<br>

Agora perceba que chamamos a função `String.fromCharCode` em diversos lugares?

Podemos encapsula-la para facilitarmos a legibilidade:

```js
const getCharCode = String.fromCharCode

const isSpace = ( x ) => ( x === 32 )
const isLowerThenN = ( x ) => ( x <= 78 )

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

<br>

Agora quero que você perceba que temos 2 `return`s iguais:

- `return getCharCode( x )`

<br>

Logo podemos agrupar seus testes para que usemos o mesmo retorno: 

```js
const getCharCode = String.fromCharCode

const isSpace = ( x ) => ( x === 32 )
const isLowerThenN = ( x ) => ( x <= 78 )

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

<br>

Hora de aplicar a ténica do if ternário para deixarmos o `map` com apenas uma linha:


```js
const getCharCode = String.fromCharCode

const isSpace = ( x ) => ( x === 32 )
const isLowerThenN = ( x ) => ( x <= 78 )

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
const getCharCode = String.fromCharCode

const isSpace = ( x ) => ( x === 32 )
const isLowerThenN = ( x ) => ( x <= 78 )

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

<br>

Com isso podemos reusar a função `isInRange` em outros códigos<br> 
quando precisarmos testar se um valor se encontra em uma determinada faixa.

Ela foi escrita como uma *closure* para que possamos reaproveita-la<br> 
melhor, por exemplo:


```js
const isInRange = ( min, max ) => ( x ) => 
  ( ( x >= min ) &&  ( x <= max ) )

const filterKids = ( list ) => list.filter( isInRange( 5, 13 ) )

const kids = filterKids( [ 1, 2, 6, 12, 18, 666] )
// [ 6, 12 ]
```

<br>

Eu deixei uma parte muito importante que irei abordar na<br> 
próxima aula: **immutable data**.

Iremos aprender a não modificar nossos valores e com isso<br> 
corrigir esse pedaço de código:

```js
const valoresUnicode = []

for ( let i in str ) {
  valoresUnicode.push( str.charCodeAt( i ) )
}
```

<br>


## λExercício

O exercício dessa aula é **BEM SIMPLES**. Quero apenas que você<br> 
envie de 3 a 5 códigos, o original e o refatorado, aplicando o nosso<br> 
*codestyle* e as técnicas aprendidas até agora.

Os códigos podem ou não serem seus, você que decide!


## λAviso

O meu código refatorado "final" foi esse, fiz mais para testar algumas coisas. :p

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


> **Logo mais você também chegará nisso facilmente,**<br> 
> **não que seja o melhor apenas diferente hehehhehe!**