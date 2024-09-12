
export default class Recinto {

  constructor(numero, bioma, tamanhoTotal) {
    this.numero = numero
    this.bioma = bioma
    this.tamanhoTotal = tamanhoTotal
    this.espacoLivre = tamanhoTotal
    this.animaisExistentes = []

  }

  getNumero() {
    return this.numero;
  }

  getBioma() {
    return this.bioma;
  }

  getTamanhoTotal() {
    return this.tamanhoTotal;
  }

  getEspacoLivre() {
    return this.espacoLivre
  }

  getAnimaisExistentes() {
    return this.animaisExistentes
  }

  setEspacoLivre(espacoLivre){
    this.espacoLivre = espacoLivre
  }

  adicionarAnimal(animal, quantidade) {
    this.animaisExistentes.push({ animal, quantidade: quantidade });
    this.espacoLivre = this.tamanhoTotal - (animal.tamanho * quantidade)
  }
}

export { Recinto as recinto };