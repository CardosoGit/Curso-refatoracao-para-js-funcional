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

const gerenateArray = ( length ) => Array.from( { length }, ( v, k ) => k )
const sameDigits = gerenateArray( 10 )

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

const sameDigits = gerenateArray( 10 )

if ( testSameDigits( sameDigits )( cpf ) ) return false

```

Agora é hora de encapsular outras lógicas para funções separadas:


```js

var digitoDigitado = eval(cpf.charAt(9)+cpf.charAt(10)); 

```

```js

const getDigit = ( cpf ) => cpf.charAt( 9 ) + cpf.charAt( 10 )
const generateSum = ( i ) => ( vlr ) => i * vlr 

```

Perceba essa sequência:

```js

soma1+=eval(cpf.charAt(i)*(vlr-1)); 
soma2+=eval(cpf.charAt(i)*vlr);  

```

Podemos facilmente separar essa lógica para isso:

```js

const generateSum = ( i ) => ( vlr ) => i * vlr 

// Usamos assim dentro da iteração que já veremos
const some = generateSum( cpf.charAt( i ) )

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
const toSums = ( cpf, total ) => ( [ sum1, sum2 ] , n, i ) => {
  const some = generateSum( n.charAt( 0 ) )
  
  sum1 += some( total - 1 )
  sum2 += some( total )
  total--

  return [ sum1, sum2 ] 
}

const getSums = ( cpf, vlr = 11 ) => 
  cpf.split( '' )
      .slice( 0, 9 )
      .reduce( toSums( cpf, vlr ), [ 0, 0 ] )

```

Percebeu que iniciei o `reduce` com `[ 0, 0 ]` pois esses `0`s são<br>
os valores iniciais de `soma1` e `soma2`, com isso não precisamos inicializar<br>
essas variáveis com `let/var` para depois irmos modificando esses valores.

Tendo em vista que o `for` foi feito apenas para iterar do nove posições, devemos<br>
quebrar o CPF que é uma *String* com `split( '' )` e logo após selecionamos apenas<br>
as 9 primeiras posições com `slice( 0, 9 )` para depois chamarmos o `reduce`.

Como os valores de `cpf`, como **

#### Explicando ainda

Código final:

```js

const times = ( i ) => ( vlr ) => i * vlr 
const mod11 = ( num ) => num % 11 
const times10 = ( num ) => times( 10 )( num )
const isEqual = ( a ) => ( b ) => b === a
const isNotEqual = ( a ) => ( b ) => !( isEqual( a )( b ) )
const getDigit = ( cpf ) => cpf.charAt( 9 ) + cpf.charAt( 10 )
const getGeneratedDigit = ( sum1, sum2 ) => times10( sum1 ) + sum2
const generateStringSequence = ( tam ) => ( num ) => `${num}`.repeat( tam )
const gerenateArray = ( length ) => Array.from( { length }, ( v, k ) => k )

const generateSum = times

const inSameDigits =  ( cpf ) => ( num ) => 
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

const toSums = ( total ) => ( [ sum1, sum2 ] , n, i ) => {

  const some = generateSum( n.charAt( 0 ) )
  
  sum1 += some( total - 1 )
  sum2 += some( total )
  total--

  return [ sum1, sum2 ] 
}

const getSums = ( cpf, vlr = 11 ) => 
  cpf.split( '' )
      .slice( 0, 9 )
      .reduce( toSums( vlr ), [ 0, 0 ] )

const validate = ( cpf ) => {
  const sameDigits = gerenateArray( 10 )
  let [ sum1, sum2 ] = getSums( cpf, 11 )
  
  sum1 = getResultOfSum1( sum1 )
  sum2 = getResultOfSum2( sum1, sum2 )

  return (  !( testSameDigits( sameDigits )( cpf ) ) &&
            !( getGeneratedDigit( sum1, sum2 ) != getDigit( cpf ) ) )
}

const generateSequenceSize11 = generateStringSequence( 11 )

const CPFS = [ 
  '04998264931', '03506838326', 
  '03506838321', '22222222222', '00000000000' 
  ]

CPFS.forEach( ( cpf ) => console.log( `${cpf}: ${validate( cpf )}` ) )

module.exports = validate

```