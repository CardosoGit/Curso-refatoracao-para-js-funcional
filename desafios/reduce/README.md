# Desafio - Reduce

## Validação de CPF

### Código inicial

```js

module.exports = (value)=>{ 
  console.log(value)
  var cpf = value; 
  //exp = /.|-/g 
  //cpf = cpf.toString().replace( exp, "" ); 
  var digitoDigitado = eval(cpf.charAt(9)+cpf.charAt(10)); 
  var soma1=0, soma2=0; 
  var vlr =11; 
  for(i=0;i<9;i++){ 
    soma1+=eval(cpf.charAt(i)*(vlr-1)); 
    soma2+=eval(cpf.charAt(i)*vlr); 
    vlr--; 
  }    
  soma1 = (((soma1*10)%11)==10 ? 0:((soma1*10)%11)); 
  soma2 = (((soma2+(2*soma1))*10)%11); 

  if(cpf == "11111111111" || cpf == "22222222222" || cpf == 
    "33333333333" || cpf == "44444444444" || cpf == "55555555555" || cpf == 
    "66666666666" || cpf == "77777777777" || cpf == "88888888888" || cpf == 
    "99999999999" || cpf == "00000000000" ){ 
    var digitoGerado = null; 
}else{ 
  var digitoGerado = (soma1*10) + soma2; 
} 

if(digitoGerado != digitoDigitado){ 
 return false;
} 
return true;
}

```



### Código refatorado

Lista do que fazer:

- aplicar nosso *code style*
- mudar o nome do parâmetro `value` p/ ` cpf` p/ reaproveitar
- retirar os `eval`s
- encapsular as lógicas de:
  - soma1
  - soma2
  - digitoDigitado
  - digitoGerado
  - teste de números iguais
  - mod
  - multiplicação
  - igualdade
  - geração de CPFs iguais


Por exemplo esse `if`:

```js

if(cpf == "11111111111" || cpf == "22222222222" || cpf == 
  "33333333333" || cpf == "44444444444" || cpf == "55555555555" || cpf == 
  "66666666666" || cpf == "77777777777" || cpf == "88888888888" || cpf == 
  "99999999999" || cpf == "00000000000" ){ 
  var digitoGerado = null; 
}

```

Percebam que ele **SEMPRE** testa o `cpf` com uma sequência de dígitos<br>
iguais, que vão do `0` ao `9`, com tamanho 11. Logo a primeira coisa a se<br>
fazer é criar uma função que gere essa sequência:

```js

const generateStringSequence = ( tam ) => ( num ) => `${num}`.repeat( tam )

```

Criei dessa forma para que possamos usa-la assim:


```js

const generateStringSequence = ( tam ) => ( num ) => `${num}`.repeat( tam )
const generateSequenceSize11 = generateStringSequence( 11 )

```

Agora basta eu fazer um *Array* com os valores de `0` ao `9` e<br>
obviamente faremos uma função para isso:



```js

const generateStringSequence = ( tam ) => ( num ) => `${num}`.repeat( tam )
const generateSequenceSize11 = generateStringSequence( 11 )

const generateArray = ( length ) => Array.from( { length }, ( v, k ) => k )
const sameDigits = generateArray( 10 )

```

Com isso podemos encapsular aquele teste assim:

```js

const getLength = ( a ) => a.length

const onlyAllowedCPFs =  ( cpf ) => ( num ) => 
  isEqual( cpf )( generateSequenceSize11( num ) )

const testSameDigits = ( list ) => ( cpf ) =>
  getLength( list.filter( onlyAllowedCPFs( cpf ) ) )

```

Para que possamos usar ela na função `validate` em vez disso:

```js

if(cpf == "11111111111" || cpf == "22222222222" || cpf == 
  "33333333333" || cpf == "44444444444" || cpf == "55555555555" || cpf == 
  "66666666666" || cpf == "77777777777" || cpf == "88888888888" || cpf == 
  "99999999999" || cpf == "00000000000" ){ 
  var digitoGerado = null; 
}

```

