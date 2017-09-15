# λAula04.(Immutable Fucking Data)

![Immutable Awesomeness](http://i.imgur.com/l4JkguX.jpg)

<br>
<br>


Quando cheguei nesse tópico, durante o início dos meus estudos, ele fez-me <br> 
 questionar o seguinte:

> **Se eu não posso mudar nenhum valor das variáveis como é que eu vou programar?**

<br>

![](http://www.reactiongifs.com/r/hmmrhed.gif)

<br>
<br>

> Você também se questionou isso??

<br>

**Que bom!** Espero que eu possa lhe explicar esse conceito **CABULOSO**.



## λImmutable Data 

Você trabalha com alguns tipos de dados que por si só já são imutáveis, por<br>
exemplo:

- String
- Number
- Boolean

<br> 
<br> 

### λPure Functions

![desenho de uma freira](http://i.imgur.com/xHpYORO.gif)

> "A pure function is a function that, given the same input, will 
> always return the same output and does not have any observable side effect."

*fonte: [Chapter 3: Pure Happiness with Pure Functions](https://github.com/MostlyAdequate/mostly-adequate-guide/blob/master/ch3.md)*

> **Sabe onde TODAS as funções são PURAS?**
>
> - Na Mate(sua LINDA)mática!

Bom já conhecemos esse conceito das aulas anteriores, porém agora veremos sua <br>
enorme importância para a Programação Funcional. 


<br> 
<br> 

### λSide Effects

> "A side effect is a change of system state or observable interaction 
> with the outside world that occurs during the calculation of a result."

*fonte: [Chapter 3: Pure Happiness with Pure Functions](https://github.com/MostlyAdequate/mostly-adequate-guide/blob/master/ch3.md)*

Os efeitos colaterais(*side effects*) podem incluir, mas não estão limitados a:

- alteração em arquivos;
- inserção um registro em um banco de dados;
- requições HTTP;
- mudanças de valor/estado;
- impressão na tela / logging;
- entrada de dados do usuário;
- consultas no DOM;


```js

// impure
const minimum = 21
const checkAge = ( age ) => age >= minimum

```

Na parte impura, `checkAge` depende da constante `minimum` para determinar o <br> 
resultado, porém esse valor se encontra "fora do escopo interno" da função `checkAge`. 



**Para resolver esse problema é bem simples!**

Basta passarmos esse valor via parâmetro e de preferência definindo um <br> 
valor padrão.


![What does a pure function look like?](http://i.imgur.com/frhBrUH.jpg)


```js

// pure
const checkAge = ( age, minimum = 18 ) => age >= minimum

```

Obviamente esse exemplo é muito simples, então vamos utilizar um exemplo<br>
do mundo real. 

## Exemplo real

Imagine que possuímos um Array de Objetos que possuem os seguintes dados:

- nome do empregado;
- valor da sua hora trabalhada;
- quantidade de horas trabalhada sno mês.

```js
const empregados = [
  { nome: 'A', valor: 30, horas: 140 },
  { nome: 'B', valor: 45, horas: 100 },
  { nome: 'C', valor: 23, horas: 180 },
]
```



```js
const empregados = [
  { nome: 'A', valor: 30, horas: 140 },
  { nome: 'B', valor: 45, horas: 100 },
  { nome: 'C', valor: 23, horas: 180 },
]

const salariosDosEmpregados = []

for ( let i = 0; i < empregados.length; i++ ) {
  const total = empregados[ i ].valor * empregados[ i ].horas

  salariosDosEmpregados.push( {
    nome: empregados[ i ].nome,
    total
  } )
}

console.log( "salariosDosEmpregados: \n", salariosDosEmpregados )

/**
 
salariosDosEmpregados: 
 [ { nome: 'A', total: 4200 },
  { nome: 'B', total: 4500 },
  { nome: 'C', total: 4140 } ]

*/
```

Como você deve ter notado nós criamos um *Array* vazio `salariosDosEmpregados` <br>
para que fossemos adicionando um Objeto novo com as informações que queremos.

Com isso nós estamos **MUDANDO** o estado inicial do *Array*, para que possamos<br>
refatorar esse código utilizando o conceito de dados imutáveis é bem simples.

Você pode seguir a seguinte dica:

> Se você encontrar um `push` dentro de um *loop* onde o mesmo adiciona valores<br>
> em um Array vazio, você pode criar esse mesmo Array com o resultado final do<br>
> seu processamento.

<br>

![](https://media.giphy.com/media/91fEJqgdsnu4E/giphy.gif)

<br>

> Mais fácil eu demonstrar isso com código!

```js
const empregados = [
  { nome: 'A', valor: 30, horas: 140 },
  { nome: 'B', valor: 45, horas: 100 },
  { nome: 'C', valor: 23, horas: 180 },
]

const calculeSalarioPorHora = ( empregado ) => {
  const total = empregado.valor * empregado.horas

  return {
    nome: empregado.nome,
    total
  }
}

const salariosDosEmpregados = empregados.map( calculeSalarioPorHora )

console.log( "salariosDosEmpregados: \n", salariosDosEmpregados )

/**
 
salariosDosEmpregados: 
 [ { nome: 'A', total: 4200 },
  { nome: 'B', total: 4500 },
  { nome: 'C', total: 4140 } ]

*/
```

Podemos ainda aplicar a técnica de *one line* na função `calculeSalarioPorHora` assim:

```js
const empregados = [
  { nome: 'A', valor: 30, horas: 140 },
  { nome: 'B', valor: 45, horas: 100 },
  { nome: 'C', valor: 23, horas: 180 },
]

const calculeSalarioPorHora = ( empregado ) => ({
  nome: empregado.nome,
  total: empregado.valor * empregado.horas
})

const salariosDosEmpregados = empregados.map( calculeSalarioPorHora )

console.log( "salariosDosEmpregados: \n", salariosDosEmpregados )
```

E ainda podemos refatorar para encapsular a lógica do `map`dessa forma:

```js
const calculeSalarioPorHora = ( empregado ) => ({
  nome: empregado.nome,
  total: empregado.valor * empregado.horas
})

const calculeSalario = ( empregados ) => empregados.map( calculeSalarioPorHora )

const empregados = [
  { nome: 'A', valor: 30, horas: 140 },
  { nome: 'B', valor: 45, horas: 100 },
  { nome: 'C', valor: 23, horas: 180 },
]
const salariosDosEmpregados = calculeSalario( empregados )

console.log( "salariosDosEmpregados: \n", salariosDosEmpregados )
```

Ficou bem mais simples e legível que esse código:

```js
const empregados = [
  { nome: 'A', valor: 30, horas: 140 },
  { nome: 'B', valor: 45, horas: 100 },
  { nome: 'C', valor: 23, horas: 180 },
]

const salariosDosEmpregados = []

for ( let i = 0; i < empregados.length; i++ ) {
  const total = empregados[ i ].valor * empregados[ i ].horas

  salariosDosEmpregados.push( {
    nome: empregados[ i ].nome,
    total
  } )
}
```

<br>

![tá certo isso?](http://www.criarmeme.com.br/meme/meme-1581--ta-certo-isso-.jpg)

<br>

## Exercício

Em um sistema de *ecommerce* iremos receber um *Array* de Pedidos, bem simples, <br>
onde precisamos aplicar o desconto no valor de cada produto e retornar um<br>
*Array* novo com os valores atualizados e sem o valor do desconto.

Quando trabalhamos de forma mutável vemos o código abaixo diversas vezes:


```js
const order = [
  { product_id: 1, quantity: 1, price: 100, discount: 10 },
  { product_id: 2, quantity: 1, price: 100, discount: 20 },
  { product_id: 3, quantity: 1, price: 100, discount: 30 },
]

const orderWithDiscount = []

for ( let i = 0; i < order.length; i++ ) {
  let product_id = order[ i ].product_id
  let quantity = order[ i ].quantity
  let price = ( order[ i ].price ) - ( order[ i ].price * ( order[ i ].discount / 100 ) )

  let result = {
    product_id,
    quantity,
    price
  }

  orderWithDiscount.push( result )
  
}

console.log( "orderWithDiscount: ", orderWithDiscount )

/**
 
orderWithDiscount:  [ { product_id: 1, quantity: 1, price: 90 },
  { product_id: 2, quantity: 1, price: 80 },
  { product_id: 3, quantity: 1, price: 70 } ]

*/
```

Logo mais veremos que o código acima além de ser mutável ainda possui<br>
efeitos colaterais, que abordarei na sequência dessa aula.

Para refatorar o código acima faremos o seguinte:

- criar uma função que receba o *Array* e aplique o `map`: `createOrder`
- criar uma função para o `map` que retornará os valores novos: `applyingDiscount`

```js
const order = [
  { product_id: 1, quantity: 1, price: 100, discount: 10 },
  { product_id: 2, quantity: 1, price: 100, discount: 20 },
  { product_id: 3, quantity: 1, price: 100, discount: 30 },
]

const applyingDiscount = ( obj, i ) => {
  const product_id = obj.product_id
  const quantity = obj.quantity
  const price = ( obj.price ) - ( obj.price * ( obj.discount / 100 ) )

  return {
    product_id,
    quantity,
    price
  }
  
}

const createOrder = ( list ) => list.map( applyingDiscount ) 

console.log( "createOrder: ", createOrder( order ) )

/**
 
createOrder:  [ { product_id: 1, quantity: 1, price: 90 },
  { product_id: 2, quantity: 1, price: 80 },
  { product_id: 3, quantity: 1, price: 70 } ]

*/
```

Como visto o desconto foi aplicado a cada produto e o objeto retornado<br>
já não possui mais o campo de desconto. Para melhorar nosso exemplo vamos<br>
mudar os valores de `quantity` e vamos fazer **outra** função para fazer<br>
o cálculo do valor final de cada produto a partir da sua quantidade.

Sabendo disso iremos criar a função `multiplyByQuantity` bem parecida com<br>
a que fizemos anteriormente, confira comigo abaixo:

```js
const order = [
  { product_id: 1, quantity: 2, price: 100, discount: 10 },
  { product_id: 2, quantity: 2, price: 100, discount: 20 },
  { product_id: 3, quantity: 10, price: 100, discount: 30 },
]

const applyingDiscount = ( obj, i ) => {
  const product_id = obj.product_id
  const quantity = obj.quantity
  const price = ( obj.price ) - ( obj.price * ( obj.discount / 100 ) )

  return {
    product_id,
    quantity,
    price
  }
  
}

const multiplyByQuantity = ( obj, i ) => {
  const product_id = obj.product_id
  const price = obj.price * obj.quantity

  return {
    product_id,
    price
  }
  
}

const createOrder = ( list ) => 
  list.map( applyingDiscount )
      .map( multiplyByQuantity )

console.log( "createOrder: ", createOrder( order ) )

/**
 
createOrder:  [ { product_id: 1, price: 180 },
  { product_id: 2, price: 160 },
  { product_id: 3, price: 700 } ]

*/
```

<br>
<br>




<br>
<br>

## λExercício

