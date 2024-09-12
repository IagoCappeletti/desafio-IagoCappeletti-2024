export default class InvalidRecinto extends Error {
    constructor(erro) {
      super(erro);

      this.name = "RecintoException"
    }
  }