class Character {
    constructor(name, description, currentRoom, hitPoints) {
        this._name = name;
        this._description = description;
        this._currentRoom = currentRoom;
        this._hitPoints = hitPoints;
    }
    set currentRoom(roomName) {
        
    }
}


class Player extends Character {
    constructor(name, description, position, hitPoints, score) {
        super (name,description,position,hitPoints)
        this._score = score;
    }

    set name(inputName) {
        if (inputName.length < 2) {
            alert("Name must be at least three characters.");
            return false;
        }
        this._name = inputName;
    }
}

class NPC extends Character {
    constructor(name, description, position, hitPoints, dialogue) {
        super (name,description,position,hitPoints)
        this._dialogue = dialogue;
    }
}

class Enemy extends Character {
    constructor(name, description, position, hitPoints, dialogue) {
        super (name,description,position,hitPoints)
        this._dialogue = dialogue;
    }
}

class Room {
    constructor(name, description, position) {
        this._name = name;
        this._description = description;
        this._position = position; //position will be an array like [1, 2] to indicate N-S and E-W positioning
        this._linkedRooms = {};
    }

    directionFromPlayer(currentRoom) { //PlayerPos will be an array like position
    /*console.log(playerPos, this.position)
    if (playerPos == this._position) {
            return "here";
        } else if (playerPos[0] < this.position[0] && playerPos[1] === this.position[1]) {
            return "South";
        } else if (playerPos[0] > this.position[0] && playerPos[1] === this.position[1]) {
            return "North";
        } else if (playerPos[0] === this.position[0] && playerPos[1] < this.position[1]) {
            return "East";
        } else if (playerPos[0] === this.position[0] && playerPos[1] > this.position[1]) {
            return "West";
        } else {
            return false;
        }
    */
        if (this.findRoom("South") === currentRoom) {
            return "South";
        } else if (this.findRoom("North") === currentRoom) {
            return "North";
        } else if (this.findRoom("East") === currentRoom) {
            return "East";
        } else if (this.findRoom("West") === currentRoom) {
            return "West";
        } else {
            return false;
        }
    }

    linkRoom(room, dir) {
        this._linkedRooms[dir] = room;
    }

    findRoom(dir) {
        return this._linkedRooms[dir];
    }
}





const narration = (room) => {
    return `To the ${room.directionFromPlayer(PlayerOne.currentRoom)} you see a ${room._name}. ${room._description}`
}

const Beach = new Room("beach", "The sand feels hot between your toes and a sea breeze whooshes through your hair", [0,0]);
const Street = new Room("street", "description", [0,1]);
const YogaRetreat = new Room("yoga retreat", "description", [-1, 1]);
const Street2 = new Room("more street", "description", [0,2]);
const ButcherShop = new Room("butcher's shop", "description", [1,2]);
const Greengrocer = new Room("greengrocer", "description", [-1,2]);
const OMalleys = new Room("bar called O'Malley's", "description", [0,3]);

const PlayerOne = new Player("Your Name", "A player", "Beach", 10, 0);

const Bartender = new NPC("bartender", "description", [0,0], 10, "dialogue");
const YogaInstructor = new NPC("yoga instructor", "description", [-1,1], 5, "dialogue");
const Butcher = new NPC("butcher", "description", [1,2], 10, "dialogue");
const Grocer = new NPC("grocer","description", [-1,2], 10, "dialogue");

const Lady = new Enemy("Lady", "description", [0,3], 5, "dialogue");

console.log(narration(Beach));

Beach.linkRoom(Street, "East");
Street.linkRoom(Beach, "West");
Street.linkRoom(Street2, "East");
Street.linkRoom(YogaRetreat, "South");
YogaRetreat.linkRoom(Street,"North");
Street2.linkRoom(Street, "West");
Street2.linkRoom(Butcher, "North");
Street2.linkRoom(Greengrocer, "South");
Street2.linkRoom(OMalleys, "East");
ButcherShop.linkRoom(Street2, "South");
Greengrocer.linkRoom(Street2, "North");
OMalleys.linkRoom(Street2, "West")
