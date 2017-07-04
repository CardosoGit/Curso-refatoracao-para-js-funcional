# CPF

O número de um CPF tem 9 algarismos e mais dois dígitos verificadores,<br> 
que são indicados após uma barra. Logo, um CPF tem 11 algarismos.<br>

O número do CPF é escrito na forma ABCDEFGHI/JK ou diretamente como ABCDEFGHIJK, <br>
onde os algarismos não podem ser todos iguais entre si.
 <br>
O J é chamado 1° dígito verificador do número do CPF.
 <br>
O K é chamado 2° dígito verificador do número do CPF.
<br>

## Primeiro Dígito

Para obter J multiplicamos A, B, C, D, E, F, G, H e I pelas constantes correspondentes:

```
Ax10	Bx9	Cx8	Dx7	Ex6	Fx5	Gx4	Hx3	Ix2
```
 
O resultado da soma, 10A + 9B + 8C + 7D + 6E + 5F + 4G + 3H + 2I, é dividido por 11.
 
Analisamos então o RESTO dessa divisão:

Se for 0 ou 1, o dígito J é [0] (zero). Se for 2, 3, 4, 5, 6, 7, 8, 9 ou 10, o dígito J é [11 - RESTO]
 

## Segundo Dígito

Já temos J. Para obter K multiplicamos A, B, C, D, E, F, G, H, I e J pelas constantes correspondentes:
 
```
11xA  10xB  9xC  8xD  7xE  6xF  5xG  4xH  3xI  2xJ
```
 
O resultado da soma, 11A + 10B + 9C + 8D + 7E + 6F + 5G + 4H + 3I + 2J, é dividido por 11.
 
Verificamos então o RESTO dessa divisão:
 
Se for 0 ou 1, o dígito K é [0] (zero). Se for 2, 3, 4, 5, 6, 7, 8, 9 ou 10, o dígito K é [11 - RESTO].
 

## Iniciando
