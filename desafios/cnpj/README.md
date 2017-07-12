# Validação CNPJ

Dessa vez não irei mostrar passo-a-passo como fazer essa validação, assim como fiz<br> 
com a validação de CPF, mas sim como refatorar uma validação de um projeto já existente.


O projeto de base será esse: [consultaCnpj](https://github.com/antonellisantos/consultaCnpj).

Antes de iniciarmos vou mostrar como executar os testes e qual a saída deles.<br>
Para isso vamos ver o `package.json`:

```

  "scripts": {
    "coverage": "nyc npm test && nyc report",
    "lint": "eslint lib/*.js",
    "start": "node index.js",
    "test": "mocha \"tests/*.test.js\"",
    "watch": "nodemon --exec \"npm start\"",
    "example": "node example/server.js"
  }

```

Perceba essa linha: `"test": "mocha \"tests/*.test.js\""0`.

Logo vemos que esse comando (npm run test) irá executar o módulo `mocha`. 

Para isso você deve instalar o [Mocha](https://mochajs.org/) como módulo global:

```

[sudo] npm i -g mocha

```

Depois basta executar: `npm run test`.

```sh

» npm run test

> consulta-cnpj@1.0.0 test /Users/swiss/www/Projetos/CNPJ/consultaCnpj
> mocha "tests/*.test.js"



  ConsultaCNPJ API
    #buildPromise(new Error('Falha geral!'))
      ✓ should return an Error
    #buildPromise({type: 'error'})
      ✓ should return an Error
    #buildPromise({type: 'Error'})
      ✓ should return an Error
    #buildPromise({type: 'ERROR'})
      ✓ should return an Error
    #buildPromise(null)
      ✓ should return an Error
    #buildPromise(undefined)
      ✓ should return an Error
    #buildPromise('')
      ✓ should return an Error
    #buildPromise(null)
      ✓ should return an Error
    #validateRequest(mockedFailRequest, message)
      ✓ should return an error
    #validateRequest(mockedSuccessRequest)
      ✓ should return an object
    #generateImageBase64(mockedFailBody)
      ✓ should return an Error
    #getBodyAndEncode(response)
      ✓ should return a string
    #unmask("12.123.123/1234-12")
      ✓ should return the unmasked CNPJ (only numbers)
    #validate(#unmask("12.123.123/1234-12"))
      ✓ should return false
    #validate(#unmask("00.000.000/0000-00"))
      ✓ should return false
    #validate("123")
      ✓ should return false
    #validate(#unmask("21.876.883/0001-79"))
      ✓ should return false
    #validate(unmask(21.876.883/0001-78))
      ✓ should return true
    #getParams()
      ✓ should return an object (214ms)
    #getBasicInfos(null, 'sessionId', 'solvedCaptcha')
      ✓ should return an Error
    #getBasicInfos('cnpj', null, 'solvedCaptcha')
      ✓ should return an Error
    #getBasicInfos('cnpj', 'sessionId', null)
      ✓ should return an Error
    #getBasicInfos('00.000.000/0000-00', 'sessionId', 'solvedCaptcha')
      ✓ should return an Error
    #getBasicInfos(21.876.883/0001-78, 'sessionId', 'solvedCaptcha')
      ✓ should return an Error (369ms)


  24 passing (651ms)

```

Com isso sabemos que **TODO** o código está funcional e isso será muito importante!

Quando abrimos o arquivo `lib/validateCnpj.js`, de cara encontramos isso:

<br>

```js
const unmasker = require( './unmaskNumbers' );
```

<br>

> Então vamos começar...

<br>
<hr>
<br>


## Helpers

Primeiramente vamos iniciar a refatoração pela função mais simples:

<br>

```js

// Retorna apenas os números contidos na String informada.
function unmaskNumbers(num) {
  let unmasked = num.match(/\d+/g);
  unmasked = unmasked.join('');

  return String(unmasked);
}
module.exports = unmaskNumbers;

```

<br>


Criando e executando essa função no terminal teremos o seguinte:


<br>

```js
> function unmaskNumbers(num) {
...   let unmasked = num.match(/\d+/g);
...   unmasked = unmasked.join('');
... 
...   return String(unmasked);
... }
undefined
> const cnpj = '05.506.560/0001-36'
undefined
> unmaskNumbers(cnpj)
'05506560000136'

```

<br>

### Técnica - Arrow Function (one line)

Com isso sabemos que essa função retira a máscara do CNPJ e perceba que<br> 
essa função retorna `String(unmasked)`, ou seja, retorna uma *String*!

Logo podemos refatorá-la assim:


<br>


```js

const unmaskNumbers = ( num ) => num.match( /\d+/g ).join( '' )

module.exports = unmaskNumbers

```

<br>

> Entendeu o porquê não precisei forçar o tipo *String* ?

<br>

Pois a função [join](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/join) SEMPPRE irá retornar uma *String*:

> "O método join junta todos os elementos de uma array dentro de uma string."

<br>

> **Bah Suissa e esse match aí???**

<br>

O método *[match](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String/match)* sempre irá retornar um *Array*, logo podemos utilizar a função *[join](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/join)* <br>
que converte um *Array* para uma *String*, deixando nosso código assim:

```js

const unmaskNumbers = ( num ) => num.match( /\d+/g ).join( '' )

module.exports = unmaskNumbers

```

<br>

> **Se você rodar novamente os testes, então eles devem dar o mesmo resultado que o inicial!**

<br>

*Caso você não tenha entendido essa parte, envie-me sua dúvida por mensagem privada.*


## Validate

Agora sim vamos para a função principal de validação:

```js

const unmasker = require('./unmaskNumbers');

// Valida o CNPJ informado, conforme parâmetros da RFB.
function validateCnpj(cnpj) {
  const numCnpj = unmasker(cnpj);

  if (numCnpj.length !== 14) {
    return false;
  }

  if (numCnpj === '00000000000000' ||
     numCnpj === '11111111111111' ||
     numCnpj === '22222222222222' ||
     numCnpj === '33333333333333' ||
     numCnpj === '44444444444444' ||
     numCnpj === '55555555555555' ||
     numCnpj === '66666666666666' ||
     numCnpj === '77777777777777' ||
     numCnpj === '88888888888888' ||
     numCnpj === '99999999999999') {
    return false;
  }

  let s = (numCnpj.length - 2);
  const DV = numCnpj.substr(s);
  let b = numCnpj.substr(0, s);
  let t = 0;
  let p = s - 7;

  for (let i = s; i >= 1; i -= 1) {
    t += (b.charAt(s - i) * p);
    p -= 1;
    p = (p < 2 ? 9 : p);
  }

  let r = ((t % 11) < 2 ? 0 : 11 - (t % 11));

  if (String(r) !== DV.charAt(0)) {
    return false;
  }

  s += 1;
  b = numCnpj.substr(0, s);
  t = 0;
  p = s - 7;

  for (let i = s; i >= 1; i -= 1) {
    t += (b.charAt(s - i) * p);
    p -= 1;
    p = (p < 2 ? 9 : p);
  }

  r = ((t % 11) < 2 ? 0 : 11 - (t % 11));

  if (String(r) !== DV.charAt(1)) {
    return false;
  }

  return true;
}

module.exports = validateCnpj;

```

Primeira parte do código que iremos atacar e que já temos a solução é:

```js

  if (numCnpj === '00000000000000' ||
     numCnpj === '11111111111111' ||
     numCnpj === '22222222222222' ||
     numCnpj === '33333333333333' ||
     numCnpj === '44444444444444' ||
     numCnpj === '55555555555555' ||
     numCnpj === '66666666666666' ||
     numCnpj === '77777777777777' ||
     numCnpj === '88888888888888' ||
     numCnpj === '99999999999999') {
    return false;
  }

```

<br>

> **Ué! Já temos essa solução reusando algo do CPF!**

<br>

Olhe essa função que usei na validação do CPF o qual [explico nesse artigo](https://medium.com/@osuissa/javascript-validacao-de-cpf-passo-a-passo-9428ee32c104):

<br>

```js

const isSameDigits = str => 
  str.split( '' ).every( ( elem ) => elem === str[ 0 ] );

```

<br>

Bora trocar aquele `if` gigantesco pela nossa função:

<br>

```js
const unmasker = require('./unmaskNumbers');

const isSameDigits = str => 
  str.split( '' ).every( ( elem ) => elem === str[ 0 ] );

// Valida o CNPJ informado, conforme parâmetros da RFB.
function validateCnpj(cnpj) {
  const numCnpj = unmasker(cnpj);

  if (numCnpj.length !== 14) {
    return false;
  }
  if ( isSameDigits( numCnpj ) ) {
    return false;
  }

  let s = (numCnpj.length - 2);
  const DV = numCnpj.substr(s);
  let b = numCnpj.substr(0, s);
  let t = 0;
  let p = s - 7;

  for (let i = s; i >= 1; i -= 1) {
    t += (b.charAt(s - i) * p);
    p -= 1;
    p = (p < 2 ? 9 : p);
  }

  let r = ((t % 11) < 2 ? 0 : 11 - (t % 11));

  if (String(r) !== DV.charAt(0)) {
    return false;
  }

  s += 1;
  b = numCnpj.substr(0, s);
  t = 0;
  p = s - 7;

  for (let i = s; i >= 1; i -= 1) {
    t += (b.charAt(s - i) * p);
    p -= 1;
    p = (p < 2 ? 9 : p);
  }

  r = ((t % 11) < 2 ? 0 : 11 - (t % 11));

  if (String(r) !== DV.charAt(1)) {
    return false;
  }

  return true;
}

module.exports = validateCnpj;

```

Antes de continuarmos quero que você preste atenção nessa parte:

```js

  if (numCnpj.length !== 14) {
    return false;
  }
  if ( isSameDigits( numCnpj ) ) {
    return false;
  }

```

Como já aprendemos anteriormente podemos agrupar esses testes assim:

```js

  if ( numCnpj.length !== 14 || isSameDigits( numCnpj ) ) {
    return false;
  }

```

Bem simples né?

Agora vamos analisar o seguinte pedaço de código:

```js

  let s = (numCnpj.length - 2);
  const DV = numCnpj.substr(s);
  let b = numCnpj.substr(0, s);
  let t = 0;
  let p = s - 7;

  for (let i = s; i >= 1; i -= 1) {
    t += (b.charAt(s - i) * p);
    p -= 1;
    p = (p < 2 ? 9 : p);
  }

  let r = ((t % 11) < 2 ? 0 : 11 - (t % 11));

  if (String(r) !== DV.charAt(0)) {
    return false;
  }

  s += 1;
  b = numCnpj.substr(0, s);
  t = 0;
  p = s - 7;

  for (let i = s; i >= 1; i -= 1) {
    t += (b.charAt(s - i) * p);
    p -= 1;
    p = (p < 2 ? 9 : p);
  }

  r = ((t % 11) < 2 ? 0 : 11 - (t % 11));

  if (String(r) !== DV.charAt(1)) {
    return false;
  }

```

Perceba as seguintes linhas:

```js

  // ...
  if (String(r) !== DV.charAt(0)) {
    return false;
  }

  // ... 
  if (String(r) !== DV.charAt(1)) {
    return false;
  }

```

Com isso sabemos que `r` é o valor do dígito a ser testado, porém para gerar<br>
esse valor passamos pela seguinte sequência:

```js

  let s = (numCnpj.length - 2);
  const DV = numCnpj.substr(s);
  let b = numCnpj.substr(0, s);
  let t = 0;
  let p = s - 7;

  for (let i = s; i >= 1; i -= 1) {
    t += (b.charAt(s - i) * p);
    p -= 1;
    p = (p < 2 ? 9 : p);
  }

  let r = ((t % 11) < 2 ? 0 : 11 - (t % 11));

  if (String(r) !== DV.charAt(0)) {
    return false;
  }

  s += 1;
  b = numCnpj.substr(0, s);
  t = 0;
  p = s - 7;

  for (let i = s; i >= 1; i -= 1) {
    t += (b.charAt(s - i) * p);
    p -= 1;
    p = (p < 2 ? 9 : p);
  }

  r = ((t % 11) < 2 ? 0 : 11 - (t % 11));

  if (String(r) !== DV.charAt(1)) {
    return false;
  } 

```

Com isso conseguimos separar essas duas partes em:

```js

  let s = (numCnpj.length - 2);
  const DV = numCnpj.substr(s);
  let b = numCnpj.substr(0, s);
  let t = 0;
  let p = s - 7;

  for (let i = s; i >= 1; i -= 1) {
    t += (b.charAt(s - i) * p);
    p -= 1;
    p = (p < 2 ? 9 : p);
  }

  let r = ((t % 11) < 2 ? 0 : 11 - (t % 11));

  if (String(r) !== DV.charAt(0)) {
    return false;
  }

```

```js

  s += 1;
  b = numCnpj.substr(0, s);
  t = 0;
  p = s - 7;

  for (let i = s; i >= 1; i -= 1) {
    t += (b.charAt(s - i) * p);
    p -= 1;
    p = (p < 2 ? 9 : p);
  }

  r = ((t % 11) < 2 ? 0 : 11 - (t % 11));

  if (String(r) !== DV.charAt(1)) {
    return false;
  } 

```

Agora vamos analisar as duas partes antes do `for`:

```js

let s = (numCnpj.length - 2);
const DV = numCnpj.substr(s);
let b = numCnpj.substr(0, s);
let t = 0;
let p = s - 7;

```

```js

  s += 1;
  b = numCnpj.substr(0, s);
  t = 0;
  p = s - 7;

```

Perceba que o valor de `b` depende de `s` e o valor de `s` depende de `numCnpj`.

Porém perceba que o valor de `s` na segunda parte é a incrementação do valor de `s` que chega.

Além disso perceba essas 3 linhas idênticas:

```js

  b = numCnpj.substr(0, s);
  t = 0;
  p = s - 7;

```

### Técnica - Destructuring Assignment

**Agora imagine uma forma onde a nossa função possa retornar esses três valores!**

Para isso iremos utilizar a técnica do [Destructuring Assignment](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/Atribuicao_via_desestruturacao) onde podemos definir o retorno de <br> 
cada valor em uma constante/variável pré-escolhida. 

Sabendo disso, podemos aplicar essa técnica assim:

```js

const getData = ( numCnpj, s ) => [
  numCnpj.substr( 0, s ),
  0,
  s - 7
]

```

Claramente você percebe que o retorno acima é de um *Array* de 3 posições, agora entenda<br>
como utilizaremos essa função:

```js

const unmasker = require('./unmaskNumbers');

const isSameDigits = str => 
  str.split( '' ).every( ( elem ) => elem === str[ 0 ] );

const getData = ( numCnpj, s ) => [
  numCnpj.substr( 0, s ),
  0,
  s - 7
]

// Valida o CNPJ informado, conforme parâmetros da RFB.
function validateCnpj(cnpj) {
  const numCnpj = unmasker(cnpj);

  if (numCnpj.length !== 14 ||  isSameDigits( numCnpj ) ) {
    return false;
  }

  let s = (numCnpj.length - 2);
  const DV = numCnpj.substr(s);

  let [ b, t, p ] = getData( numCnpj, s )
  // let b = numCnpj.substr(0, s);
  // let t = 0;
  // let p = s - 7;

  for (let i = s; i >= 1; i -= 1) {
    t += (b.charAt(s - i) * p);
    p -= 1;
    p = (p < 2 ? 9 : p);
  }

  let r = ((t % 11) < 2 ? 0 : 11 - (t % 11));

  if (String(r) !== DV.charAt(0)) {
    return false;
  }

  s += 1;
  [ b, t, p ] = getData( numCnpj, s )
  // b = numCnpj.substr(0, s);
  // t = 0;
  // p = s - 7;

  for (let i = s; i >= 1; i -= 1) {
    t += (b.charAt(s - i) * p);
    p -= 1;
    p = (p < 2 ? 9 : p);
  }

  r = ((t % 11) < 2 ? 0 : 11 - (t % 11));

  if (String(r) !== DV.charAt(1)) {
    return false;
  }

  return true;
}

module.exports = validateCnpj;

```

<br>


> **Notou que deixei comentado o código que substituimos né?**

<br>


Com isso inferimos que a mesma função será usada em qualquer parte necessária.

<br>
<br>
<br>

**Ainda temos mais linhas iguais nesse código, então *bora* refatorar!** 

<br>

Perceba que o valor de `r` tem a mesma lógica nas duas partes onde é chamado:

```js

  r = ((t % 11) < 2 ? 0 : 11 - (t % 11));

```

Para encapsularmos essa função é bem simples! Perceba que a única variável é o `t`.<br>
Logo podemos criar a seguinte função:

```js

const getR = ( t ) => 
  ( t % 11 ) < 2 
    ? 0 
    : 11 - (t % 11)

```

Para usarmos assim:

```js

const unmasker = require('./unmaskNumbers');

const isSameDigits = str => 
  str.split( '' ).every( ( elem ) => elem === str[ 0 ] );

const getData = ( numCnpj, s ) => [
  numCnpj.substr( 0, s ),
  0,
  s - 7
]

const getR = ( t ) => 
  ( t % 11 ) < 2 
    ? 0 
    : 11 - (t % 11)

function validateCnpj(cnpj) {
  const numCnpj = unmasker(cnpj);

  if (numCnpj.length !== 14 ||  isSameDigits( numCnpj ) ) {
    return false;
  }

  let s = (numCnpj.length - 2);
  const DV = numCnpj.substr(s);

  let [ b, t, p ] = getData( numCnpj, s )

  for (let i = s; i >= 1; i -= 1) {
    t += (b.charAt(s - i) * p);
    p -= 1;
    p = (p < 2 ? 9 : p);
  }

  let r = getR( t )
  // let r = ((t % 11) < 2 ? 0 : 11 - (t % 11));

  if (String(r) !== DV.charAt(0)) {
    return false;
  }

  s += 1;
  [ b, t, p ] = getData( numCnpj, s )

  for (let i = s; i >= 1; i -= 1) {
    t += (b.charAt(s - i) * p);
    p -= 1;
    p = (p < 2 ? 9 : p);
  }

  r = getR( t )
  // r = ((t % 11) < 2 ? 0 : 11 - (t % 11));

  if (String(r) !== DV.charAt(1)) {
    return false;
  }

  return true;
}

module.exports = validateCnpj;


```

<br>

Deixei comentada a parte do código que substituímos para você visualizar melhor.


<br>

Aproveitando que estamos encapsulando as mesmas lógicas em funções, analise isso:

```js

if (String(r) !== DV.charAt(0)) {
  return false;
}

if (String(r) !== DV.charAt(1)) {
  return false;
}

```

E como já sabemos podemos encapsular essa lógica na seguinte função:

```js


const isInvalidDigit = ( d1, d2 ) => String( d1 ) !== String( d2 )

```

Para utilizarmos assim:

```js

let r = getR( t );

if ( isInvalidDigit( r, DV[ 0 ] ) ) {
  return false;
}

// ...

if ( isInvalidDigit( r, DV[ 1 ] ) ) {
  return false;
}

```

Deixando nosso código nesse estado:

```js

const unmasker = require('./unmaskNumbers');

const isSameDigits = str => 
  str.split( '' ).every( ( elem ) => elem === str[ 0 ] );

const getData = ( numCnpj, s ) => [
  numCnpj.substr( 0, s ),
  0,
  s - 7
]

const getR = ( t ) => 
  ( t % 11 ) < 2 
    ? 0 
    : 11 - (t % 11)

const isInvalidDigit = ( d1, d2 ) => String( d1 ) !== String( d2 )

function validateCnpj(cnpj) {
  const numCnpj = unmasker(cnpj);

  if (numCnpj.length !== 14 ||  isSameDigits( numCnpj ) ) {
    return false;
  }

  let s = (numCnpj.length - 2);
  const DV = numCnpj.substr(s);

  let [ b, t, p ] = getData( numCnpj, s )

  for (let i = s; i >= 1; i -= 1) {
    t += (b.charAt(s - i) * p);
    p -= 1;
    p = (p < 2 ? 9 : p);
  }

  let r = getR( t );

  if ( isInvalidDigit( r, DV[ 0 ] ) ) {
    return false;
  }

  s += 1;
  [ b, t, p ] = getData( numCnpj, s )

  for (let i = s; i >= 1; i -= 1) {
    t += (b.charAt(s - i) * p);
    p -= 1;
    p = (p < 2 ? 9 : p);
  }

  r = getR( t );

  if ( isInvalidDigit( r, DV[ 1 ] ) ) {
    return false;
  }

  return true;
}

module.exports = validateCnpj;

```

Caso queira testar se o nosso código esta correto basta rodar `npm run test`:

```sh

» npm run test

> consulta-cnpj@1.0.0 test /Users/swiss/www/Projetos/CNPJ/consultaCnpj
> mocha "tests/*.test.js"



  ConsultaCNPJ API
    #buildPromise(new Error('Falha geral!'))
      ✓ should return an Error
    #buildPromise({type: 'error'})
      ✓ should return an Error
    #buildPromise({type: 'Error'})
      ✓ should return an Error
    #buildPromise({type: 'ERROR'})
      ✓ should return an Error
    #buildPromise(null)
      ✓ should return an Error
    #buildPromise(undefined)
      ✓ should return an Error
    #buildPromise('')
      ✓ should return an Error
    #buildPromise(null)
      ✓ should return an Error
    #validateRequest(mockedFailRequest, message)
      ✓ should return an error
    #validateRequest(mockedSuccessRequest)
      ✓ should return an object
    #generateImageBase64(mockedFailBody)
      ✓ should return an Error
    #getBodyAndEncode(response)
      ✓ should return a string
    #unmask("12.123.123/1234-12")
      ✓ should return the unmasked CNPJ (only numbers)
    #validate(#unmask("12.123.123/1234-12"))
      ✓ should return false
    #validate(#unmask("00.000.000/0000-00"))
      ✓ should return false
    #validate("123")
      ✓ should return false
    #validate(#unmask("21.876.883/0001-79"))
      ✓ should return false
    #validate(unmask(21.876.883/0001-78))
      ✓ should return true
    #getParams()
      ✓ should return an object (244ms)
    #getBasicInfos(null, 'sessionId', 'solvedCaptcha')
      ✓ should return an Error
    #getBasicInfos('cnpj', null, 'solvedCaptcha')
      ✓ should return an Error
    #getBasicInfos('cnpj', 'sessionId', null)
      ✓ should return an Error
    #getBasicInfos('00.000.000/0000-00', 'sessionId', 'solvedCaptcha')
      ✓ should return an Error
    #getBasicInfos(21.876.883/0001-78, 'sessionId', 'solvedCaptcha')
      ✓ should return an Error (353ms)


  24 passing (664ms)

```

Sabendo disso, vamos analisar nosso código atual:

```js

const unmasker = require('./unmaskNumbers');

const isInvalidDigit = ( d1, d2 ) => String( d1 ) !== String( d2 )

const isSameDigits = str => 
  str.split( '' ).every( ( elem ) => elem === str[ 0 ] );

const getData = ( numCnpj, s ) => [
  numCnpj.substr( 0, s ),
  0,
  s - 7
]

const getR = ( t ) => 
  ( t % 11 ) < 2 
    ? 0 
    : 11 - (t % 11)

function validateCnpj(cnpj) {
  const numCnpj = unmasker(cnpj);

  if (numCnpj.length !== 14 ||  isSameDigits( numCnpj ) ) {
    return false;
  }

  let s = (numCnpj.length - 2);
  const DV = numCnpj.substr(s);

  let [ b, t, p ] = getData( numCnpj, s )

  for (let i = s; i >= 1; i -= 1) {
    t += (b.charAt(s - i) * p);
    p -= 1;
    p = (p < 2 ? 9 : p);
  }

  let r = getR( t )

  if ( isInvalidDigit( r, DV[ 0 ]) ) {
    return false
  }

  s += 1;
  [ b, t, p ] = getData( numCnpj, s )

  for (let i = s; i >= 1; i -= 1) {
    t += (b.charAt(s - i) * p);
    p -= 1;
    p = (p < 2 ? 9 : p);
  }

  r = getR( t )

  if ( isInvalidDigit( r, DV[ 1 ]) ) {
    return false
  }

  return true;
}

module.exports = validateCnpj;

```

Analisando o código acima podemos inferir que o pedaço mais complexo para<br> 
refatorar é o seguinte:

```js

  let [ b, t, p ] = getData( numCnpj, s )

  for (let i = s; i >= 1; i -= 1) {
    t += (b.charAt(s - i) * p);
    p -= 1;
    p = (p < 2 ? 9 : p);
  }
  // ...

  s += 1;
  [ b, t, p ] = getData( numCnpj, s )

  for (let i = s; i >= 1; i -= 1) {
    t += (b.charAt(s - i) * p);
    p -= 1;
    p = (p < 2 ? 9 : p);
  }

```

> **Com certeza você percebeu que são idênticas, né?**

Antes de refatorarmos analise bem nosso código atual:

```js

const unmasker = require('./unmaskNumbers');

const isSameDigits = str => 
  str.split( '' ).every( ( elem ) => elem === str[ 0 ] );

const getData = ( numCnpj, s ) => [
  numCnpj.substr( 0, s ),
  0,
  s - 7
]

const getR = ( t ) => 
  ( t % 11 ) < 2 
    ? 0 
    : 11 - (t % 11)

const isInvalidDigit = ( d1, d2 ) => String( d1 ) !== String( d2 )

function validateCnpj(cnpj) {
  const numCnpj = unmasker(cnpj);

  if (numCnpj.length !== 14 ||  isSameDigits( numCnpj ) ) {
    return false;
  }

  let s = (numCnpj.length - 2);
  const DV = numCnpj.substr(s);

  let [ b, t, p ] = getData( numCnpj, s )

  for (let i = s; i >= 1; i -= 1) {
    t += (b.charAt(s - i) * p);
    p -= 1;
    p = (p < 2 ? 9 : p);
  }

  let r = getR( t );

  if ( isInvalidDigit( r, DV[ 0 ] ) ) {
    return false;
  }

  s += 1;
  [ b, t, p ] = getData( numCnpj, s )

  for (let i = s; i >= 1; i -= 1) {
    t += (b.charAt(s - i) * p);
    p -= 1;
    p = (p < 2 ? 9 : p);
  }

  r = getR( t );

  if ( isInvalidDigit( r, DV[ 1 ] ) ) {
    return false;
  }

  return true;
}

module.exports = validateCnpj;


```

Utilizando-se da técnica passada, onde utilizamos o [Destructuring Assignment](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/Atribuicao_via_desestruturacao) para retornarmos<br>
um valor como *Array* e nomearmos cada posição desse retorno dessa forma:

```js

const getSomeData = ( t, b, s, p, i ) => [
  t + ( b.charAt( s - i ) * p ), 
  --p, 
  ( p < 2 ? 9 : p )
]

```

Para podermos receber esses valores assim:

```js

  for (let i = s; i >= 1; i--)
    [t, _, p] = getSomeData(t, b, s, p, i);

```

Você deve estar se perguntando:

> Por que o segundo elemento é o `_` sendo que não o usamos?

Essa resposta é bem simples, perceba que dentro dos 2 *for*s temos o seguinte comando:

```js

p -= 1;

```

E esse comando nada mais é que: 

```js

--p

```

Pois analisando o código inicial percebemos que:

```js

  for (let i = s; i >= 1; i -= 1) {
    t += (b.charAt(s - i) * p);
    p -= 1;
    p = (p < 2 ? 9 : p);
  }

```

Antes de definir o valor de `p`, se `p < 2`, o próprio `p` deve ser decrementado.

Porém perceba que esse `for` está alterando os valores de `t` e `p`, por hora isso será<br>
necessário, logo nossa função `getSomeData` deve funcionar para os dois `for`s:

```js

const unmasker = require('./unmaskNumbers');

const isInvalidDigit = ( d1, d2 ) => String( d1 ) !== String( d2 )

const isSameDigits = str => 
  str.split( '' ).every( ( elem ) => elem === str[ 0 ] );

const getData = ( numCnpj, s ) => [
  numCnpj.substr( 0, s ),
  0,
  s - 7
]

const getR = ( t ) => 
  ( t % 11 ) < 2 
    ? 0 
    : 11 - (t % 11)

const getSomeData = ( t, b, s, p, i ) => [
  t + ( b.charAt( s - i ) * p ), 
  --p, 
  ( p < 2 ? 9 : p )
]

function validateCnpj(cnpj) {
  const numCnpj = unmasker(cnpj);

  if (numCnpj.length !== 14 ||  isSameDigits( numCnpj ) ) {
    return false;
  }

  let s = (numCnpj.length - 2);
  const DV = numCnpj.substr(s);

  let [ b, t, p ] = getData( numCnpj, s )

  for ( let i = s; i >= 1; i-- ) {
    [ t, _, p ] = getSomeData( t, b, s, p, i );
  }
  // for (let i = s; i >= 1; i -= 1) {
  //   t += (b.charAt(s - i) * p);
  //   p -= 1;
  //   p = (p < 2 ? 9 : p);
  // }

  let r = getR( t )

  if ( isInvalidDigit( r, DV[ 0 ]) ) {
    return false
  }

  s += 1;
  [ b, t, p ] = getData( numCnpj, s )

  for ( let i = s; i >= 1; i-- ) {
    [ t, _, p ] = getSomeData( t, b, s, p, i );
  }
  // for (let i = s; i >= 1; i -= 1) {
  //   t += (b.charAt(s - i) * p);
  //   p -= 1;
  //   p = (p < 2 ? 9 : p);
  // }

  r = getR( t )

  if ( isInvalidDigit( r, DV[ 1 ]) ) {
    return false
  }

  return true;
}

module.exports = validateCnpj;

```

Obviamente você já sabe que mesmo encapsulando o `for` ainda temos efeitos colaterais.<br>
Depois iremos melhorar essa parte, por hora quero que você atenha-se a essa parte:

```js

let r = getR( t )

if ( isInvalidDigit( r, DV[ 0 ]) ) {
  return false
}
// ...
r = getR( t )

if ( isInvalidDigit( r, DV[ 1 ]) ) {
  return false
}

```

Como sabemos que esses dois testes retornam a mesma coisa podemos encapsular<br>
essa parte com a seguinte função:

```js

const validate = ( numCnpj ) => ( digits = [], DV = [] ) =>
  ( digits.length === 2 )
    ? isInvalidDigit( digits[ 0 ], DV[ 0 ] ) || 
      isInvalidDigit( digits[ 1 ], DV[ 1 ])
      ? false
      : true
    : false

```

Para utilizamos assim:

```js

const unmasker = require('./unmaskNumbers');

const isInvalidDigit = ( d1, d2 ) => String( d1 ) !== String( d2 )

const isSameDigits = str => 
  str.split( '' ).every( ( elem ) => elem === str[ 0 ] );

const getData = ( numCnpj, s ) => [
  numCnpj.substr( 0, s ),
  0,
  s - 7
]

const getR = ( t ) => 
  ( t % 11 ) < 2 
    ? 0 
    : 11 - (t % 11)

const getSomeData = ( t, b, s, p, i ) => [
  t + ( b.charAt( s - i ) * p ), 
  --p, 
  ( p < 2 ? 9 : p )
]

const validate = ( numCnpj ) => ( digits = [], DV = [] ) =>
  ( digits.length === 2 )
    ? isInvalidDigit( digits[ 0 ], DV[ 0 ] ) || 
      isInvalidDigit( digits[ 1 ], DV[ 1 ])
      ? false
      : true
    : false

const validateCnpj = ( cnpj ) => {
  const numCnpj = unmasker( cnpj )

  const validateCNPJ = validate( cnpj )

  if (numCnpj.length !== 14 || isSameDigits( numCnpj ) ) {
    return false
  }

  let s = ( numCnpj.length - 2 )
  const DV = numCnpj.substr( s );

  let [ b, t, p ] = getData( numCnpj, s )

  for ( let i = s; i >= 1; i-- ) {
    [ t, _, p ] = getSomeData( t, b, s, p, i );
  }

  let d1 = getR( t )

  s += 1;
  [ b, t, p ] = getData( numCnpj, s )

  for ( let i = s; i >= 1; i-- ) {
    [ t, _, p ] = getSomeData( t, b, s, p, i )
  }

  let d2 = getR( t )

  return validateCNPJ( [ d1, d2 ], DV )
}

module.exports = validateCnpj

```

Antes de continuarmos quero pedir sua atenção para a seguinte função:

```js

const getR = ( t ) => 
  ( t % 11 ) < 2 
    ? 0 
    : 11 - ( t % 11 )

```

Para que refatoremos ela para isso:

```js

const getR = ( t ) => 
  ( t ) < 2 
    ? 0 
    : 11 - t

```

<br>

> **Você sabe o porquê fiz isso?**

<br>

Simples! Como nas duas linhas onde o valor de `t` é `t % 11` podemos passar para a<br>
função `getR` esse valor diretamente, por isso trocamos `t % 11` apenas por `t`, para<br>
usarmos da seguinte maneira:

<br>

```js

const unmasker = require('./unmaskNumbers');

const isInvalidDigit = ( d1, d2 ) => String( d1 ) !== String( d2 )

const isSameDigits = str => 
  str.split( '' ).every( ( elem ) => elem === str[ 0 ] );

const getData = ( numCnpj, s ) => [
  numCnpj.substr( 0, s ),
  0,
  s - 7
]

const getR = ( t ) => 
  ( t ) < 2 
    ? 0 
    : 11 - t

const getSomeData = ( t, b, s, p, i ) => [
  t + ( b.charAt( s - i ) * p ), 
  --p, 
  ( p < 2 ? 9 : p )
]

const validate = ( numCnpj ) => ( digits = [], DV = [] ) =>
  ( digits.length === 2 )
    ? isInvalidDigit( digits[ 0 ], DV[ 0 ] ) || 
      isInvalidDigit( digits[ 1 ], DV[ 1 ])
      ? false
      : true
    : false

const validateCnpj = ( cnpj, id = 0 ) => {
  const numCnpj = unmasker( cnpj )

  let s = ( numCnpj.length - 2 )
  const DV = numCnpj.substr( s );

  let [ b, t, p ] = getData( numCnpj, s )

  for ( let i = s; i >= 1; i-- ) {
    [ t, _, p ] = getSomeData( t, b, s, p, i );
  }

  let d1 = getR( t % 11 )

  s += 1;
  [ b, t, p ] = getData( numCnpj, s )

  for ( let i = s; i >= 1; i-- ) {
    [ t, _, p ] = getSomeData( t, b, s, p, i )
  }

  let d2 = getR( t % 11 )

  const validateCNPJ = validate( numCnpj )

  return ( numCnpj.length !== 14 || isSameDigits( numCnpj ) )
    ? false
    :validateCNPJ( [ d1, d2 ], DV )
}

module.exports = validateCnpj

```

<br>



Depois de chegarmos nesse estado, analise o seguinte trecho de código:

<br>


```js

let s = ( numCnpj.length - 2 )
const DV = numCnpj.substr( s );

let [ b, t, p ] = getData( numCnpj, s )

for ( let i = s; i >= 1; i-- ) {
  [ t, _, p ] = getSomeData( t, b, s, p, i );
}

let d1 = getR( t % 11 )

```


<br>

E:

<br>


```js

s += 1;
[ b, t, p ] = getData( numCnpj, s )

for ( let i = s; i >= 1; i-- ) {
  [ t, _, p ] = getSomeData( t, b, s, p, i )
}

let d2 = getR( t % 11 )

```

<br>


Podemos observar claramente que o único valor que irá mudar algo é o `s`, pois sabemos<br>
que o seu valor é incrementado, `s += 1`, antes de executar `getData` novamente.

Logo podemos encapsular essa lógica na seguinte função:

<br>


```js

const getDigit = ( numCnpj, s ) => {

  let [ b, t, p ] = getData( numCnpj, s )

  for ( let i = s; i >= 1; i-- ) {
    [ t, _, p ] = getSomeData( t, b, s, p, i );
  }

  return getR( t % 11 )
}
 ```

<br>


Para deixarmos nosso código assim:

<br>


```js

const unmasker = require('./unmaskNumbers')
const isInvalidDigit = ( d1, d2 ) => String( d1 ) !== String( d2 )
const isSameDigits = str => str.split( '' ).every( ( elem ) => elem === str[ 0 ] )

const getData = ( numCnpj, s ) => [
  numCnpj.substr( 0, s ),
  0,
  s - 7
]

const getR = ( t ) => 
  ( t ) < 2 
    ? 0 
    : 11 - t

const getSomeData = ( t, b, s, p, i ) => [
  t + ( b.charAt( s - i ) * p ), 
  --p, 
  ( p < 2 ? 9 : p )
]

const validate = ( numCnpj ) => ( digits = [], DV = [] ) =>
  ( digits.length === 2 )
    ? isInvalidDigit( digits[ 0 ], DV[ 0 ] ) || 
      isInvalidDigit( digits[ 1 ], DV[ 1 ])
      ? false
      : true
    : false

const getDigit = ( numCnpj, s ) => {

  let [ b, t, p ] = getData( numCnpj, s )

  for ( let i = s; i >= 1; i-- ) {
    [ t, _, p ] = getSomeData( t, b, s, p, i );
  }

  return getR( t % 11 )
}

const validateCnpj = ( cnpj, id = 0 ) => {
  const numCnpj = unmasker( cnpj )

  let s = ( numCnpj.length - 2 )

  const DV = numCnpj.substr( s )
  const validateCNPJ = validate( numCnpj )

  let d1 = getDigit( numCnpj, s )
  let d2 = getDigit( numCnpj, ++s )


  return ( numCnpj.length !== 14 || isSameDigits( numCnpj ) )
            ? false
            :validateCNPJ( [ d1, d2 ], DV )
}

module.exports = validateCnpj

```

<br>


<br>


Quero que você analise essas linhas comigo:

```js

let d1 = getDigit( numCnpj, s )
let d2 = getDigit( numCnpj, ++s )


return ( numCnpj.length !== 14 || isSameDigits( numCnpj ) )
          ? false
          :validateCNPJ( [ d1, d2 ], DV )

```

<br>

> **Percebeu que sumi com essa linha: `s += 1` ?**

<br>

Pois eu passei essa mesma lógica para cá: `let d2 = getDigit( numCnpj, ++s )`. <br>

Como utilizei o operador de incrementação no formato prefix, `++s`, ele basicamente<br>
diz para incrementar em `1` o valor de `s` antes de utilizá-lo na próxima vez.

<br>

> **Você lembra da transparência referencial que pedi como exercício na primeira aula?**

<br>

Caso você tenha feito o exercício entenderá facilmente o que farei em seguida:

```js

return ( numCnpj.length !== 14 || isSameDigits( numCnpj ) )
          ? false
          : validateCNPJ( [ getDigit( numCnpj, s ), getDigit( numCnpj, ++s ) ], DV )

```

<br>

Agora para melhorar nosso `if` ternário podemos inverter a lógica assim:

```js

return !( numCnpj.length !== 14 || isSameDigits( numCnpj ) )
          ? validateThisCNPJUsing( [ getDigit( numCnpj, s ), getDigit( numCnpj, ++s ) ], DV )
          : false

```

<br>


Sabendo disso, precisamos refatorar a seguinte função:

```js

const validate = ( numCnpj ) => ( digits = [], DV = [] ) =>
  ( digits.length === 2 )
    ? isInvalidDigit( digits[ 0 ], DV[ 0 ] ) || 
      isInvalidDigit( digits[ 1 ], DV[ 1 ])
      ? false
      : true
    : false

```

<br>


Para isso, inicialmente iremos inverter a lógica da função `isInvalidDigit`:


```js

// const isInvalidDigit = ( d1, d2 ) => String( d1 ) !== String( d2 )
const isValidDigit = ( d1, d2 ) => String( d1 ) === String( d2 )

```

<br>


Com isso podemos refatorar o código anterior para:

```js

const validate = ( numCnpj ) => ( digits = [], DV = [] ) =>
  ( digits.length === 2 )
    ? ( isValidDigit( digits[ 0 ], DV[ 0 ] ) && 
        isValidDigit( digits[ 1 ], DV[ 1 ]) )
    : false

```

<br>


E ainda podemos melhorar assim:

```js

const validate = ( numCnpj ) => ( digits = [], DV = [] ) =>
  ( digits.length === 2 ) && 
  ( isValidDigit( digits[ 0 ], DV[ 0 ] ) && 
    isValidDigit( digits[ 1 ], DV[ 1 ]) )

```

Levando conosco essa mesma técnica iremos refatorar a seguinte parte:

```js

return !( numCnpj.length !== 14 || isSameDigits( numCnpj ) )
          ? validateThisCNPJUsing( [ getDigit( numCnpj, s ), getDigit( numCnpj, ++s ) ], DV )
          : false

```

Para isso:

```js

return !( numCnpj.length !== 14 || isSameDigits( numCnpj ) ) &&
        validateThisCNPJUsing( [ getDigit( numCnpj, s ), getDigit( numCnpj, ++s ) ], DV )

```

<br>

> **O queeeee!!! Você acha que nosso código não está rodando???**

<br>

Então (SEMPRE) olhe os testes!!!

```sh

» npm run test

> consulta-cnpj@1.0.0 test /Users/swiss/www/Projetos/CNPJ/consultaCnpj
> mocha "tests/*.test.js"



  ConsultaCNPJ API
    #buildPromise(new Error('Falha geral!'))
      ✓ should return an Error
    #buildPromise({type: 'error'})
      ✓ should return an Error
    #buildPromise({type: 'Error'})
      ✓ should return an Error
    #buildPromise({type: 'ERROR'})
      ✓ should return an Error
    #buildPromise(null)
      ✓ should return an Error
    #buildPromise(undefined)
      ✓ should return an Error
    #buildPromise('')
      ✓ should return an Error
    #buildPromise(null)
      ✓ should return an Error
    #validateRequest(mockedFailRequest, message)
      ✓ should return an error
    #validateRequest(mockedSuccessRequest)
      ✓ should return an object
    #generateImageBase64(mockedFailBody)
      ✓ should return an Error
    #getBodyAndEncode(response)
      ✓ should return a string
    #unmask("12.123.123/1234-12")
      ✓ should return the unmasked CNPJ (only numbers)
    #validate(#unmask("12.123.123/1234-12"))
      ✓ should return false
    #validate(#unmask("00.000.000/0000-00"))
      ✓ should return false
    #validate("123")
      ✓ should return false
    #validate(#unmask("21.876.883/0001-79"))
      ✓ should return false
    #validate(unmask(21.876.883/0001-78))
      ✓ should return true
    #getParams()
      ✓ should return an object (167ms)
    #getBasicInfos(null, 'sessionId', 'solvedCaptcha')
      ✓ should return an Error
    #getBasicInfos('cnpj', null, 'solvedCaptcha')
      ✓ should return an Error
    #getBasicInfos('cnpj', 'sessionId', null)
      ✓ should return an Error
    #getBasicInfos('00.000.000/0000-00', 'sessionId', 'solvedCaptcha')
      ✓ should return an Error
    #getBasicInfos(21.876.883/0001-78, 'sessionId', 'solvedCaptcha')
      ✓ should return an Error (312ms)


  24 passing (545ms)

```

<br>

Depois disso tudo quero que você perceba uma coisa: não podemos trocar `DV` por<br>
`numCnpj.substr( s )` pois esse valor depende de `s` e ele é incrementado quando<br>
chamamos `getDigit( numCnpj, ++s )`.

Logo para conseguirmos refatorar essa parte teremos que modificar a função `validate` <br>
para que o primeiro parâmetro seja o `DV`, logo mais você entenderá o porquê.

```js

const validate = ( numCnpj ) => ( DV, digits = [] ) =>
  ( digits.length === 2 ) && 
  ( isValidDigit( digits[ 0 ], DV[ 0 ] ) && 
    isValidDigit( digits[ 1 ], DV[ 1 ]) )

```

<br>

Agora sim podemos utilizar a função `validate` ela na função `validateCnpj` trocando<br>
a constante `DV` por `numCnpj.substr( s )`, pois **seu valor é SEMPRE esse!**

```js

const validateCnpj = ( cnpj, id = 0 ) => {

  const numCnpj = unmasker( cnpj )
  const validateThisCNPJUsing = validate( numCnpj )
  let s = ( numCnpj.length - 2 )

  return !( numCnpj.length !== 14 || isSameDigits( numCnpj ) ) &&
          validateThisCNPJUsing(  numCnpj.substr( s ), 
                                  [ getDigit( numCnpj, s ), getDigit( numCnpj, ++s ) ] 
                                )
}

```

<br>

Entretanto perceba que o `return` principal testa:

- se NÃO `( numCnpj.length !== 14 || isSameDigits( numCnpj ) )`
- E
- se É `validateThisCNPJUsing`

Logo iremos separar essas lógicas, primeiramente separando o teste inválido:

```js

const isInvalidCNPJ = ( numCnpj ) =>
  ( numCnpj.length !== 14 || isSameDigits( numCnpj ) )

const validateCnpj = ( cnpj, id = 0 ) => {

  const numCnpj = unmasker( cnpj )
  const validateThisCNPJUsing = validate( numCnpj )
  let s = ( numCnpj.length - 2 )

  return !( isInvalidCNPJ( numCnpj ) ) &&
          validateThisCNPJUsing(  numCnpj.substr( s ), 
                                  [ getDigit( numCnpj, s ), getDigit( numCnpj, ++s ) ] 
                                )
}

```

<br>

Então como fizemos isso para o teste inválido vamos fazer o mesmo para o teste válido:

```js

const getValidationDigit = ( numCnpj ) => ( s ) =>
  [ getDigit( numCnpj, s ), getDigit( numCnpj, ++s ) ] 

const validateCnpj = ( cnpj, id = 0 ) => {

  const numCnpj = unmasker( cnpj )
  const validateThisCNPJUsing = validate( numCnpj )
  const testValidationDigit = getValidationDigit( numCnpj )

  let s = ( numCnpj.length - 2 )

  return !( isInvalidCNPJ( numCnpj ) ) &&
            validateThisCNPJUsing( numCnpj.substr( s ), testValidationDigit( s ) )
}

```

Porém essa foi apenas a primeira etapa, quero que você tenha em mente que<br>
nós devemos encapsular apenas UMA chamada o seguinte código:

```js

validateThisCNPJUsing( numCnpj.substr( s ), testValidationDigit( s ) )

```

Para isso vamos criar a função `isValidCNPJ` onde teremos que passar como parâmetro<br>
`numCnpj` e `s` dessa forma:

```js

const isValidCNPJ = ( numCnpj, s ) => 
  validate( numCnpj )
          ( numCnpj.substr( s ), getValidationDigit( numCnpj )( s ) )

```

Usando assim:

```js

const isValidCNPJ = ( numCnpj, s ) => 
  validate( numCnpj )
          ( numCnpj.substr( s ), getValidationDigit( numCnpj )( s ) )

const validateCnpj = ( cnpj ) => {

  const numCnpj = unmasker( cnpj )

  return !( isInvalidCNPJ( numCnpj ) ) && isValidCNPJ( numCnpj, numCnpj.length - 2 )
            
}

```

Contudo perceba que o `s` virou `numCnpj.length - 2` e como estamos passando como parâmetro<br>
a constante `numCnpj` podemos reduzir nosso código para isso:

```js

const isValidCNPJ = ( numCnpj, s ) => 
  validate( numCnpj )
          ( numCnpj.substr( s ), getValidationDigit( numCnpj )( s ) )

const validateCnpj = ( cnpj ) => {

  const numCnpj = unmasker( cnpj )

  return !( isInvalidCNPJ( numCnpj ) ) && isValidCNPJ( numCnpj, numCnpj.length - 2 )
            
}

```

<br>

Todavia se o valor de `numCnpj` já está sendo passado como parâmetro, podemos reduzir<br>
ainda mais nosso código removendo o parâmetro `s` e fazendo seu cálculo internamente,


```js

const isValidCNPJ = ( numCnpj ) => 
  validate( numCnpj )
          ( numCnpj.substr( numCnpj.length - 2 ), 
            getValidationDigit( numCnpj )( numCnpj.length - 2 ) )

const validateCnpj = ( cnpj ) => {

  const numCnpj = unmasker( cnpj )

  return !( isInvalidCNPJ( numCnpj ) ) && isValidCNPJ( numCnpj )
            
}

```

<br>

Com isso percebemos que nossa função `validateCnpj` na verdade retorna a execução<br>
de duas outras funções, `isInvalidCNPJ` e `isValidCNPJ`. Logo podemos reduzir<br>
mais um pouquinho nossa função principal, deixando-a mais semântica:

```js

const testCNPJ = ( numCnpj ) => 
  !( isInvalidCNPJ( numCnpj ) ) && isValidCNPJ( numCnpj )

const validateCnpj = ( cnpj ) => testCNPJ( unmasker( cnpj ) )

```

<br>

Confira comigo como está nosso código atual:

```js
const unmasker = require('./unmaskNumbers')
const isValidDigit = ( d1, d2 ) => String( d1 ) === String( d2 )
const isSameDigits = str => str.split( '' ).every( ( elem ) => elem === str[ 0 ] )

const getR = ( t ) => ( t ) < 2 ? 0 : 11 - t
const getData = ( numCnpj, s ) => [ 
  numCnpj.substr( 0, s ), 0, s - 7 
]

const getSomeData = ( t, b, s, p, i ) => [
  t + ( b.charAt( s - i ) * p ), --p, ( p < 2 ? 9 : p )
]

const validate = ( numCnpj ) => ( DV, digits = [] ) =>
  ( digits.length === 2 ) && 
  ( isValidDigit( digits[ 0 ], DV[ 0 ] ) && 
    isValidDigit( digits[ 1 ], DV[ 1 ]) )

const getDigit = ( numCnpj, s ) => {

  let [ b, t, p ] = getData( numCnpj, s )

  for ( let i = s; i >= 1; i-- ) {
    [ t, _, p ] = getSomeData( t, b, s, p, i );
  }

  return getR( t % 11 )
}

const isInvalidCNPJ = ( numCnpj ) =>
  ( numCnpj.length !== 14 || isSameDigits( numCnpj ) )

const getValidationDigit = ( numCnpj ) => ( s ) =>
  [ getDigit( numCnpj, s ), getDigit( numCnpj, ++s ) ] 

const isValidCNPJ = ( numCnpj ) => 
  validate( numCnpj )
          ( numCnpj.substr( numCnpj.length - 2 ), 
            getValidationDigit( numCnpj )( numCnpj.length - 2 ) )

const testCNPJ = ( numCnpj ) => 
  !( isInvalidCNPJ( numCnpj ) ) && isValidCNPJ( numCnpj )

const validateCnpj = ( cnpj ) => testCNPJ( unmasker( cnpj ) )

module.exports = validateCnpj

```

<br>

Com a mesma técnica passada podemos refatorar a seguinte parte:

```js

const getValidationDigit = ( numCnpj ) => ( s ) =>
  [ getDigit( numCnpj, s ), getDigit( numCnpj, ++s ) ] 

const isValidCNPJ = ( numCnpj ) => 
  validate( numCnpj )
          ( numCnpj.substr( numCnpj.length - 2 ), 
            getValidationDigit( numCnpj )( numCnpj.length - 2 ) )

```

Removendo o `s` dos parâmetros da função `getValidationDigit` assim:

```js

const getValidationDigit = ( numCnpj ) => [ 
  getDigit( numCnpj, numCnpj.length - 2 ), 
  getDigit( numCnpj, numCnpj.length - 1 ) 
] 

const isValidCNPJ = ( numCnpj ) => 
  validate( numCnpj )
          ( numCnpj.substr( numCnpj.length - 2 ), getValidationDigit( numCnpj ) )

```

<br>

Todavia perceba como é a função `validate` e a sua chamada:


```js

const validate = ( numCnpj ) => ( DV, digits = [] ) =>
  ( digits.length === 2 ) && 
  ( isValidDigit( digits[ 0 ], DV[ 0 ] ) && 
    isValidDigit( digits[ 1 ], DV[ 1 ]) )

const isValidCNPJ = ( numCnpj ) => 
  validate( numCnpj )
          ( numCnpj.substr( numCnpj.length - 2 ), 
            getValidationDigit( numCnpj ) )

```

<br>

Notou que passamos `numCnpj` mas esse valor não é usado internamente na função?

Sabendo disso, podemos refatorar essa função, e sua chamada, da seguinte maneira:

```js

const validate = ( DV, digits = [] ) =>
  ( digits.length === 2 ) && 
  ( isValidDigit( digits[ 0 ], DV[ 0 ] ) && 
    isValidDigit( digits[ 1 ], DV[ 1 ] ) )

const isValidCNPJ = ( numCnpj ) => 
  validate( numCnpj.substr( numCnpj.length - 2 ), getValidationDigit( numCnpj ) )

```

<br>

**Não irei explicar mais pois essa aula já se está deveras GIGANTE!**


Com isso deixamos todas nossas funções em **uma linha** com exceção da `getDigit` que<br>
possui efeito colateral graças ao `for`, por isso deixamos ela em mais de uma linha!

Para que seu efeito colateral seja *enclausurado* nessa função.

<br>

<hr>
<br>

## Final

Nosso código final ficou assim:

```js

const unmask = require('./unmaskNumbers')
const NOT = ( x ) => !x

const isSameDigits = str => 
  str.split( '' ).every( ( elem ) => elem === str[ 0 ] )

const isValidDigit = ( d1, d2, index ) => 
  String( d1[ index ] ) === String( d2[ index ] )

const getS = ( numCnpj ) => numCnpj.length - 2 

const getR = ( t ) => 
  ( t  < 2 )
    ? 0 
    : 11 - t

const getP = ( p ) => 
  ( p < 2 ) 
    ? 9 
    : p 

const getData = ( numCnpj, s ) => [ 
  numCnpj.substr( 0, s ), 0, s - 7 
]

const getSomeData = ( t, b, s, p, i ) => [
  t + ( b.charAt( s - i ) * p ), --p, getP( p )
]

const getValidationDigit = ( numCnpj ) => [ 
  getDigit( numCnpj ), getDigit( numCnpj, 'second' ) 
] 

const getDigit = ( numCnpj, second = false ) => {

  let s = ( !second ) ? getS( numCnpj ) : getS( numCnpj ) + 1
  let [ b, t, p ] = getData( numCnpj, s )

  for ( let i = s; i > 0; i-- ) {
    [ t, _, p ] = getSomeData( t, b, s, p, i );
  }

  return getR( t % 11 )
}

const isInvalidCNPJ = ( numCnpj ) =>
  ( numCnpj.length !== 14 || isSameDigits( numCnpj ) )


const validateCnpj = ( DV, digits = [] ) =>
  ( digits.length === 2 ) && 
  ( isValidDigit( digits, DV, 0 ) && 
    isValidDigit( digits, DV, 1 ) )

const isValidCNPJ = ( numCnpj ) => 
  validateCnpj( numCnpj.substr( getS( numCnpj ) ), getValidationDigit( numCnpj ) )

const testCNPJ = ( numCnpj ) => NOT( isInvalidCNPJ( numCnpj ) ) && 
                                isValidCNPJ( numCnpj )

const validate = ( cnpj ) => testCNPJ( unmask( cnpj ) )

module.exports = validate


const CNPJs = [
  '03376337/0001-96', '49402415/0001-80',
  '00000000/0001-96', '11111111/0001-80',
]

CNPJs.forEach( ( cnpj ) => console.log( `${cnpj}: ${validate( cnpj )}` ) )

```

<br>

Note como ficou a escrita da nossa função principal: 
`const validate = ( cnpj ) => testCNPJ( unmask( cnpj ) )`

<br>

> Valide CNPJ testando se o CNPJ sem máscara.

<br>

E a nossa função de validação:

```js
const testCNPJ = ( numCnpj ) => 
  NOT( isInvalidCNPJ( numCnpj ) ) && isValidCNPJ( numCnpj )
```

<br>

> Teste CNPJ se NÃO for um CNPJ inválido E for um CNPJ válido.

<br>

Usamos como primeiro teste **SEMPRE** a função que invalida, aí sim a função<br>
que valida, por isso utilizamos o `&&` para garantir que se no primeiro teste<br>
retornar `false` nossa função não necessite executar o resto. 


Porém veja o meu código final:

```js

const unmasker = require('./unmaskNumbers')
const NOT = ( x ) => !x
const getR = ( t ) => 
  ( t ) >= 2 
    ? 11 - t
    : 0 
const getS = ( numCnpj ) => numCnpj.length - 2 
const getP = ( p ) => ( p < 2 ? 9 : p )
const isSameDigits = str => 
  str.split( '' ).every( ( elem ) => elem === str[ 0 ] )

const isValidDigits = ( digits, DV ) =>
  ( String( digits[ 0 ] ) === String( DV[ 0 ] ) ) && 
  ( String( digits[ 1 ] ) === String( DV[ 1 ] ) )

const getData = ( numCnpj, s ) => [ 
  numCnpj.substr( 0, s ), 0, s - 7 
]

const getSomeData = ( t, b, s, p, i ) => [
  t + ( b.charAt( s - i ) * p ), --p, getP( p )
]

const getValidationDigit = ( numCnpj ) => [ 
  getDigit( numCnpj ), getDigit( numCnpj, 'second' ) 
] 

const getDigit = ( numCnpj, second = false ) => {

  let s = ( !second ) ? getS( numCnpj ) : getS( numCnpj ) + 1
  let [ b, t, p ] = getData( numCnpj, s )

  for ( let i = s; i > 0; i-- ) {
    [ t, _, p ] = getSomeData( t, b, s, p, i );
  }

  return getR( t % 11 )
}

const isInvalidCNPJ = ( numCnpj ) =>
  ( numCnpj.length !== 14 || isSameDigits( numCnpj ) )


const validateCnpj = ( DV, digits = [] ) =>
  ( digits.length === 2 ) && isValidDigits( digits, DV )
  

const isValidCNPJ = ( numCnpj ) => 
  validateCnpj( numCnpj.substr( getS( numCnpj ) ), getValidationDigit( numCnpj ) )

const testCNPJ = ( numCnpj ) => NOT( isInvalidCNPJ( numCnpj ) ) && 
                                isValidCNPJ( numCnpj )

const validate = ( cnpj ) => testCNPJ( unmasker( cnpj ) )

module.exports = validate


const CNPJs = [
  '03376337/0001-96', '49402415/0001-80',
  '00000000/0001-96', '22222222/0001-80',
]

CNPJs.forEach( ( cnpj ) => console.log( `${cnpj}: ${validate( cnpj )}` ) )

```

<br>

O qual é um tanto diferente do primeiro código refatorado que fiz:

```js

const unmask = require( './unmaskNumbers' )

const getDigit = t => ( t >= 2 ) ? 11 - t : 0
const getData = ( CNPJ, s ) => [ 
  CNPJ.substr( 0, s ), 0, s - 7 
]
const getSomeData = ( t, b, s, p, i ) => [ 
  t + ( b.charAt( s - i ) * p ), --p, ( p < 2 ? 9 : p ) 
]

const isValidDigit = ( d1, d2 ) => ( String( d1 ) === String( d2 ) )
const isSameDigits = array => 
  array.split( '' ).every( ( elem ) => elem === array[ 0 ] )

const validDigit = ( CNPJ, second = false ) => {

  let s = ( CNPJ.length - 2 )
  let id = 0
  const DV = CNPJ.substr( s )

  if ( second ) {
    ++s;
    ++id
  }

  let [ b, t, p ] = getData( CNPJ, s )

  for ( let i = s; i >= 1; i-- ) { [ t, _, p ] = getSomeData( t, b, s, p, i )
  }

  return isValidDigit( getDigit( t % 11 ), DV[ id ] )
}

const validate = ( CNPJ ) => 
  !( CNPJ.length !== 14 || isSameDigits( CNPJ ) )
    ? ( validDigit( CNPJ ) && validDigit( CNPJ, true ) )
    : false

const validateCnpj = ( CNPJ ) => validate( unmask( CNPJ ) )

module.exports = validateCnpj

```

<br>

Esse último código ficou menor que o demonstrado em aula, porém EU gostei<br>
mais do que foi ensinado para você, agora o porquê você terá que me dizer!

<br>
<br>

<hr>

<br>

## Técnicas

As técnicas utilizadas nessa refatoração foram as seguintes:

- nosso code style
- arrow function
- if ternário
- negação semântica (NOT)
- agrupamento de testes lógicos
- destructuring assignment
- retorno de função como *Array*
- transparência referencial

## Exercícios


<br>

1) Analise meus dois últimos códigos e escolha o qual você achou melhor e por quê?

<br>

<br>


2) Encontre uma função de validação que esteja na forma imperativa e<br>
refatore-a utilizando as técnicas já ensinadas.

*ps: pode ser qualquer validação, porém quem refatorar a MAIOR ganha!*

<br>

<br>
<br>

<br>