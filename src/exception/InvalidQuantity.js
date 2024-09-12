
export default class InvalidQuantity extends Error {
    constructor(erro) {
      super(erro);

      this.name = "QuantityException"
    }
  }