export default class InvalidAnimalName extends Error {
    constructor(erro) {
      super(erro);

      this.name = "AnimalNameException"

    }
  }
  