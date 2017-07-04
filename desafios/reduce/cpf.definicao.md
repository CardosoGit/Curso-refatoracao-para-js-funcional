# CPF

O número de um CPF tem 9 algarismos e mais dois dígitos verificadores,<br> 
que são indicados após uma barra. Logo, um CPF tem 11 algarismos.<br>

O número do CPF é escrito na forma ABCDEFGHI/JK ou diretamente como ABCDEFGHIJK, <br>
onde os algarismos não podem ser todos iguais entre si.
 <br>
O J é chamado 1° dígito verificador do número do CPF.
 <br>
O K é chamado 2° dígito verificador do número do CPF.
<br>

## Primeiro Dígito

Para obter J multiplicamos A, B, C, D, E, F, G, H e I pelas constantes correspondentes:

```
Ax10	Bx9	Cx8	Dx7	Ex6	Fx5	Gx4	Hx3	Ix2
```
 
O resultado da soma, 10A + 9B + 8C + 7D + 6E + 5F + 4G + 3H + 2I, é dividido por 11.
 
Analisamos então o RESTO dessa divisão:

Se for 0 ou 1, o dígito J é [0] (zero). Se for 2, 3, 4, 5, 6, 7, 8, 9 ou 10, o dígito J é [11 - RESTO]
 

## Segundo Dígito

Já temos J. Para obter K multiplicamos A, B, C, D, E, F, G, H, I e J pelas constantes correspondentes:
 
```
11xA  10xB  9xC  8xD  7xE  6xF  5xG  4xH  3xI  2xJ
```
 
O resultado da soma, 11A + 10B + 9C + 8D + 7E + 6F + 5G + 4H + 3I + 2J, é dividido por 11.
 
Verificamos então o RESTO dessa divisão:
 
Se for 0 ou 1, o dígito K é [0] (zero). Se for 2, 3, 4, 5, 6, 7, 8, 9 ou 10, o dígito K é [11 - RESTO].
 

## Iniciando

Como vimos acima a validação do CPF se dá por meio do cálculo dos seus dois últimos<br>
digitos, chamados verificadores, e eles só são válidos quando cada um é resultado<br>
das contas explicadas anteriormente.

Sabendo disso já podemos definir algumas funções que teremos:

```js
const getCpfToCheck = ( cpf ) => 
  ( cpf.map )
    ? cpf.slice( 0, 9 )
    : cpf.substr( 0, 9 ).split( '' )
```

Dessa forma podemos passar o cpf tanto como *String* como um *Array* de números, <br>
logo mais nos decidiremos qual iremos usar por padrão. Porém perceba que **SEMPRE** <br>
quero retornar um *Array*.

Isso porque precisamos multiplicar cada valor por um peso.

Com isso já podemos imaginar que iremos usar um `reduce` para isso:


```js

const cpf1 = getCpfToCheck( '00000000000' )
const cpf2 = getCpfToCheck( '04998264931' )

// precisamos multiplicar do 10 ao 2
let total = 10

const resultCPF = cpf2.reduce( ( result, num, i ) => 
  result + ( num * total-- ), 0 )

```

Separando o callback do `reduce` ficará assim:

```js

const cpf = getCpfToCheck( '04998264931' )

// precisamos multiplicar do 10 ao 2
let total = 10

const toSumOfMultiplication = ( total ) => ( result, num, i ) => 
  result + ( num * total-- )

const resultCPF = cpf.reduce( toSumOfMultiplication( total ), 0 )

```

E como já sabemos que teremos que fazer isso para os dois últimos dígitos<br>
já podemos encapsular essa lógica em uam função que irá receber também o `total`:


```js

const cpf = getCpfToCheck( '04998264931' )

const toSumOfMultiplication = ( total ) => ( result, num, i ) => 
  result + ( num * total-- )

const getSumOfMultiplication = ( list, total ) => 
  list.reduce( toSumOfMultiplication( total ), 0 )

const resultCPF = getSumOfMultiplication( cpf, 10 )

```

Agora chegamos na parte principal dessa etapa.


Verificamos se resultado da soma de `getSumOfMultiplication` é dividido por 11.

Se for `0` ou `1`, o dígito J é `0`. Se for 2, 3, 4, 5, 6, 7, 8, 9 ou 10,<br> 
o dígito J é `11 - RESTO`.

Como sabemos que iremos testar em duas partes diferentes o resto da divisão<br> 
por 11, podemos criar uma função para isso:

```js

const mod11 = ( num ) => num % 11 

```


E também para o teste se for `0` ou `1`:


```js

const testDigit = ( num ) => 
  ( num < 2 )
    ? 0
    : 11 - num

```

Com isso já temos o seguinte código:

