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

**Use 2 espaços** para identação. [#01]()

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


**Use aspas simples para strings**. [#02]()


  ```js
  console.log( 'Salve galera do JS Funcional!!!' )   // ✓ ok

  console.log( "Salve galera do JS Funcional!!!" )   // ✗ evite
  ```



**Use *[template string](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/template_strings)* em *Strings* com concatenação**. [#03]()


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



**Sem variáveis/constantes não-utilizadas.** [#04]()

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


**Adicione um espaço após as keywords.** [#05]()


  ```js
  if ( condition ) { ... }   // ✓ ok
  if(condition) { ... }    // ✗ evite
  ```


**Adicione um espaço antes do parêntese de declaração de funções.** [#06]()

  ```js
  function name ( arg ) { ... }   // ✓ ok
  function name( arg ) { ... }    // ✗ evite

  run( () => { ... } )      // ✓ ok
  run(() => { ... } )       // ✗ evite
  ```

**Sempre use** `===` ao invés de  `==`. [#07]() <br>
  Exceção: `obj == null` é permitido pra checar se `null || undefined`.

  ```js
  if ( name === 'John' )   // ✓ ok
  if ( name == 'John' )    // ✗ evite
  
  if ( name !== 'John' )   // ✓ ok
  if ( name != 'John' )    // ✗ evite
  ```

**Operadores infix** devem ser espaçados. [#08]()

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



**Vírgulas devem ter um espaço** depois delas. [#09]()

  ```js
  // ✓ ok
  const list = [1, 2, 3, 4]
  const greet ( name, options ) => { ... }
  
  // ✗ evite
  const list = [1,2,3,4]
  const greet ( name,options ) => { ... }
  ```



**Adicione um espaço no início e no final dos colchetes.** [#10]()

  ```js
  // ✓ ok
  const list = [ 1, 2, 3, 4 ]
  
  // ✗ evite
  const list = [1,2,3,4]
  ```



**Mantenha os else** na mesma linha das suas chaves. [#11]()

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



**Para ifs com mais de uma linha,** use chaves. [#12]()

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



**Para testes booleanos com `true/false` não utilize comparação**. [#13]()

  ```js
  // ✓ ok
  if ( options.quiet )  console.log( 'true')
  if ( !options.quiet )  console.log( 'false')
  

  // ✗ evite
  if ( options.quiet === true ) console.log( 'true' )
  if ( options.quiet !== true ) console.log( 'false' )
  ```



**Se for usar operador ternário** em múltiplas linhas,  [#14]()<br>
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



**Sempre lide** com o parâmetro `err` . [#15]()

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



**Caso tenha apenas um `if/else` na *arrow function* utilize o ternário** . [#16]()

  ```js
  // ✓ ok
  const throwError = ( err ) => { throw err }
  const log = ( msg ) => ( data ) => 
    console.log( `${msg}: ${data}` )

  const cb = ( err, data ) => 
    ( err ) 
      ? throwError( err )
      : log( 'Sucesso' )( data )

  const run = ( cb ) => cb( new Error( 'DEU MERDA!' ) )
  console.log( run( cb ) )
  
  // ✗ evite
  run( ( err, data ) => {
    if ( err ) throw err
    else return data
  } )
  ```

Utilizei uma *closure* na função `log` pois assim podermos utilizá-la<br>
em qualquer outra função que receba um parâmetro de resposta, dessa forma<br>
injetamos a mensagem antes do `console.log` executar.



**Se utilizar *arrow function* com *closure* quebre a linha na última função** . [#17]()


  ```js
  // ✓ ok
  const log = ( msg ) => ( data ) => 
    console.log( `${msg}: ${data}` )

  // ✓ ok
  const log = ( msg ) => ( data ) => ( fim ) =>
    console.log( `${msg}: ${data}. ${fim}` )

  
  // ✗ evite
  const log = ( msg ) => ( data ) => console.log( `${msg}: ${data}` )

  // ✗ evite
  const log = ( msg ) => 
    ( data ) => ( fim ) => console.log( `${msg}: ${data}. ${fim}` )

  // ✗ evite
  const log = ( msg ) => 
    ( data ) => 
      ( fim ) => 
        console.log( `${msg}: ${data}. ${fim}` )
  ```




**Sempre prefixe globais de browser** com `window.`. [#18]()<br>
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



**Não é permitido múltiplas linhas em branco.** [#19]()

  ```js
  // ✓ ok
  const value = 'hello world'
  console.log( value )
  

  // ✗ evite
  const value = 'hello world'


  console.log( value )



  // ✓ ok
  const sum = ( x, y ) => x + y

  const result = sum( 3, 5 )
  console.log( 'result', result )

  // ✓ evite
  const sum = ( x, y ) => x + y


  const result = sum( 3, 5 )
  console.log( 'result', result )
  ```



**É permitido 1 linha em branco quando mudar de contexto.** [#20]()

  ```js
  // ✓ ok
  const sum = ( x, y ) => x + y
  const minus = ( x, y ) => x - y

  const resultSum = sum( 3, 5, )
  console.log( 'resultSum', resultSum )

  const resultMinus = minus( 5, 3 )
  console.log( 'resultMinus', resultMinus )


  // ✗ evite
  const sum = ( x, y ) => x + y
  const minus = ( x, y ) => x - y
  const resultSum = sum( 3, 5, )
  console.log( 'resultSum', resultSum )
  const resultMinus = minus( 5, 3 )
  console.log( 'resultMinus', resultMinus )



  // ✓ ok
  const sum = ( x, y ) => x + y
  const minus = ( x, y ) => x - y

  const resultSum = sum( 3, 5, )
  const resultMinus = minus( 5, 3 )

  console.log( 'resultSum', resultSum )
  console.log( 'resultMinus', resultMinus )


  // ✗ evite
  const sum = ( x, y ) => x + y
  const minus = ( x, y ) => x - y
  const resultSum = sum( 3, 5, )
  const resultMinus = minus( 5, 3 )
  console.log( 'resultSum', resultSum )
  console.log( 'resultMinus', resultMinus )
  ```


**Quando usar `console.log` sempre usar um texto para identifica-lo.** [#21]()

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




**Para declarações de const,**  [#22]() <br>
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
  
## Ponto-e-vírgula  [#23]()

* Não use. (veja: [1](http://blog.izs.me/post/2353458699/an-open-letter-to-javascript-leaders-regarding), [2](http://inimino.org/%7Einimino/blog/javascript_semicolons), [3](https://www.youtube.com/watch?v=gsfbh17Ax9I))

  ```js
  window.alert( 'hi' )   // ✓ ok
  window.alert( 'hi' );  // ✗ evite
  ```



**Nunca comece uma linha com `(`, `[`, ou `` ` ``.**  [#24]() <br>
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
