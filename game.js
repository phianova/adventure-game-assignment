class Character {
    constructor(name, description, room) {
        this._name = name;
        this._description = description;
        this._room = room;
    }

    set name(value) {
        this._name = value;
    }

    set description(value) {
        this._description = value;
    }

    set room(value) {
        this._room = value;
    }

    get name() {
        return this._name;
    }

    get description() {
        return this._description;
    }

    get room() {
        return this._room;
    }

    describe () {
        return "There is a " + this._name + " " + this._description + "."
    }

}


class Player extends Character {
    constructor(name, description, room, score) {
        super (name, description, room)
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
    constructor(name, description, room, dialogue, attempts) {
        super (name, description, room)
        this._dialogue = dialogue;
        this._attempts = attempts;
    }

    set dialogue(value) {
        this._dialogue = value;
    }

    get dialogue() {
        return this._dialogue;
    }

    set attempts(value) {
        this._dialogue = value;
    }

    get attempts() {
        return this._dialogue;
    }

    talkToCharacter() {
        generateDialogue(this._attempts);
    }
}

class Enemy extends NPC {
    constructor(name, description, room, dialogue, hitPoints) {
        super (name,description,room,dialogue)
        this._hitPoints = hitPoints;
    }

    set hitPoints(value) {
        this._hitPoints = value;
    }

    get hitPoints() {
        return this._hitPoints;
    }

}

class Room {
    constructor(name, description, items) {
        this._name = name;
        this._description = description;
        this._items = items;
        this._linkedRooms = {};
        this._character = "";
    }

    set name(value) {
        this._name = value;
    }

    set description(value) {
        this._description = value;
    }

    set items(value) {
        this._items = value;
    }

    get items() {
        return this._items;
    }

    get name() {
        return this._name;
    }

    get description() {
        return this._description;
    }

    set character(characterName) {
        this._character = characterName;
    }

    get character() {
        return this._character;
    }

    linkRoom(room, dir) {
        this._linkedRooms[dir] = room;
    }

    /*
    get linkedRoomsList() {
        return Object.entries(this._linkedRooms);
    }*/

    roomText() {
        const linkedRoomList = Object.entries(this._linkedRooms);
        let directionsOfRooms = []
        for (const [dir, room] of linkedRoomList) {
            let text = "To the " + dir + " you see the " + room._name + ".";
            directionsOfRooms.push(text);
        }
        return directionsOfRooms.join(" ");
    }

