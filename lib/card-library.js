const CardData = require('./../schema/card');

class CardLibrary {
    constructor(toon){
        this.toon = toon;
    }

    static async create(namespace, name) {
        const newCard = new CardData();
        newCard.namespace = namespace;
        newCard.name = name;
        await newCard.save();
        return newCard;
    }

    static async findByNameSpace(namespace, name) {
        const results = await CardData.findOne({
            namespace: namespace,
            name: name,
        }).exec();
        return results;
    }
}

module.exports = CardLibrary;