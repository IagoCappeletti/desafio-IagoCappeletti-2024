
export default class Animal {
  constructor(especie, tamanho, bioma, carnivoro) {

    this.especie = especie
    this.tamanho = tamanho
    this.bioma = bioma
    this.carnivoro = carnivoro

  }

  getEspecie() {
    return this.especie;
  }

  getTamanho() {
    return this.tamanho;
  }

  getBioma() {
    return this.bioma;
  }

  isCarnivoro() {
    return this.carnivoro
  }
}