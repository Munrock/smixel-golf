const Player = require('./player');

/**
 * stored per-player info
 */
class GameData {
    constructor() {
        this.players = new Map();
    }

    getPlayer(id){
        const storedPlayer = this.players.get(id);
        if(!!storedPlayer){
            return storedPlayer;
        }else{
            const newPlayer = new Player(id);
            this.players.set(id, newPlayer);
            return newPlayer;
        }
    }
}

module.exports = GameData;