# λAula04.(Immutable Fucking Data)

![Immutable Awesomeness](http://i.imgur.com/l4JkguX.jpg)

<br>
<br>

> "A pure function is a function that, given the same input, will always return the same output and does not have any observable side effect."

*fonte: [Chapter 3: Pure Happiness with Pure Functions](https://github.com/MostlyAdequate/mostly-adequate-guide/blob/master/ch3.md)*

Quando cheguei nesse tópico, durante o início dos meus estudos, ele fez-me questionar o seguinte:

<br>
<br>

> **Se eu não posso mudar nenhum valor das variáveis como é que eu vou programar?**


<br>
<br>

> Você também se questionou isso??

<br>
<br>

Que bom! Então antes de explicar esse conceito precisamos entender que existe um grande problema ao usar-se uma linguagem que também suporta classes. Como uma classe é uma estrutura que oculta dados e, além disso, contém funções, ele apresenta muita complexidade. Para entender o motivo dessa complexidade, primeiro precisamos falar sobre funções puras e impuras.


<br> 
<br> 

## λPure Functions

![What does a pure function look like?](http://i.imgur.com/frhBrUH.jpg)

```js

// impure
const minimum = 21
const checkAge = ( age ) => age >= minimum

```

Na parte impura, `checkAge` depende da constante `minimum` para determinar o resultado, porém esse valor se encontra "fora do escopo interno" da função `checkAge`. 

**Para resolver esse problema é bem simples!**

Basta passarmos esse valor via parâmetro e de preferência definindo um valor padrão, como podemos ver abaixo:


```js

// pure
const checkAge = ( age, minimum = 18 ) => age >= minimum

```

## λSide Effects

> "A side effect is a change of system state or observable interaction with the outside world that occurs during the calculation of a result."

*fonte: [Chapter 3: Pure Happiness with Pure Functions](https://github.com/MostlyAdequate/mostly-adequate-guide/blob/master/ch3.md)*

Os efeitos colaterais(*side effects*) podem incluir, mas não estão limitados a:

- alteração em arquivos
- inserção um registro em um banco de dados
- requições HTTP
- mutações
- impressão na tela / logging
- entrada de dados do usuário
- consultas no DOM

## λImmutable Data 


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