Deixando nosso teste assim:

```js

if ( testSameDigits( generateArray( 10 ) )( cpf ) ) return false

```
<br>

**Com isso criamos o primeiro teste que deve retornar `false` sem precisar** <br>
**fazer os cálculos com os dígitos pois se forem iguais não é válido!**

<br>

Agora é hora de encapsular outras lógicas para funções separadas:


```js

var digitoDigitado = eval(cpf.charAt(9)+cpf.charAt(10)); 

```

**Primeiramente que nem precisamos desse `eval` maldito!** Pois devemos retornar<br>
apenas os últimos 2 dígitos do CPF.

```js

const getDigit = ( cpf ) => cpf.charAt( 9 ) + cpf.charAt( 10 )

// const digitoDigitado = getDigit( cpf ) 

```

Agora erceba essa sequência:

```js

soma1+=eval(cpf.charAt(i)*(vlr-1)); 
soma2+=eval(cpf.charAt(i)*vlr);  

```

Podemos facilmente separar essa lógica para isso:

```js

const generateSum = ( i ) => ( vlr ) => i * vlr 

// Usamos assim dentro da iteração que já veremos
const sum = generateSum( n )

sum1 += some( total - 1 )
sum2 += some( total )
total--

```

Outra parte interessante para refatorarmos é encapsular o cálculo<br>
de multiplicação pois podemos reusar e muito ele, dessa forma:

```js

const times = ( i ) => ( vlr ) => i * vlr 
const times10 = ( num ) => times( 10 )( num )
const getGeneratedDigit = ( sum1, sum2 ) => times10( sum1 ) + sum2

// ANTIGO
// soma1 = (((soma1*10)%11)==10 ? 0:((soma1*10)%11)); 

// NOVO
// soma1 = ( ( ( times10( soma1 ) % 11 ) === 10 )
//            ? 0
//            :( times10( soma1 ) % 11 ) );

```

E já para aproveitar podemos encapsular o ` % 11` que também aparece<br>
mais de uma vez, deixando assim:

```js

const mod11 = ( num ) => num % 11 
const times = ( i ) => ( vlr ) => i * vlr 
const times10 = ( num ) => times( 10 )( num )
const getGeneratedDigit = ( sum1, sum2 ) => times10( sum1 ) + sum2

// ANTIGO
// soma1 = (((soma1*10)%11)==10 ? 0:((soma1*10)%11)); 

// NOVO - inverti a lógica
// soma1 = ( mod11( times10( soma1 ) ) !== 10 )
//            ? mod11( times10( soma1 ) );
//            : 0

```


Agora chegamos na parte mais complexa da refatoração: o `for`.

```js

var soma1=0, soma2=0; 
var vlr =11; 
for(i=0;i<9;i++){ 
  soma1+=eval(cpf.charAt(i)*(vlr-1)); 
  soma2+=eval(cpf.charAt(i)*vlr); 
  vlr--; 
}    
soma1 = (((soma1*10)%11)==10 ? 0:((soma1*10)%11)); 
soma2 = (((soma2+(2*soma1))*10)%11); 

```


Então lhe pergunto:

<br>

> **Você utilizaria o `map` ou `reduce`?**

<br>

Nesse caso iremos utilizar o `reduce` e você já verá o porquê:


```js

const times = ( i ) => ( vlr ) => i * vlr 
const generateSum = times

const toSums = ( total ) => ( [ sum1, sum2 ] , n, i ) => {

  const some = generateSum( n )
  
  sum1 += some( total - 1 )
  sum2 += some( total )
  total--

  return [ sum1, sum2 ] 
}

const getSums = ( cpf, vlr = 11 ) => 
  cpf.split( '' )
      .slice( 0, 9 )
      .reduce( toSums( vlr ), [ 0, 0 ] )

```

