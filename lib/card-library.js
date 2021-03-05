const CardData = require('./../schema/card');

class CardLibrary {
    static async create(namespace, name){
        const newCard = new CardData();
        newCard.namespace = namespace;
        newCard.name = name;
        await newCard.save();
        return newCard;
    }

    static async findByNameSpace(namespace, name){
        const results = await CardData.find({
            namespace: namespace,
            name: name,
        }).exec();
        //if there are multiple copies, rename some
        if(results.length>1){
            for(let i=results.length; i>0; i--){
                const card = results[i-1];
                card.name = `${card.name} (${i})`;
                await card.save();
            }
            return results[0];
        }else if (results.length==1){
            return results[0];
        }else return null;
    }
}

module.exports = CardLibrary;