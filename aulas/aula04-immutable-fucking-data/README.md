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

E para entendermos como trabalhar com dados imutáveis precisamos<br>
entender antes o que são Funções Puras(Pure Functions).

<br> 
<br> 

## λPure Functions

![desenho de uma freira](http://i.imgur.com/xHpYORO.gif)

> "A pure function is a function that, given the same input, will 
> always return the same output and does not have any observable side effect."

*fonte: [Chapter 3: Pure Happiness with Pure Functions](https://github.com/MostlyAdequate/mostly-adequate-guide/blob/master/ch3.md)*

Já conhecemos esse conceito das aulas anteriores, porém agora veremos sua <br>
enorme importância para a Programação Funcional. 



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



## λImmutable Data 


<br>
<br>

## λExercício

