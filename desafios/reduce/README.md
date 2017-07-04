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
iguais, que vão do `0` ao `9`, com tamanho 11


```js

const getLength = ( a ) => a.length
const mod11 = ( num ) => num % 11 
const times10 = ( num ) => num * 10
const isEqual = ( a ) => ( b ) => b === a
const isNotEqual = ( a ) => ( b ) => !( isEqual( a )( b ) )
const generateSum = ( i ) => ( vlr ) => i * vlr 
const getDigit = ( cpf ) => cpf.charAt( 9 ) + cpf.charAt( 10 )
const getGeneratedDigit = ( sum1, sum2 ) => ( sum1 * 10 ) + sum2
const generateStringSequence = ( tam ) => ( num ) => `${num}`.repeat( tam )


const onlyAllowedCPFs =  ( cpf ) => ( num ) => 
  isEqual( cpf )( generateSequenceSize11( num ) )

const testSameDigits = ( list ) => ( cpf ) =>
  getLength( list.filter( onlyAllowedCPFs( cpf ) ) )

const getResultOfSum1 = ( sum1 ) =>
  ( isNotEqual( mod11( times10( sum1 ) ), 10 ) )
    ? ( mod11( times10( sum1 ) ) )
    : 0 

const getResultOfSum2 = ( sum1, sum2 ) =>
  ( mod11( times10( sum2 + ( 2 * sum1 ) ) ) )

const toSums = ( cpf, total ) => ( [ sum1, sum2 ] , n, i ) => {
  const some = generateSum( cpf.charAt( i ) )
  
  sum1 += some( total - 1 )
  sum2 += some( total )
  total--

  return [ sum1, sum2 ] 
}

const getSums = ( cpf, vlr ) => 
  cpf.split( '' )
      .slice( 0, 9 )
      .reduce( toSums( cpf, vlr ), [ 0, 0 ] )

const validate = ( cpf ) => {
  const sameDigits = Array.from( { length: 10 }, ( v, k ) => k )
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