const CardData = require('./../schema/card');

class CardLibrary {
    constructor(toon) {
        this.toon = toon;
        this.hand = new Map();
        this.deck = toon.data.deck; //top of deck is front :: shift to draw, push to recharge
        this.discard = [];

    }

    static CardData = CardData;

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

    async addCardByNamespace(ns) {
        const name = ns.split('/');
        const card = await CardData.findOne({ name: name[1], namespace: name[0] });
        this.toon.data.deck.push(card);
        this.discard.push(card);
        await this.toon.save();
    }

    async addCardById(id) {
        const card = await CardData.findById(id);
        this.toon.data.deck.push(card);
        this.discard.push(card);
        await this.toon.save();
    }

    async addCard(card) {
        this.toon.data.deck.push(card);
        this.discard.push(card);
        await this.toon.save();
    }

    async removeCardByNamespace(ns) {
        const name = ns.split('/');
        const before = this.toon.data.deck.length;
        this.toon.data.deck = [...this.toon.data.deck].filter(function (card) {
            return !(card.namespace == name[0] && card.name == name[1]);
        });
        const after = this.toon.data.deck.length;
        await this.toon.save();
        return before - after;
    }

    async removeCardById(id) {
        const before = this.toon.data.deck.length;
        this.toon.data.deck = this.toon.data.deck.filter(card => card._id != id);
        const after = this.toon.data.deck.length;
        await this.toon.save();
        return before - after;
    }

    async removeCard(cardToRemove) {
        this.toon.data.deck = this.toon.data.deck.filter(card => card._id != cardToRemove._id);
        await this.toon.save();
    }

    moveToHand(card) {
        //TODO make this restrict according to slot property
        this.hand.set(card._id, card);
    }

    moveToDiscard(card) {
        this.discard.push(card);
    }

    moveToDeck(card) {
        this.deck.push(card);
    }

    use(index) { //doesn't specifically use the card's ability, just handles its deck action
        const card = this.hand.get(index);
        switch (card.onUse) { //_discard_, destroy, recharge, remain
            case 'remain':
                console.log(`${card.name} remains in hand`);
                break;
            case 'destroy':
                this.removeCard(card);
                this.hand.delete(index);
                console.log(`${card.name} was destroyed`);
                break;
            case 'recharge':
                this.moveToDeck(card);
                this.hand.delete(index);
                console.log(`${card.name} was recharged`);
                break;
            case 'discard':
            default:
                this.moveToDiscard(card);
                this.hand.delete(index);
                console.log(`${card.name} was discarded`);
        }
    }

    shuffleDeck() {
        for (let i = this.deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }
    }

    drawToHandSize() {
        //hand size is hard coded to 5 for now
        while (this.hand.size < 5 && this.deck.length > 0) {
            const card = this.deck.shift();
            if (card) this.moveToHand(card);
        }
    }


}

module.exports = CardLibrary;