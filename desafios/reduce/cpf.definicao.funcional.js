/**
 * 
O número de um CPF tem 9 algarismos e mais dois dígitos verificadores, 
que são indicados após uma barra. Logo, um CPF tem 11 algarismos. 
O número do CPF é escrito na forma ABCDEFGHI/JK ou diretamente como ABCDEFGHIJK, 
onde os algarismos não podem ser todos iguais entre si.
 
O J é chamado 1° dígito verificador do número do CPF.
 
O K é chamado 2° dígito verificador do número do CPF.

Primeiro Dígito

Para obter J multiplicamos A, B, C, D, E, F, G, H e I pelas constantes correspondentes:
A	B	C	D	E	F	G	H	I
x10	x9	x8	x7	x6	x5	x4	x3	x2
 
 O resultado da soma, 10A + 9B + 8C + 7D + 6E + 5F + 4G + 3H + 2I, é dividido por 11.
 
 Analisamos então o RESTO dessa divisão:
 
 Se for 0 ou 1, o dígito J é [0] (zero). Se for 2, 3, 4, 5, 6, 7, 8, 9 ou 10, o dígito J é [11 - RESTO]
 
 
*/