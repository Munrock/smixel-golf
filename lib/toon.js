const ToonData = require('./../schema/toon');

class Toon {
    constructor(toonDocument = false) {
        if (!!toonDocument) {
            this.data = toonDocument;
        } else {
            this.data = new ToonData();
        }
    }

    static async make(data, playerId) {
        //data is name{name, nick, full,}, pronouns
        const newToonData = new ToonData();
        newToonData.name = data.name;
        newToonData.owner = playerId;
        newToonData.pronouns = data.pronouns;
        await newToonData.save();
        const reloadedToonData = await ToonData.findById(newToonData._id);
        return new Toon(reloadedToonData);
    }

    static async getFromPlayerId(playerId) {
        const toon = await ToonData.findOne({ owner: playerId });
        if (!!toon) {
            return new Toon(toon);
        } else {
            return false;
        }
    }

    async save(){
        await this.data.save();
    }

    async destroy() {
        try {
            await ToonData.findByIdAndDelete(this.data._id).exec();
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    }

}

module.exports = Toon;