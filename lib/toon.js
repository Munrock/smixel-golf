const ToonData = require('./../schema/toon');
const Pronouner = require('./pronouner');
const CardLibrary = require('./card-library');

class Toon {
    constructor(toonDocument = false) {
        if (!!toonDocument) {
            this.data = toonDocument;
            this.pronouner = new Pronouner(this.data);
            this.library = new CardLibrary(this);
            this.traits = [];
        } else {
            throw Error('No toon data given');
        }
    }

    static async make(data, playerId) {
   
        //data is name{name, nick, full,}, pronouns
        const newToonData = new ToonData();
        newToonData.name = data.name;
        newToonData.owner = playerId;
        newToonData.pronouns = data.pronouns;

        //default cards
        //refactor to configurable interface
        const coreCards = await CardLibrary.CardData.find({
            namespace: 'core'
        });
        coreCards.forEach(card=>newToonData.deck.push(card));
        

        await newToonData.save();

        const reloadedToonData = await ToonData.findById(newToonData._id);
        await reloadedToonData.populate('deck');
        return new Toon(reloadedToonData);
    }

    static async getFromPlayerId(playerId) {
        const toon = await ToonData.findOne({ owner: playerId }).populate('deck');
        if (!!toon) {
            return new Toon(toon);
        } else {
            return false;
        }
    }

    static async getFromId(id) {
        const toon = await ToonData.findOne({ _id: id });
        if (!!toon) {
            return new Toon(toon);
        } else {
            return false;
        }
    }

    resetStats(){
        Object.assign(this.data.stats.current, this.data.stats.base);
    }

    async aggregateTraits(){
        const aggregatedtraits = [];
        await this.data.populate('deck');
        this.data.deck.forEach(card=>{
            aggregatedtraits = aggregatedtraits.concat(card.ctags);
        });
        this.traits = aggregatedtraits;
    }

    async save() {
        try {
        await this.data.save();
        return true;
        } catch(e){
            console.error(e);
            return false;
        }
    }

    async destroy() {
        try {
            await ToonData.findOneAndRemove({ _id: this.data._id });
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    }

}

module.exports = Toon;