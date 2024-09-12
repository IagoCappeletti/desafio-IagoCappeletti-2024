import RecintoManager from "./recinto.manager.js";

class RecintosZoo {

        recintoManager = new RecintoManager()

        analisaRecintos(animal, quantidade) {

                try {
                        const response = this.recintoManager.analisaRecintos(animal, quantidade)
                        return { recintosViaveis: response }
                } catch (erro) {
                        return { erro: erro.message }
                }
        }
}

export { RecintosZoo as RecintosZoo };