```js

const mod11 = ( num ) => num % 11 

const testDigit = ( num ) => 
  ( num < 2 )
    ? 0
    : 11 - num

const getCpfToCheck = ( cpf ) => 
  ( cpf.map )
    ? cpf.slice( 0, 9 )
    : cpf.substr( 0, 9 ).split( '' )

const cpf = getCpfToCheck( '04998264931' )
let total = 10

const toSumOfMultiplication = ( total ) => ( result, num, i ) => 
  result + ( num * total-- )

const getSumOfMultiplication = ( list, total ) => 
  list.reduce( toSumOfMultiplication( total ), 0 )

const firstDigit = testDigit( mod11( getSumOfMultiplication( cpf, 10 ) ) )

console.log(firstDigit) // 3

```

Rodando esse código veremos que o resultado é `3`, exatamente o que queremos.

Agora vamos para o segundo dígito verificador, sua regra é a mesma para o <br>
primeiro dígito, porém ela também utiliza o valor do primeiro dígito.

```js

const secondDigit = testDigit( mod11( 
                                  getSumOfMultiplication( cpf.concat( firstDigit ), 
                                                          11 ) ) )

console.log(secondDigit) // 1

```

Pronto! Agora basta fazermos a função que receberá o CPF e retornará<br>
se ele é verdadeiro ou falso.

Para isso precisamos criar uma função que:

- pegue apenas os 2 últimos dígitos do CPF
- compare a concatenação do resultado da validação
  dos 2 últimos dígitos com o CPF passado


```js

const getTwoLastDigits = ( cpf ) => `${cpf.charAt( 9 )}${cpf.charAt( 10 )}` 
const mergeDigits = ( num1, num2 ) => `${num1}${num2}`

const isEqual = ( a ) => ( b ) => b === a


const validate = ( cpfFull ) => {
  
  const cpf = getCpfToCheck( cpfFull )
  const firstDigit = testDigit( mod11( getSumOfMultiplication( cpf, 10 ) ) )
  const secondDigit = testDigit( mod11( 
                                    getSumOfMultiplication( cpf.concat( firstDigit ), 
                                                            11 ) ) )

  return isEqual( getTwoLastDigits( cpfFull ) )( mergeDigits( firstDigit, secondDigit ) )

}
```

> Até aí tudo bem né?


Clarooooo que não! Esquecemos de testar os CPFs com dígitos iguais.


```js

const CPFS = [ 
  '04998264931', '03506838326','04864713901',
  '03506838321', '22222222222', '00000000000' 
]

CPFS.forEach( ( cpf ) => console.log( `${cpf}: ${validate( cpf )}` ) )

/**
04998264931: true
03506838326: true
04864713901: true
03506838321: false
22222222222: true
00000000000: true
*/

```

Para fazermos esse teste primeiramente vamos criar um gerador para isso.

Precisamos então criar as seguintes funções:

- gere um *Array* com os valores de `0` a `9`
- receba um caracter e retorne ele repetido N vezes

E depois ainda iremos testar se o nosso CPF é igual a algum desses CPFs, <br>
se fossemos fazer na mão seria algo assim:

<br>

```js

if( cpf === "00000000000" || cpf === "11111111111" || cpf === "22222222222" || 
    cpf === "33333333333" || cpf === "44444444444" || cpf === "55555555555" || 
    cpf === "66666666666" || cpf === "77777777777" || cpf === "88888888888" || 
    cpf === "99999999999" )

``` 
<br>

> **Ridículo né?**

<br>

Então vamos criar as funções para automatizar isso:

<br>

```js

const generateArray = ( length ) => Array.from( { length }, ( v, k ) => k )
const generateStringSequence = ( times ) => ( char ) => `${char}`.repeat( times )

const sequenceFrom0To9 = generateArray( 10 )
const generateSequenceSize11 = generateStringSequence( 11 )

const isIn = ( list ) => ( value ) => 
  list.findIndex( v => value === v ) >= 0

``` 

<br>

Perceba que agora trocarei aquele `if` gigante pela `isIn` e usarei assim:

<br>

```js

const generateStringSequence = ( times ) => ( char ) => `${char}`.repeat( times )
const generateArray = ( length ) => Array.from( { length }, ( v, k ) => k )

const sequenceFrom0To9 = generateArray( 10 )
const generateSequenceSize11 = generateStringSequence( 11 )
const CPFS_WITH_SAME_DIGIT = sequenceFrom0To9.map( generateSequenceSize11 )

const isIn = ( list ) => ( value ) => 
  list.findIndex( v => value === v ) >= 0

const validate = ( cpfFull ) => {
  
  const cpf = getCpfToCheck( cpfFull )
  const firstDigit = testDigit( mod11( getSumOfMultiplication( cpf, 10 ) ) )
  const secondDigit = testDigit( mod11( 
                                    getSumOfMultiplication( cpf.concat( firstDigit ), 
                                                            11 ) ) )

  return !isIn( CPFS_WITH_SAME_DIGIT )( cpfFull ) &&
    isEqual( getTwoLastDigits( cpfFull ) )( mergeDigits( firstDigit, secondDigit ) )

}

``` 

