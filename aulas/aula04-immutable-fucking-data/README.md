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

I
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

