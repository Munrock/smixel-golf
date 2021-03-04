const Toon = require('./toon');

class Player {
    constructor(playerId) {//discord user ID
        this.id = playerId;

        this.focus = {
            toon: null,
        }
    }

    async toon() {
        if (this.focus.toon) {
            return this.focus.toon;
        } else {
            const loadedToon = await Toon.getFromPlayerId(this.id);
            if (loadedToon) {
                this.focus.toon = loadedToon;
                return loadedToon;
            } else throw Error('The player has no character in focus');
        }
    }

    focusToon(t) {
        this.focus.toon = t;
    }
}

module.exports = Player;