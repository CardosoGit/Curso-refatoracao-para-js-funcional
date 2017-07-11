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


```js

// const unmasker = require('./unmaskNumbers');
// Retorna apenas os números contidos na String informada.
function unmaskNumbers(num) {
  let unmasked = num.match(/\d+/g);
  unmasked = unmasked.join('');

  return String(unmasked);
}



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