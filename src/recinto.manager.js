//@ts-check

import Recinto from "./Recinto.js"
import Animal from "./Animal.js";
import InvalidAnimalName from "./exception/InvalidAnimalName.js";
import animaisPermitidosList from "./utils/animaisPermitidos.list.js";
import InvalidQuantity from "./exception/InvalidQuantity.js";
import { BiomaEnum } from "./BiomaEnum.js";
import InvalidRecinto from "./exception/InvalidRecinto.js";

export default class RecintoManager {

    animaisPermitidos = animaisPermitidosList

    constructor() {

        this.recintos = [
            new Recinto(1, BiomaEnum.SAVANA, 10),
            new Recinto(2, BiomaEnum.FLORESTA, 5),
            new Recinto(3, BiomaEnum.SAVANA_E_RIO, 7),
            new Recinto(4, BiomaEnum.RIO, 8),
            new Recinto(5, BiomaEnum.SAVANA, 9),
        ];

        this.animais = {
            'LEAO': new Animal('LEAO', 3, [BiomaEnum.SAVANA], true),
            'LEOPARDO': new Animal('LEOPARDO', 2, [BiomaEnum.SAVANA], true),
            'CROCODILO': new Animal('CROCODILO', 3, [BiomaEnum.RIO], true),
            'MACACO': new Animal('MACACO', 1, [BiomaEnum.SAVANA, BiomaEnum.FLORESTA], false),
            'GAZELA': new Animal('GAZELA', 2, [BiomaEnum.SAVANA], false),
            'HIPOPOTAMO': new Animal('HIPOPOTAMO', 4, [BiomaEnum.SAVANA, BiomaEnum.RIO], false),
        };

        this.recintos[0].adicionarAnimal(this.animais['MACACO'], 3);
        this.recintos[2].adicionarAnimal(this.animais['GAZELA'], 1);
        this.recintos[4].adicionarAnimal(this.animais['LEAO'], 1);

    }

    /**
     * 
     * @param {Animal} animal 
     * @param {Number} quantidade 
     */
    analisaRecintos(animal, quantidade) {
        const animalAceito = this.isValidAnimalName(animal)
        const quantidadeAceita = this.isValidQuantity(quantidade)

        return this.isValidRecinto(animalAceito, quantidadeAceita)
    }

    isValidAnimalName(animal) {
        const result = this.animaisPermitidos?.includes(animal)
        if (!result) {
            throw new InvalidAnimalName('Animal inválido')
        }

        return this.animais[animal]
    }

    isValidQuantity(quantidade) {
        if (quantidade <= 0) {
            throw new InvalidQuantity('Quantidade inválida')
        }
        return quantidade
    }

    isValidRecinto(animal, quantidade) {
        const recintosDisponiveis = this.recintos?.filter(recinto =>
            animal.getBioma()?.some(bioma => recinto.getBioma()?.includes(bioma))
        );
        const recintosCarnivoros = this.isValidCarnivoro(animal, recintosDisponiveis)
        const recintosFiltrados = this.filtraEspacoLivre(animal, quantidade, recintosCarnivoros)
        const recintosViaveis = this.validaAnimaisEspecificos(animal, recintosFiltrados, quantidade)
        this.calculaEspaçoRecinto(animal, recintosViaveis, quantidade)

        if (recintosViaveis.length > 0) {
            return this.exibeRecintosViaveis(recintosViaveis)
        } else{
            throw new InvalidRecinto('Não há recinto viável')
        }

    }

    isValidCarnivoro(animal, recintos) {
        return recintos?.filter(recinto => {

            const existeCarnivoro = recinto.getAnimaisExistentes()?.some(bicho => bicho.animal.carnivoro);

            if (animal.isCarnivoro() && existeCarnivoro) {
                return recinto.getAnimaisExistentes()?.some(bicho => bicho.animal.especie === animal.getEspecie());
            } else if (animal.isCarnivoro() && !existeCarnivoro) {
                return recinto.getAnimaisExistentes().length === 0
            } else if (!animal.isCarnivoro() && existeCarnivoro) {
                return recinto.getAnimaisExistentes()?.some(bicho => !bicho.animal.carnivoro)
            } else {
                return recinto
            }
        })
    }

    filtraEspacoLivre(animal, quantidade, recintos) {
        return recintos?.filter(recinto => {

            const quantidadeSomada = animal.getTamanho() * quantidade;
            const animalIgual = recinto.getAnimaisExistentes()?.filter(bicho => bicho.animal.getEspecie() === animal.getEspecie());

            if (quantidadeSomada > recinto.getEspacoLivre()) {
                throw new InvalidRecinto("Não há recinto viável")
            }

            if (recinto.getAnimaisExistentes().length > 0 && !animalIgual) {
                return quantidadeSomada <= (recinto.getEspacoLivre() - 1)
            }

            return quantidadeSomada <= recinto.getEspacoLivre()
        })
    }

    validaAnimaisEspecificos(animal, recintos, quantidade) {
        if (animal.getEspecie() === 'MACACO' && quantidade < 2) {

            return recintos.filter(recinto => recinto.getAnimaisExistentes().length > 0)

        } else if (animal.getEspecie() === 'HIPOPOTAMO') {

            return recintos?.filter(recinto => {
                const existeBicho = recinto.getAnimaisExistentes().length > 0

                if (existeBicho && recinto.getBioma() !== BiomaEnum.SAVANA_E_RIO) {
                    return recinto.getAnimaisExistentes()?.some(bicho => bicho.animal.especie === animal.getEspecie())
                } else {
                    return recinto
                }
            })
        } else {
            return recintos
        }
    }

    calculaEspaçoRecinto(animal, recintos, quantidade) {

        recintos?.forEach(recinto => {
            const tamanhoCalculado = recinto.getEspacoLivre() - (animal.getTamanho() * quantidade)
            const contemAnimal = recinto.getAnimaisExistentes().length > 0
            const mesmaEspecie = recinto.getAnimaisExistentes().some(bicho => bicho.animal.especie === animal.getEspecie())
            if (contemAnimal && !mesmaEspecie) {
                recinto.setEspacoLivre(tamanhoCalculado - 1)
            } else {
                recinto.setEspacoLivre(tamanhoCalculado)
            }
        })
    }

    exibeRecintosViaveis(recintos) {
        return recintos?.map(recinto => {
            return `Recinto ${recinto.getNumero()} (espaço livre: ${recinto.getEspacoLivre()} total: ${recinto.getTamanhoTotal()})`
        })
    }
}
