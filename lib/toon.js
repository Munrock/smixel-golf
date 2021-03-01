const ToonData = require('./../schema/toon');

class Toon {
    constructor(toonDocument = false) {
        if (!!toonDocument) {
            this.data = toonDocument;
        } else {
            this.data = new ToonData();
        }
    }

    static async make(data) {
        //data is name{name, nick, full,}, pronouns
        const newToonData = new ToonData();
        newToonData.name = data.name;
        newToonData.pronouns = data.pronouns;
        await newToonData.save();
        return new Toon(newToonData);
    }
    static async getFromPlayerId(playerId) {
        const toon = await ToonData.findOne({ owner: playerId });
        if (!!toon) {
            return new Toon(toon);
        } else {
            return false;
        }
    }
    async destroy() {
        try {
            await ToonData.deleteOne({ _id: this.data._id }).exec();
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    }

}