**AGOOOORAAAA SIMMMMM!** Estamos validando corretamente.

Porém ainda podemos melhorar esse código, perceba que `CPFS_WITH_SAME_DIGIT` <br>
está vindo de fora da função `validate`, o mais correto é estar dentro. 

Então podemos fazer assim:

<br>

```js

const generateStringSequence = ( times ) => ( char ) => `${char}`.repeat( times )
const generateArray = ( length ) => Array.from( { length }, ( v, k ) => k )

const sequenceFrom0To9 = generateArray( 10 )
const generateSequenceSize11 = generateStringSequence( 11 )
const CPFS_WITH_SAME_DIGIT = 

const isIn = ( list ) => ( value ) => 
  list.findIndex( v => value === v ) >= 0

const validate = ( cpfFull ) => {
  
  const cpf = getCpfToCheck( cpfFull )
  const firstDigit = testDigit( mod11( getSumOfMultiplication( cpf, 10 ) ) )
  const secondDigit = testDigit( mod11( 
                                    getSumOfMultiplication( cpf.concat( firstDigit ), 
                                                            11 ) ) )

  return !isIn( generateArray( 10 ).map( generateSequenceSize11 ) )( cpfFull ) &&
    isEqual( getTwoLastDigits( cpfFull ) )( mergeDigits( firstDigit, secondDigit ) )

}

``` 

Vamos melhorar mais um pouco, dessa forma:


<br>

```js
const NOT = ( x ) => !x

const isSameDigitsCPF = ( cpfFull ) => 
  isIn( generateArray( 10 ).map( generateSequenceSize11 ) )( cpfFull )

const isValidCPF = ( cpfFull ) => ( firstDigit, secondDigit ) =>
  isEqual( getTwoLastDigits( cpfFull ) )
        ( mergeDigits( firstDigit, secondDigit ) )

const getValidationDigit = ( total ) => ( cpf ) =>
  testDigit( mod11( getSumOfMultiplication( cpf, total ) ) )

const validate = ( cpfFull ) => {
  
  const cpf = getCpfToCheck( cpfFull )
  const firstDigit = getValidationDigit( 10 )( cpf ) ) )
  const secondDigit = getValidationDigit( 11 )(  cpf.concat( firstDigit ) ) ) )

  return  NOT( isSameDigitsCPF( cpfFull ) ) && 
          isValidCPF( cpfFull )( firstDigit, secondDigit )
}

``` 

<br>

Agora sim temos nosso código final assim:

<br>

```js

const mod11 = ( num ) => num % 11 
const NOT = ( x ) => !x
const isEqual = ( a ) => ( b ) => b === a 
const mergeDigits = ( num1, num2 ) => `${num1}${num2}`
const getTwoLastDigits = ( cpf ) => `${cpf[ 9 ]}${cpf[ 10 ]}`
const getCpfToCheckInArray = ( cpf ) => cpf.substr( 0, 9 ).split( '' )
const generateArray = ( length ) => Array.from( { length }, ( v, k ) => k )
const isIn = ( list ) => ( value ) => 
  list.findIndex( v => value === v ) >= 0

const generateStringSequence = ( times ) => ( char ) => 
  ( `${char}`.repeat( times ) )

const getDigit = ( num ) => 
  ( num > 1 )
    ? 11 - num
    : 0

const toSumOfMultiplication = ( total ) => ( result, num, i ) => 
  result + ( num * total-- )

const getSumOfMultiplication = ( list, total ) => 
  list.reduce( toSumOfMultiplication( total ), 0 )


const isSameDigitsCPF = ( cpfFull ) => 
  isIn( generateArray( 10 ).map( generateStringSequence( 11 ) ) )( cpfFull )

const isValidCPF = ( cpfFull ) => ( firstDigit, secondDigit ) =>
  isEqual( getTwoLastDigits( cpfFull ) )
         ( mergeDigits( firstDigit, secondDigit ) )

const getValidationDigit = ( total ) => ( cpf ) =>
  getDigit( mod11( getSumOfMultiplication( cpf, total ) ) )

const validate = ( cpfFull ) => {
  
  const cpf = getCpfToCheckInArray( cpfFull )
  const firstDigit = getValidationDigit( 10 )( cpf )
  const secondDigit = getValidationDigit( 11 )( cpf.concat( firstDigit ) )

  return  NOT( isSameDigitsCPF( cpfFull ) ) && 
          isValidCPF( cpfFull )( firstDigit, secondDigit )
}

const CPFS = [ 
  '04998264931', '03506838326','04864713901',
  '03506838321', '22222222222', '00000000000' 
  ]

CPFS.forEach( ( cpf ) => console.log( `${cpf}: ${validate( cpf )}` ) )

```