# λAula03.(Utilizando o map com dados imutáveis)

![](http://bob.ippoli.to/python-haskell-ep2014/img/mutability.jpg)

Todos os programadores que já fizeram faculdade e/ou não trabalham<br>
com Programação Funcional está mais que acostumado a utilizar suas<br>
variáveis para guardar mudar estados.

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

Traduzindo para JavaScript fica assim:

<br>

```js

const valoresUnicode = []

for ( let i in str ) {
  valoresUnicode.push( str.charCodeAt( i ) )
}

```



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
                            .map( ( letter ) => letter.charCodeAt( 0 ) )

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

```js

const arr = [1,2,3]
const x = arr.map( v => v * 2 );

console.log(arr) //[1,2,3]
console.log(x) //[2,4,6]

```

```js

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