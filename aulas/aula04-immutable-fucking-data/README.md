# λAula04.(Immutable Fucking Data)

![Immutable Awesomeness](http://i.imgur.com/l4JkguX.jpg)

<br>
<br>

> "A pure function is a function that, given the same input, will 
> always return the same output and does not have any observable side effect."

*fonte: [Chapter 3: Pure Happiness with Pure Functions](https://github.com/MostlyAdequate/mostly-adequate-guide/blob/master/ch3.md)*

Quando cheguei nesse tópico, durante o início dos meus estudos, ele fez-me <br> 
 questionar o seguinte:

> **Se eu não posso mudar nenhum valor das variáveis como é que eu vou programar?**

<br>

![](http://www.reactiongifs.com/r/hmmrhed.gif)

<br>
<br>

> Você também se questionou isso??

<br>
Que bom! Então antes de explicar esse conceito precisamos entender que existe <br> 
um grande problema ao usar-se uma linguagem que também suporta classes. Como <br> 
uma classe é uma estrutura que oculta dados e, além disso, contém funções, ele <br> 
apresenta muita complexidade. Para entender o motivo dessa complexidade, primeiro <br> 
precisamos falar sobre funções puras e impuras.


<br> 
<br> 

## λPure Functions

![What does a pure function look like?](http://i.imgur.com/frhBrUH.jpg)

```js

// impure
const minimum = 21
const checkAge = ( age ) => age >= minimum

```

Na parte impura, `checkAge` depende da constante `minimum` para determinar o <br> 
resultado, porém esse valor se encontra "fora do escopo interno" da função `checkAge`. 

**Para resolver esse problema é bem simples!**

Basta passarmos esse valor via parâmetro e de preferência definindo um <br> 
valor padrão, como podemos ver abaixo:


```js

// pure
const checkAge = ( age, minimum = 18 ) => age >= minimum

```

<br>
<br>

## λSide Effects

> "A side effect is a change of system state or observable interaction 
> with the outside world that occurs during the calculation of a result."

*fonte: [Chapter 3: Pure Happiness with Pure Functions](https://github.com/MostlyAdequate/mostly-adequate-guide/blob/master/ch3.md)*

Os efeitos colaterais(*side effects*) podem incluir, mas não estão limitados a:

- alteração em arquivos
- inserção um registro em um banco de dados
- requições HTTP
- mutações
- impressão na tela / logging
- entrada de dados do usuário
- consultas no DOM


<br>
<br>

## λImmutable Data 


<br>
<br>

## λExercício

