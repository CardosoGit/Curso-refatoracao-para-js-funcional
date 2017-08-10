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


<br> 
<br> 

## λPure Functions


> "A pure function is a function that, given the same input, will 
> always return the same output and does not have any observable side effect."

*fonte: [Chapter 3: Pure Happiness with Pure Functions](https://github.com/MostlyAdequate/mostly-adequate-guide/blob/master/ch3.md)*

Já conhecemos esse conceito das aulas anteriores, porém agora veremos sua <br>
enorme importância para a Programação Funcional. Pois esse mesmo conceito <br>
engloba outros como:

- efeitos colaterais;
- transparência referencial;
- e obviamente dados imutáveis.


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
  let product_id = obj.product_id
  let quantity = obj.quantity
  let price = ( obj.price ) - ( obj.price * ( obj.discount / 100 ) )

  return {
    product_id,
    quantity,
    price
  }
  
}

const createOrder = ( list ) => list.map( applyDiscount ) 

console.log( "createOrder: ", createOrder( order ) )

/**
 
createOrder:  [ { product_id: 1, quantity: 1, price: 90 },
  { product_id: 2, quantity: 1, price: 80 },
  { product_id: 3, quantity: 1, price: 70 } ]

*/
```


<br>
<br>


## λSide Effects

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


<br>
<br>

## λImmutable Data 


<br>
<br>

## λExercício

