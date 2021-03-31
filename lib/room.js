const RoomData = require('./../schema/room');

class Room {
    static async summon(data){
        //data is a namespace (string) or object (with a string property)

        //if it's a string, convert it to an object with one property

        //search for a room with that namespace

            //if found, load it

            //if not found, create it

        //save the object and return it

    }
}

module.exports = Room;