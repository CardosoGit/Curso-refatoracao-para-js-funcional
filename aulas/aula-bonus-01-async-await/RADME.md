# Refatorando do callback até o async/await


Como preciso gerenciar muitas ISSUES em um único repositório eu me obriguei a criar um script para me auxiliar nessa tarefa, porém todos os exemplos oficiais da lib node-github seguem mais ou menos esse padrão:



A partir dele irei lhe demonstrar qual foi o caminho que segui para atualizar esse código, como sempre eu inicio separando algumas informações para depois poder injetá-las e implementando o CodeStyle do nosso Curso de Refatoração para JS Funcional, que por sinal possuo uma extensão para aplicar esse CodeStyle.
Logo nosso código ficará assim:



Nosso próximo passo lógico é encapsular as funções acima dessa forma:



Percebeu que as duas funções que criamos recebem como parâmetro na primeira vez o objeto github e com isso retorna outra função que recebe a CONFIG como parâmetro. Fiz dessa forma para que eu possa mudar futuramente a lib de acesso ao Github, sem que precise mexer nas funções já criadas anteriormente.
Promise
Agora sim podemos substituir o callback da função getForUser pelas funções then e catch  que são o padrão para Promises.
Como sei que é uma Promise tio Suissa?
Na documentação desse projeto não mostra nenhum exemplo utilizando then/catch , porém a assinatura do callback segue o mesmo padrão de funções que antes só trabalhavam com callback e depois migraram para as Promises, logo podemos inferir que recebo o res na função de sucesso then e o err na função de erro catch .
Sabendo disso podemos refatorar nosso código para o seguinte:



Bahhhh já ficou BEEEEM melhor né?
async/await
E agora que tal utilizamos async/await para atualizarmos ainda mais esse código?



Modularizando