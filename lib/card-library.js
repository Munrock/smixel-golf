const CardData = require('./../schema/card');

class CardLibrary {
    constructor(toon){
        this.toon = toon;
        this.hand = new Map();
        this.deck = toon.data.deck; //top of deck is front :: shift to draw, push to recharge
        this.discard = [];
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

    async addCardByNamespace(ns){
        const name = ns.split('/');
        const card = await CardData.findOne({name: name[1], namespace: name[0]});
        this.toon.data.deck.push(card); 
        this.discard.push(card); 
        await this.toon.data.save();
    }

    async addCardById(id){
        const card = await CardData.findById(id);
        this.toon.data.deck.push(card);
        this.discard.push(card);
        await this.toon.data.save();
    }

    async addCard(card){
        this.toon.data.deck.push(card);
        this.discard.push(card);
        await this.toon.data.save();
    }

    async removeCardByNamespace(ns){
        await this.toon.data.populate('deck'); 
        const name = ns.split('/');
        this.toon.data.deck = this.toon.data.deck.filter(card => {
            return !(card.namespace==name[0] && card.name==name[1]);
        });
        await this.toon.data.save();
    }

    async removeCardById(id){
        await this.toon.data.populate('deck');
        this.toon.data.deck = this.toon.data.deck.filter(card => card._id!=id);
        await this.toon.data.save();
    }

    async removeCard(removeCard){
        await this.toon.data.populate('deck');
        this.toon.data.deck = this.toon.data.deck.filter(card => card._id!=removeCard._id);
        await this.toon.data.save();
    }

    moveToHand(card){
        //TODO make this restrict according to slot property
        this.hand.set(card._id, card);
    }
    
    moveToDiscard(card){
        this.discard.push(card);
    }

    moveToDeck(card){
        this.deck.push(card);
    }

    shuffleDeck(){
        for (let i = this.deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }
    }

    drawToHandSize(){
        //hand size is hard coded to 5 for now
        while(this.hand.size<5 && this.deck.length>0){
            const card = this.deck.shift();
            if(card) this.moveToHand(card);
        }
    }


}

module.exports = CardLibrary;