Percebeu que iniciei o `reduce` com `[ 0, 0 ]` pois esses `0`s são<br>
os valores iniciais de `soma1` e `soma2`, com isso não precisamos inicializar<br>
essas variáveis com `let/var` para depois irmos modificando esses valores.

Tendo em vista que o `for` foi feito apenas para iterar do nove posições, devemos<br>
quebrar o CPF que é uma *String* com `split( '' )` e logo após selecionamos apenas<br>
as 9 primeiras posições com `slice( 0, 9 )` para depois chamarmos o `reduce`.

Como o valor de `vlr` não existe dentro do `reduce` precisei passar como *closure*.

Analise a assinatura dos parâmetros do callback do `reduce`:

```js

( [ sum1, sum2 ] , n, i )

```

Provavelmente o primeiro parâmetro `[ sum1, sum2 ]` chamou-lhe a atenção<br>
por se um *Array*, podemos usar dessa forma pois estamos utilizando <br>
[destructuring assignment](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/Atribuicao_via_desestruturacao) para receber o *Array* de resultado do `reduce` já<br>
atribuindo nomes que utilizaremos dentro da nossa função. Isso só funciona<br>
porque o *Array* que recebemos possui apenas dois elementos.

Logo na primeira linha desse *callback* temos a geração da função específica<br>
da criação da soma baseada na `generateSum` que irá basicamente multiplicar<br>
dois valores passados um por vez:

```js

// const generateSum = times

const sum = generateSum( n )

```

Nessa primeira execução criamos a função:

```js

// const times = ( a ) => ( b ) => b * a 

const sum = ( b ) => b * n // o n veio da primeira execução

sum1 += sum( total - 1 )
sum2 += sum( total )
total--

return [ sum1, sum2 ] 

```

Para que possamos reusar a mesma para calcular `sum1` e `sum2` reusando<br>
o mesmo cálculo pois as duas usam o mesmo valor, porém só muda o segundo valor.

Com isso conseguimos sempre pegar o valor anterior de `sum1` e `sum2` no<br>
primeiro parâmetro, modificar seu valor e retornar `[ sum1, sum2 ]`.

Entretanto perceba o seguinte: passamos o valor de `total - 1` e `total`<br>
e logo após decrementamos o `total`, correto???

Levando isso em consideração podemos mudar a ordem dessa execução para isso:


```js

sum2 += sum( total-- )
sum1 += sum( total )

return [ sum1, sum2 ] 

```

**Pois dessa forma decrementamos o `total` depois de usá-lo para o `sum2`!** 

Mas podemos refatorar mais ainda deixando essa função com apenas uma linha:

```js

const toSums = ( total ) => ( [ sum1, sum2 ] , n, i ) =>
  [ sum2 + generateSum( n )( total-- ), 
    sum1 + generateSum( n )( total ) 
  ].reverse() 

```

