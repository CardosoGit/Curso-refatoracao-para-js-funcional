# λAula03.(Utilizando o map com dados imutáveis)

![](http://bob.ippoli.to/python-haskell-ep2014/img/mutability.jpg)

Todos os programadores que já fizeram faculdade e/ou não trabalham<br>
com Programação Funcional está mais que acostumado a utilizar suas<br>
variáveis para guardar e mudar estados.

Por exemplo:

<br>

> Preciso retornar um *Array* com os valores elevados ao quadrado.

<br>

```js

let numbers = [ 1, 2, 3, 4, 5 ]
let square = []

for( let i = 0; i < numbers.length; i++ ) {
  square[ i ] = numbers[ i ] * numbers[ i ]
}

console.log('square: ', square)
// square:  [ 1, 4, 9, 16, 25 ]

```

<br>

> **Ué mas deu certo Suissa!**

Sim deu certo mas fazendo do jeito errado, o jeito mais correto é<br>
utilizando o `map` em vez do `forEach`.

![](https://media1.giphy.com/media/Hb6w89F9ZlB6M/giphy.gif)

<br>

> **Por que tio Suissa?**

<br>

Basicamente por causa do retorno diferente de cada uma delas.

O `forEach` retorna `undefined` e por isso não é possível encadea-lo,<br> 
já o `map` retorna um *Array* novo com os valores transformados.

<br>

> **O que é encadear?**

<br>

Posso dizer que simplesmente é a possibilidade de você chamar uma função<br>
diretamente após a execução de outra.

<br>

![](https://media1.giphy.com/media/WGpqvAMu9Ks4U/giphy.gif)

<br>

Imagine comigo que precisamos além dos valores ao quadrado que a saída<br>
esteja na ordem invertida, olha como ficaria o código anterior:

<br>

```js

const numbers = [ 1, 2, 3, 4, 5 ]
let square = []

for( let i = 0; i < numbers.length; i++ ) {
  square[ i ] = numbers[ i ] * numbers[ i ]
  //square.push( numbers[ i ] * numbers[ i ] )
}

console.log('square: ', square)
// square:  [ 1, 4, 9, 16, 25 ]

const resultado = square.reverse()
console.log('resultado: ', resultado)
// resultado:  [ 25, 16, 9, 4, 1 ]

```

<br>

Agora olhe como que fazemos com o `map`:

<br>

```js
const numbers = [ 1, 2, 3, 4, 5 ]

const resultado = numbers.map( ( n ) => n * n ).reverse()

console.log('resultado: ', resultado)
// resultado:  [ 25, 16, 9, 4, 1 ]

```

<br>

> Muito mais simples né?

Além do que não precisamos de nenhum teste lógico para sair da iteração!

## Immutable Data

> **Você já imaginou como se programa sem mudar o valor de nenhuma variável?**

Pois é! Quando eu conheci esse conceito foi a primeira coisa que me perguntei:

> Mas como que programa sem mudar os valores?


### AINDA VOU ESCREVER!!!

Agora vamos usar o exemplo da aula passada pois deixei uma parte do<br>
código para explicar e refatorar nessa aula:


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

A parte que devemos nos focar é:

<br>

```js

const valoresUnicode = []

for ( let i in str ) {
  valoresUnicode.push( str.charCodeAt( i ) )
}

```

<br>

Antes você precisa saber o que a função `charCodeAt` faz.

<br>

> "O método charCodeAt() retorna um integer entre 0 e 65535 representando<br> 
> a unidade de código UTF-16 em seu dado índice".

*fonte: [charCodeAt - MDN](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt)*

<br>

Esse código itera letra por letra da `str` e em cada iteração ele<br>
adiciona o valor UTF-16 dessa letra no *Array* `valoresUnicode`.  

Percebeu que criamos o *Array* `valoresUnicode` como vazio e<br>
somente dentro do `for` estamos adicionando valores para ele?

Nesse caso estamos mudando seu estado em outra parte do código<br>
que não é na sua definição, então como podemos corrigir isso?

Esse pedaço de código é um PADRÃO que vejo direto:

- cria um *Array* vazio
- itera com o `for` utilizando o `length` de um *Array/String*
- adiciona o valor iterado no *Array* vazio
- retorna ou usa esse *Array*

Devemos fazer da seguinte forma:

- cria um *Array* que recebe
- o resultado do `map`
- retorna ou usa esse resultado

<br>


## λRefatoração - 0

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
  const valoresUnicode = str.split( '' )
                            .map( ( c ) => c.charCodeAt( 0 ) )

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

Como o `map` iterou em cada caracter, pois chamamos ele após o `split`,<br>
o valor de `c` é o caracter iterado por isso executamos `c.charCodeAt( 0 )`<br>
já que só existe o índice `0` em um caracter.

Se quisermos ainda podemos fazer assim:

<br>

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

  const str13 = str.split( '' )
                    .map( ( c ) => c.charCodeAt( 0 ) )
                    .map( ( x ) => ( isSpace( x ) || !isInRange( 65, 90 )( x ) )
                                      ? getCharCode( x )
                                      : getCypherCharCode( x ) )
                    .join( '' )
  
  return str13
}

console.log( rot13( 'LBH QVQ VG!' ) )

```

<br>

> Percebeu que encadeamos as funções `split`, `map` e `join`?

Isso acontece pois o `split` e o `map` retornam um *Array* como resultado<br>
e o `join` recebe um *Array* e converte em uma *String*.

Para finalizar vamos deixar assim:

<br>

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

const toCharCode = ( c ) => c.charCodeAt( 0 )

const toCypher = ( x ) => 
  ( isSpace( x ) || !isInRange( 65, 90 )( x ) )
    ? getCharCode( x )
    : getCypherCharCode( x )

const rot13 = ( str ) => 
  str.toUpperCase()
      .split( '' )
      .map( toCharCode )
      .map( toCypher )
      .join( '' )

console.log( rot13( 'LBH QVQ VG!' ) )
console.log( rot13( 'LBH QVQ VG!'.toLowerCase() ) )

```

<br>

Pronto conseguimos colocar todas as funções em uma linha e adicionei o<br>
`toUpperCase` para forçar que a *String* esteja toda em maiúscula pois<br>
esse código funciona apenas com maiúsculas!

<br>

## λRefatoração - 1

Agora vamos pegar um pedaço de um código enviado por um aluno, retirei apenas<br>
uma função, pois tinham MUITAS, e modifiquei um pouco para apenas listar os<br>
nomes dos arquivos em vez de deleta-los, esse é o código:

<br>

```js

// issues/71#issuecomment-302889780
var getFilesNames = function (dir) {
    var path = require("path");
    var fs = require('fs');
    var list = fs.readdirSync(dir);
    var listOfFiles = [];
    for (var i = 0; i < list.length; i++) {
        var filename = path.join(dir, list[i]);
        var stat = fs.statSync(filename);
        if (!stat.isDirectory() && !(filename == "." || filename == "..") ) {
          listOfFiles.push(filename);
        } 
    }
    return listOfFiles;
}

console.log('getFilesNames', getFilesNames('.'))

```

<br>

Como sabemos que a função retorna `listOfFiles` podemos retornar diretamente esse resultado<br>
que agora será gerado pelo `map`, para funcionar precisamos mudar o `list[i]` porque ele será<br>
o elemento que está sendo iterado pelo `map`.

Vamos ao que interessa:

<br>

```js

const path = require( 'path' )
const fs = require( 'fs' )

const getFilesNames = ( dir ) => {
  const list = fs.readdirSync( dir )

  return list.map( ( file, i ) => {
    const filename = path.join( dir, file )
    const stat = fs.statSync( filename )
    if ( !stat.isDirectory() && !( filename == '.' || filename == '..' ) ) {
      return filename
    }       
  } )
}

console.log( 'getFilesNames', getFilesNames( '.' ) )

```

<br>

Como `list` é o resultado da função `fs.readdirSync(dir)` podemos substituir ele<br>
pela própria execução dessa função, assim:

<br>

```js
const path = require( 'path' )
const fs = require( 'fs' )

const getFilesNames = ( dir ) => 
  fs.readdirSync( dir )
    .map( ( file, i ) => {
      const filename = path.join( dir, file )
      const stat = fs.statSync( filename )
      if ( !stat.isDirectory() && !( filename == '.' || filename == '..' ) ) {
        return filename
      }       
    } )


console.log( 'getFilesNames', getFilesNames( '.' ) )

```


<br>


Dessa forma conseguimos deixar nossa função principal em uma linha, mas ainda<br>
temos mais coisas para fazer!

Obviamente você sabe que quando temos uma função maior que uma linha como *callback* <br>
devemos separar ela para uma função externa e apenas passar ela no parâmetro.



<br>


```js

const path = require( 'path' )
const fs = require( 'fs' )

const toFileName = ( dir ) => ( file, i ) => {
  const filename = path.join( dir, file )
  const stat = fs.statSync( filename )
  if ( !stat.isDirectory() && 
      !( filename == '.' || filename == '..' ) ) return filename  
} 

const getFilesNames = ( dir ) => 
  fs.readdirSync( dir )
    .map( toFileName( dir ) )


console.log( 'getFilesNames', getFilesNames( '.' ) )

```


<br>


Eu precisei criar a função `toFileName` como uma *closure* porque o valor de<br>
`dir` não existe dentro do `map`, por isso devemos injeta-lo.


<br>



```js

const path = require( 'path' )
const fs = require( 'fs' )

const toFileName = ( dir ) => ( file, i ) => {
  const filename = path.join( dir, file )
  if ( !fs.statSync( filename ).isDirectory() && 
      !( filename == '.' || filename == '..' ) ) return filename  
} 

const getFilesNames = ( dir ) => 
  fs.readdirSync( dir )
    .map( toFileName( dir ) )

console.log( 'getFilesNames', getFilesNames( '.' ) )

```


<br>


Como só usamos o valor de `stat` apenas uma vez podemos também subistituir ela<br>
pela execução da função `fs.statSync`, não fizemos isso com o `filename` porque<br>
ele é utilizado mais de uma vez.

Agora podemos separar mais um pouco as funções dessa forma:


<br>


```js

const path = require( 'path' )
const fs = require( 'fs' )

const getFileName = ( dir, file ) => path.join( dir, file )
const isDirectory = ( filename ) => fs.statSync( filename ).isDirectory()
const isDotOrTwoDots = ( filename ) => ( filename == '.' || filename == '..' )

const toFileName = ( dir ) => ( file, i ) => {
  const filename = getFileName( dir, file )
  if ( !isDirectory( filename ) && 
      !isDotOrTwoDots( filename ) ) return filename  
} 

const getFilesNames = ( dir ) => 
  fs.readdirSync( dir )
    .map( toFileName( dir ) )

console.log( 'getFilesNames', getFilesNames( '.' ) )

```


<br>


Ainda podemos melhorar encapsulando o teste do `if` em apenas uma função e<br>
retornar diretamente o valor do elemento que está sendo iterado, pois o mesmo<br>
é exatamente o nome do arquivo que queremos.


<br>


```js

const path = require( 'path' )
const fs = require( 'fs' )

const getFileName = ( dir, file ) => path.join( dir, file )
const isDirectory = ( name ) => fs.statSync( name ).isDirectory()
const isDotOrTwoDots = ( name ) => ( name == '.' || name == '..' )
const isFile = ( name ) => 
  ( !isDirectory( name ) && !isDotOrTwoDots( name ) )

const toFileName = ( dir ) => ( name ) => {
  if ( isFile( getFileName( dir, name ) ) ) return name 
} 

const getFilesNames = ( dir ) => 
  fs.readdirSync( dir )
    .map( toFileName( dir ) )

console.log( 'getFilesNames', getFilesNames( '.' ) )


```


<br>


Mas se mesmo assim você ainda quiser retirar aquele `if` para deixar a função<br>
em uma linha você pode substituir por um *if* ternário, porém como ele te obriga<br>
a retornar o `else` teremos que usar de malandragem retornando `false` para depois<br>
filtra-lo na função `getFilesNames` dessa forma:


<br>


```js

const path = require( 'path' )
const fs = require( 'fs' )

const getFileName = ( dir, file ) => path.join( dir, file )
const isDirectory = ( name ) => fs.statSync( name ).isDirectory()
const isDotOrTwoDots = ( name ) => ( name == '.' || name == '..' )
const isFile = ( name ) => 
  ( !isDirectory( name ) && !isDotOrTwoDots( name ) )//|| name
    ? name
    : false

const toFileName = ( dir ) => ( name ) => 
  ( isFile( getFileName( dir, name ) ) )

const getFilesNames = ( dir ) => 
  fs.readdirSync( dir )
    .map( toFileName( dir ) )
    .filter( e => !!e )

console.log( 'getFilesNames .', getFilesNames( '.' ) )
console.log( 'getFilesNames ..', getFilesNames( '..' ) )
console.log( 'getFilesNames ../..', getFilesNames( '../..' ) )

```


<br>


Esse último código foi mais para demonstração pois nesse caso você precisa fazer<br>
uma filtragem a mais que o código antigo e essa aula ainda não é de *filter*.


<br>
<hr>
<br>

## Aviso

Caso você queira se aprofundar mais sobre o `map` criei (um mini ebook sobre ele)[https://github.com/suissa/Ebooks/blob/master/JS%20Funcional/Map/README.md]

## Exercícios

1) Refatore o seguinte código usando `map`:


<br>


```js

const workers = [ 1000, 2500 , 10000 ]

const withdraw = ( list, percent ) => {

  let counter = 0
  let newList = []

  while ( counter < list.length) {
    const percentValue = list[ counter ] * ( percent / 100 )
    const newSalary = list[ counter ] - percentValue

    newList[ counter ] = newSalary 
    counter++
  }

  return newList
}

console.log( 'New Salaries: ', withdraw( workers, 10 ) )

```

<br>
<br>

2) Refatore o seguinte código usando `map`, `split` e `join` para que<br>
o resultado seja uma *String* formatada corretamente:


<br>


```js

// https://github.com/suissa/Curso-refatoracao-para-js-funcional/issues/35
const formataLinha = ( str ) => {
  //var str = "Valor pago: # 1.30\n";
  var tam = str.length;
  var tamanho = parseInt(tam);
  var t = 0;
  var b = '';
  if (tamanho < 32) {
    t = 32 - tamanho;
    str = str.split('#');
    for (i = 0; i <= t; i++)
        b += " ";
    // console.log(str[0] + b + str[1] + "\n");
    return(str[0] + b + str[1]);
  } else if ((tamanho > 32) && (tamanho <= 64)) {
    t = 64 - tamanho;
    str = str.split('#');
    for (i = 0; i <= t; i++)
        b += " ";
    console.log(str[0] + b + str[1]);
    return(str[0] + b + str[1]);
  } else if ((tamanho > 64) && (tamanho <= 96)) {
    t = 64 - tamanho;
    str = str.split('#');
    for (i = 0; i <= t; i++)
        b += " ";
    console.log(str[0] + b + str[1]);
    return(str[0] + b + str[1]);
  } else if ((tamanho > 96) && (tamanho <= 128)) {
    t = 64 - tamanho;
    str = str.split('#');
    for (i = 0; i <= t; i++)
        b += " ";
    console.log(str[0] + b + str[1]);
    return(str[0] + b + str[1]);
  } else if ((tamanho > 128) && (tamanho <= 160)) {
    t = 64 - tamanho;
    str = str.split('#');
    for (i = 0; i <= t; i++)
        b += " ";
    // console.log(str[0] + b + str[1]);
    return(str[0] + b + str[1]);
  } else if ((tamanho > 160) && (tamanho <= 192)) {
    t = 64 - tamanho;
    str = str.split('#');
    for (i = 0; i <= t; i++)
        b += " ";
    // console.log(str[0] + b + str[1]);
    return(str[0] + b + str[1]);
  }
}

const str = "Valor pago: # 1.30\n"

console.log(str); // Valor pago: # 1.30
console.log(formataLinha(str)); // Valor pago:                1.30

const strMulti = "Valor pago: # 1.30\nValor pago: # 3.33\nValor pago: # 6.66"

// Crie aqui uma função que utilize a formataLinha
// porém quebrando a String para passar uma por vez
// analise qual caracter você irá quebrar e explique o porquê

```