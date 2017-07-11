# Validação CNPJ

Dessa vez não irei mostrar como fazer essa validação passo-a-passo como fiz<br>
[com essa validação de CPF], mas sim mostrar como refatorar uma validação<br>
existente de um projeto já existente.

O projeto de base será esse [consultaCnpj](https://github.com/antonellisantos/consultaCnpj).

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

Quando abrimos o arquivo `lib/validateCnpj.js` encontramos de cara isso:

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

Inicialmente vamos iniciar a refatoração pela função mais simples:

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

O método [match](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String/match) sempre irá retornar um *Array* logo podemos utilizar a função [join](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/join)<br>
que converte um *Array* em uma *String*, deixando nosso código assim:

```js

const unmaskNumbers = ( num ) => num.match( /\d+/g ).join( '' )

module.exports = unmaskNumbers

```

<br>

> **Se você rodar os testes novamente devem dar o mesmo resultado que o inicial!**

<br>

*Caso você não tenha entendido essa parte me envie essa dúvida em privado.*


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

Só olhe essa função da validação do CPF:

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

**Agora imagine uma forma onde nossa função podemos retornar esses três valores!**

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

> **Notou que deixei comentado o código que substituimos né?**

Com isso inferimos que mesma função será usada em qualquer parte necessária.

**Ainda temos mais linhas iguais nesse código, então *bora* refatorar!** 

Perceba que o valor de `r` tem a mesma lógica nas duas partes onde é chamado:

```js

  r = ((t % 11) < 2 ? 0 : 11 - (t % 11));

```

Para encapsularmos essa função é bem simples! Perceba que a única variável é o `t`.
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

Obviamente você já sabe que mesmo encapsulando o `for` ainda temos efeitos colaterais.
Depois iremos melhorar essa parte, por hora que que você atenha-se a essa parte:

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

  let d1 = getR( t % 11 )

  s += 1;
  [ b, t, p ] = getData( numCnpj, s )

  for ( let i = s; i >= 1; i-- ) {
    [ t, _, p ] = getSomeData( t, b, s, p, i )
  }

  let d2 = getR( t % 11 )

  return validateCNPJ( [ d1, d2 ], DV )
  // return true;
}

module.exports = validateCnpj


```
