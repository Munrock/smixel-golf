const ToonData = require('./../schema/toon');

class Toon {
    constructor(toonDocument = false) {
        if (!!toonDocument) {
            this.data = toonDocument;
        } else {
            this.data = new ToonData();
        }
    }
    static async getFromPlayerId(playerId) {
        const toon = await ToonData.findOne({ owner: playerId });
        if (!!toon) {
            return new Toon(toon);
        } else {
            return false;
        }
    }
}