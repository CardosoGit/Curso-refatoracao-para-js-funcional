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



