function rot13(str) { // LBH QVQ VG!
  var valoresUnicode = []

  for (let i in str) {
    valoresUnicode.push(str.charCodeAt(i))
  }
  
  var str13 = valoresUnicode.map((x) =>  {
    if (x === 32) return String.fromCharCode(x) //preserva o espaço
    if (x >= 65 && x <=90) { // range A-Z  
      if (x >= 78) return String.fromCharCode(x - 13) //Maior que 'N'
      if (x <= 78) return String.fromCharCode(x + 13) //Menor que 'N'
    } else {
      return String.fromCharCode(x) //Demais caracteres ñ aplica mudança
    }
  }).join('')
  
  return str13
}