Então perceba que usamos a técnica de [decrementar](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#Decrement_(--)) o `total` no `sum2` para que<br>
no `sum1` ele esteja com o valor correto E precisei colocar eles em ordem inversa<br>
para que o valor do `total` esteja correto sem precisarmos de outra linha para isso.

Depois claramente precisei retornar utilizando [`reverse`]() para que a ordem<br>
dos valores das somas fossem corretas.

Como também podemos escrever assim:

```js

const toSums = ( total ) => ( [ sum1, sum2 ] , n, i ) =>
  [ sum2 + generateSum( n )( total ), 
    sum1 + generateSum( n )( --total ) 
  ].reverse() 

const getSums = ( cpf, vlr = 11 ) => 
  cpf.split( '' )
      .slice( 0, 9 )
      .reduce( toSums( vlr ), [ 0, 0 ] )

```

Depois de ter conversado com meu aluno [matheustp](https://gist.github.com/matheustp/d0f4a30e97195202d797eb14c4a762ff) ele mostrou o uso<br>
do `reverse` apenas após o resultado do `reduce` e essa forma é **MUITO MELHOR** <br>
pois assim ele será executado apenas uma vez e não em todas iterações!

<br>

> Obrigado Matheus!!!

<br>

Deixando nossa função assim:

```js

const toSums = ( total ) => ( [ sum1, sum2 ] , n, i ) =>
  [ sum2 + generateSum( n )( total ), 
    sum1 + generateSum( n )( --total ) 
  ]

const getSums = ( cpf, vlr = 11 ) => 
  cpf.split( '' )
      .slice( 0, 9 )
      .reduce( toSums( vlr ), [ 0, 0 ] )
      .reverse()

```

<br>

> **Você sabe a diferença entre essas duas formas de decrementar???**

<br>

Quando utilizamos o `total--` o valor usado de total será sem decrementar e<br>
no próximo uso ele terá o valor subtraído de `1`. Já usando o `--total` primeiro<br>
decrementa-se o valor para depois usá-lo.

Vamos então organizar os testes lógicos que temos dentro do código antigo:

```js

if(cpf == "11111111111" || cpf == "22222222222" || cpf == 
  "33333333333" || cpf == "44444444444" || cpf == "55555555555" || cpf == 
  "66666666666" || cpf == "77777777777" || cpf == "88888888888" || cpf == 
  "99999999999" || cpf == "00000000000" ){ 
  var digitoGerado = null; 
}else{ 
  var digitoGerado = (soma1*10) + soma2; 
} 

if(digitoGerado != digitoDigitado){ 
 return false;
} 
return true;

```

Podemos reescrevê-lo agrupando seus `if`s e utilizando nossas funções<br>
que criamos anteriormente:

```js

if (cpf == "11111111111" || cpf == "22222222222" || cpf == 
  "33333333333" || cpf == "44444444444" || cpf == "55555555555" || cpf == 
  "66666666666" || cpf == "77777777777" || cpf == "88888888888" || cpf == 
  "99999999999" || cpf == "00000000000" ){ 
  return false
} 
if ( ( times10( soma1 ) + soma2 ) !== getDigit( cpf ) ){ 
  return false
} 
return true

```

Para depois deixarmos assim:

```js

const times = ( a ) => ( b ) => b * a 
const times10 = ( num ) => times( 10 )( num )
const mod11 = ( num ) => num % 11 
const getGeneratedDigit = ( sum1, sum2 ) => times10( sum1 ) + sum2
const getDigit = ( cpf ) => cpf.charAt( 9 ) + cpf.charAt( 10 )
const generateStringSequence = ( tam ) => ( num ) => `${num}`.repeat( tam )
const generateSequenceSize11 = generateStringSequence( 11 )

const inSameDigits = ( cpf ) => ( num ) => 
  isEqual( cpf )( generateSequenceSize11( num ) )

const isIn = ( list ) => ( value ) => 
  list.findIndex( inSameDigits( value ) ) >= 0

const testSameDigits = ( list ) => ( cpf ) =>
  ( isIn( list )( cpf ) )

const getResultOfSum1 = ( sum1 ) =>
  ( isNotEqual( mod11( times10( sum1 ) ), 10 ) )
    ? ( mod11( times10( sum1 ) ) )
    : 0 

const getResultOfSum2 = ( sum1, sum2 ) =>
  ( mod11( times10( sum2 + ( times( 2 )( sum1 ) ) ) ) )

const toSums = ( total ) => ( [ sum1, sum2 ] , n, i ) =>
  [ sum2 + generateSum( n )( total ), 
    sum1 + generateSum( n )( --total ) 
  ]

const getSums = ( cpf, vlr = 11 ) => 
  cpf.split( '' )
      .slice( 0, 9 )
      .reduce( toSums( vlr ), [ 0, 0 ] )
      .reverse()

const validate = ( cpf ) => {
  const CPF_LENGTH = 11
  let [ sum1, sum2 ] = getSums( cpf, CPF_LENGTH )
  
  sum1 = getResultOfSum1( sum1 )
  sum2 = getResultOfSum2( sum1, sum2 )
  
  return (  !( testSameDigits( generateArray( 10 ) )( cpf ) ) &&
            !( getGeneratedDigit( sum1, sum2 ) != getDigit( cpf ) ) )
}

```

Viu que chamei as funções `getResultOfSum1` e `getResultOfSum2` que são o<br>
encapsulamento do seguinte código que ficava fora do `for`:

```js

  soma1 = (((soma1*10)%11)==10 ? 0:((soma1*10)%11)); 
  soma2 = (((soma2+(2*soma1))*10)%11); 

```

Porém depois que percebi que a comparação final utiliza `!=` e não `!==` <br>
como deveria ser, então para isso precisamos forçar o retorno, das funções<br>
que geram esses valores, para *String* dessa forma:

```js

const getDigit = ( cpf ) => `${cpf.charAt( 9 )}${cpf.charAt( 10 )}` 
const getGeneratedDigit = ( sum1, sum2 ) => times10( sum1 ) + sum2 + ''

```


#### Explicando ainda

Código final:

```js

const NOT = ( a ) => !a
const times = ( a ) => ( b ) => b * a 
const mod11 = ( num ) => num % 11 
const times2 = ( num ) => times( 2 )( num )
const times10 = ( num ) => times( 10 )( num )
const isEqual = ( a ) => ( b ) => b === a
const isNotEqual = ( a ) => ( b ) => !( isEqual( a )( b ) )
const getDigit = ( cpf ) => `${cpf.charAt( 9 )}${cpf.charAt( 10 )}` 
const getGeneratedDigit = ( sum1, sum2 ) => 
  ( sum1 == 0 )
    ? '0' + sum2
    : ( sum1 * 10 ) + sum2 + ''

const generateStringSequence = ( tam ) => ( num ) => `${num}`.repeat( tam )
const generateArray = ( length ) => Array.from( { length }, ( v, k ) => k )

const generateSum = times
const generateSequenceSize11 = generateStringSequence( 11 )

const inSameDigits = ( cpf ) => ( num ) => 
  isEqual( cpf )( generateSequenceSize11( num ) )

const isIn = ( list ) => ( value ) => 
  list.findIndex( inSameDigits( value ) ) >= 0

const testIfHasSameDigits = ( list ) => ( cpf ) =>
  ( isIn( list )( cpf ) )

const getResultOfSum1 = ( sum1 ) => //11 - mod11(  sum1 )
  ( mod11( sum1 ) < 2 )
    ? 0 
    : 11 - mod11(  sum1 )

const getResultOfSum2 = ( sum1, sum2 ) => // 11 - mod11( sum2 + times2( sum1 ) )
  ( mod11( sum2 + times2( sum1 ) ) < 2 )
    ? 0 
    : 11 - mod11( sum2 + times2( sum1 ) )

const toSums = ( total ) => ( [ sum2, sum1 ] , n ) =>
  [ sum2 + generateSum( n )( total ), 
    sum1 + generateSum( n )( --total ) 
  ] 

const getSums = ( cpf, total = 11 ) => 
  cpf.split( '' )
      .slice( 0, 9 )
      .reduce( toSums( total ), [ 0, 0 ] )
      .reverse()

const validate = ( cpf ) => {
  const CPF_LENGTH = 11
  let [ sum1, sum2 ] = getSums( cpf, CPF_LENGTH )
  
  sum1 = getResultOfSum1( sum1 )
  sum2 = getResultOfSum2( sum1, sum2 )
  
  return (  
    NOT( testIfHasSameDigits( generateArray( 10 ) )( cpf ) ) &&
    NOT( getGeneratedDigit( sum1, sum2 ) !== getDigit( cpf ) ) 
  )
}

const CPFS = [ 
  '04998264931', '03506838326',
  '04864713901',
  '03506838321', '22222222222', '00000000000' 
  ]

CPFS.forEach( ( cpf ) => console.log( `${cpf}: ${validate( cpf )}` ) )

module.exports = validate

```