    moveRooms(direction) {
        console.log(direction);
        console.log(this);
        console.log(this.linkedRoomsList);
        console.log(this._linkedRooms[direction])
        return this._linkedRooms[direction];
    }
    
}


const Beach = new Room("beach", "The sand feels hot between your toes and a sea breeze whooshes through your hair");
const Street = new Room("main street", "The cobbles are warm and there are plenty of holidaymakers milling around");
const DirtRoad = new Room("dirt road", "There are a few trees, and a sign pointing up the hill to a yoga retreat")
const YogaRetreat = new Room("yoga retreat", "There's a large water feature, a Buddha statue and wind chimes are sounding around you");
const Street2 = new Room("main street east end", "There are shops lining both sides of the street and some kids riding their bicycles up and down");
const ButcherShop = new Room("butcher's shop", "It's an old-fashioned kind of shop, with lots of different cuts of meat and offal laid out on the counters");
const Greengrocer = new Room("greengrocer", "It smells of fresh greens in here. There are fruits, vegetables, grains and bottles and cans in abundance lining all the shelves");
const OMalleys = new Room("bar, which is called O'Malley's", "It's a seedy kind of place, with red velvet stools next to an old wooden bar");

const PlayerOne = new Player("Your Name", "A player", "Beach", 0);

const Bartender = new NPC("bartender", "shaking up some cocktails behind a beach bar. He looks busy, but is eyeing you up in case you want to order something.", "Beach", ["What can I get you?", "Sorry, we don't make that. Anything else?", "YES my man! The classiest drink. The one, the only pina colada. Right away!"], 2);
const Butcher = new NPC("butcher", "bringing a huge cleaver down onto a massive slab of flesh. He looks up and smiles a big, beaming smile at you", "ButcherShop", "dialogue", 2);
const Grocer = new NPC("grocer","hurriedly serving a queue of customers. She adjusts her glasses down her nose to check the numbers on the rickety old till as she wordlessly punches in prices", "Greengrocer", "dialogue", 1);

const YogaInstructor = new Enemy("yoga instructor", "sitting in lotus position in the middle of a moss garden, burning incense in a holder by her feet. She senses you approaching", "YogaRetreat", "dialogue", 5);
const Lady = new Enemy("lady", "sitting cross-legged on one of the barstools, looking impatiently at the door. Wait! It's YOUR lady!", "OMalleys","dialogue", 5);


Beach.linkRoom(Street, "East");
Street.linkRoom(Beach, "West");
Street.linkRoom(Street2, "East");
Street.linkRoom(DirtRoad, "South");
DirtRoad.linkRoom(Street, "North");
DirtRoad.linkRoom(YogaRetreat, "South");
YogaRetreat.linkRoom(DirtRoad,"North");
Street2.linkRoom(Street, "West");
Street2.linkRoom(Butcher, "North");
Street2.linkRoom(Greengrocer, "South");
Street2.linkRoom(OMalleys, "East");
ButcherShop.linkRoom(Street2, "South");
Greengrocer.linkRoom(Street2, "North");
OMalleys.linkRoom(Street2, "West")

Beach.character = Bartender;
YogaRetreat.character = YogaInstructor;
ButcherShop.character = Butcher;
Greengrocer.character = Grocer;
OMalleys.character = Lady;

//Function to determine text to display in each room
const roomMessage =  (room) => {
    let characterMessage = "";
    if (room.character !== "" && room.character !== undefined) {
        characterMessage = room.character.describe();
    }
    let textToDisplay = "You are at the " + room.name + ". " + room.description + ". " + characterMessage + " " + room.roomText();
    return textToDisplay;
} 

//Function to generate dialogue
const generateDialogue = (character) => {
    if (character.attempts > 0) {

    }
}

document.addEventListener("keydown", function (event) {
    action = "";
    const directions = ["north", "south", "east", "west"];
    const items = ["quinoa", "champagne", "brain", "kidneys", "heart", "liver"]
    const answers = ["a", "b", "c", "d"]
    const validCommands = ["start", "buy", "talk", "move", "answer", "north", "south", "east", "west"];
    if (event.key === "Enter") {
        action = document.getElementById("input").value;
        actionWords = action.split(" ");
        if (actionWords[0].toLowerCase() === "start") {
            startGame();
        } else if (!validCommands.includes(actionWords[0].toLowerCase())){
            alert("This is not a valid action. Please try again.");
        }
        if (actionWords[0].toLowerCase() === "move") {
            if (directions.includes(actionWords[1].toLowerCase())) {
                //TODO insert check to make sure direction goes somewhere
                let direction = actionWords[1].toLowerCase();
                let capsDirection = capitalLetter(direction);
                let currentRoom = Player.room;
                let nextRoom = currentRoom.moveRooms(capsDirection);
                newRoom(nextRoom);
            } else {
                alert("This is not a valid direction to move in. Please try again.")
            }
        }
        /* FOR LATER */
        if (actionWords[0].toLowerCase() === "buy") {
            if (items.includes(actionWords[1].toLowerCase())) {
                //buyItem();
            } else {
                alert("This is not a valid item to buy. Please try again.")
            }
        }

        if (actionWords[0].toLowerCase() === "talk") {
            if (room.character !== "") {
                let character = room.character;
                character.talkToCharacter();
            } else {
                alert("There is noone here to talk to. Please try another action.")
            }
        }    

        if (actionWords[0].toLowerCase() === "answer") {
            if (answers.includes(actionWords[1].toLowerCase())) {
                //answerQuestion();
            } else {
                alert("This is not a valid answer. Please answer a, b, c or d.")
            }
        }    
        //reset input regardless of value entered
        document.getElementById("input").value = "";
    }
    
})

const startGame = () => {
    document.getElementById("room-text").innerHTML = roomMessage(Beach);
    document.getElementById("instructions").innerHTML = generateInstructions(Beach);
    document.getElementById("input").value = "";
    Player.room = Beach;
}

const newRoom = (room) => {
    document.getElementById("room-text").innerHTML = roomMessage(room);
    document.getElementById("instructions").innerHTML = generateInstructions(room);
    document.getElementById("input").value = "";
    Player.room = room;
}

const buyItem = () => {

}

console.log(Beach.linkedRoomsList);
const generateInstructions = (room) => {
    let moveInstruct = "Enter a command to explore another location";
    let charInstruct = "";
    let itemInstruct = "";
    if (room.character !== "" && room.character !== undefined) {
        charInstruct = " or talk to someone here";
    }
    if (room.items !== "" && room.items !== undefined) {
        console.log(room.items);
        itemInstruct = " or buy something";
        charInstruct = ", talk to someone here";
    }
    return moveInstruct + charInstruct + itemInstruct + ".";
}


//Functions to display or hide instructions.
const displayHelp = () => {
    document.getElementById("instructions-popup").style.display = "flex"
    document.getElementById("close-help").style.display = "flex"
    document.getElementById("help").style.display = "none"

}

const closeHelp = () => {
    document.getElementById("instructions-popup").style.display = "none"
    document.getElementById("help").style.display = "flex"
    document.getElementById("close-help").style.display = "none"

}

//REUSABLE: Capitalise directions
const capitalLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}