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
        this._items = [];
    }

    set name(inputName) {
        if (inputName.length < 2) {
            alert("Name must be at least three characters.");
            return false;
        }
        this._name = inputName;
    }

    set items(value) {
        this._items = value;
    }

    get items() {
        return this._items;
    }
}

class NPC extends Character {
    constructor(name, description, room) {
        super (name, description, room)
        this._dialogue = "";
        this._items = "";
    }

    set dialogue(value) {
        this._dialogue = value;
    }

    get dialogue() {
        return this._dialogue;
    }

    set attempts(value) {
        this._attempts = value;
    }

    get attempts() {
        return this._attempts;
    }

    set answers(value) {
        this._answers = value;
    }

    get answers() {
        return this._answers;
    }

    set items(value) {
        this._items = value;
    }

    get items() {
        return this._items;
    }

    generateDialogue (type) {
        let answerText = "";
        let dialogueText = this._dialogue[type];
        if (type === "question") {
            let answersKeys = Object.keys(this.answers);
            let answersProperties = Object.values(this.answers);
            let answersValues = []
            for (let i = 0; i < answersProperties.length; i++) {
                answersValues.push(answersProperties[i].answer);
            }
            let answersArray = []
            for (let i = 0; i < answersKeys.length; i++) {
                answersArray.push(answersKeys[i]);
                answersArray.push(answersValues[i]);
                answersArray.push("<br>")
            }
            answerText = "<br><br>" + answersArray.join(" ");
        } else if (type === "correct") {
            if (this._items !== "") {
                let inventory = PlayerOne.items;
                inventory.push(this._items[0]);
                if (this._name === "yoga instructor") {
                    answerText = `<br><br> You have proven you are not into yoga!`
                } else if (this._name === "lady") {
                    answerText = `<br><br> You have proven you like getting caught in the rain!`
                } else {
                    answerText = `<br><br> You have received a ${this._items[0]}!`;
                }console.log(inventory);
            }
        }
        return `The ${this._name} says: "${dialogueText}" ${answerText}`;
    }
    
    getDialogueType(answer) {
        let dialogueType = "";
        if (this._attempts === 0) {
            dialogueType = "question";
        } else if (this._attempts === 1 && this.answerCorrect(answer)) {
            dialogueType = "correct";
        } else if (this._attempts === 1 && !this.answerCorrect(answer)) {
            dialogueType = "incorrect";
        } else if (this._attempts >= 2) {
            dialogueType = "complete";
        }
        this.attempts ++;     
        return dialogueType;
    }

    answerCorrect(answer) {
        let answersKeys = Object.keys(this.answers);
        let answersProperties = Object.values(this.answers);
        let answersValues = []
        for (let i = 0; i < answersProperties.length; i++) {
            answersValues.push(answersProperties[i].correct);
        }
        let correct = false;
        for (let i = 0; i < answersKeys.length; i++) {
            if (answersKeys[i] === answer) {
                if (answersValues[i] === true) {
                    correct = true;
                }
            }
        }
        return correct;
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

    get linkedRoomList() {
        return Object.entries(this._linkedRooms);
    }

    linkRoom(room, dir) {
        this._linkedRooms[dir] = room;
    }

    linkedRoomsText() {
        const linkedRoomList = Object.entries(this._linkedRooms);
        let directionsOfRooms = []
        for (const [dir, room] of linkedRoomList) {
            let text = "To the " + dir + " you see the " + room._name + ".";
            directionsOfRooms.push(text);
        }
        return directionsOfRooms.join(" ");
    }

    roomMessage() {
        let characterMessage = "";
        if (this._character !== "" && this._character !== undefined) {
            characterMessage = "<br>" + this._character.describe() + "<br>";
        }
        let textToDisplay = "You are at the " + this._name + ". " + this._description + ". <br>" + characterMessage + " <br>" + this.linkedRoomsText();
        return textToDisplay;
    } 

    moveRooms(direction) {
        return this._linkedRooms[direction];
    }

    generateInstructions () {
        let moveInstruct = "Enter a command to explore another location";
        let charInstruct = "";
        let itemInstruct = "";
        if (this._character !== "" && this._character !== undefined) {
            charInstruct = " or talk to someone here";
        }
        if (this._items !== "" && this._items !== undefined) {
            charInstruct = ", talk to someone here";
            itemInstruct = " or buy something";
        }
        return moveInstruct + charInstruct + itemInstruct + ".";
    }
    
}


const Beach = new Room("beach", "The sand feels hot between your toes and a sea breeze whooshes through your hair");
const Street = new Room("main street", "The cobbles are warm and there are plenty of holidaymakers milling around");
const DirtRoad = new Room("dirt road", "There are a few trees, and a sign pointing up the hill to a yoga retreat")
const YogaRetreat = new Room("yoga retreat", "There's a large water feature, a Buddha statue and wind chimes are sounding around you");
const Street2 = new Room("main street (east end)", "There are shops lining both sides of the street and some kids riding their bicycles up and down");
const ButcherShop = new Room("butcher's shop", "It's an old-fashioned kind of shop, with lots of different cuts of meat and offal laid out on the counters");
const Greengrocer = new Room("greengrocer", "It smells of fresh greens in here. There are fruits, vegetables, grains and bottles and cans in abundance lining all the shelves");
const OMalleys = new Room("bar, called O'Malley's", "It's a seedy kind of place, with red velvet stools next to an old wooden bar");

const PlayerOne = new Player("Your Name", "A player", "Beach", 0);

const Bartender = new NPC("bartender", "shaking up some cocktails behind a beach bar. He looks busy, but is eyeing you up in case you want to order something", "Beach");
const Butcher = new NPC("butcher", "bringing a huge cleaver down onto a massive slab of flesh. He looks up and smiles a big, beaming smile at you", "ButcherShop");
const Grocer = new NPC("grocer","hurriedly serving a queue of customers. She adjusts her glasses down her nose to check the numbers on the rickety old till as she wordlessly punches in prices", "Greengrocer");
const YogaInstructor = new NPC("yoga instructor", "sitting in lotus position in the middle of a moss garden, burning incense in a holder by her feet. She senses you approaching", "YogaRetreat");

//const YogaInstructor = new Enemy("yoga instructor", "sitting in lotus position in the middle of a moss garden, burning incense in a holder by her feet. She senses you approaching", "YogaRetreat", "dialogue", 5);
const Lady = new Enemy("lady", "sitting cross-legged on one of the barstools, looking impatiently at the door. Wait! It's YOUR lady", "OMalleys","dialogue", 5);

Bartender.dialogue = bartenderDialogue;
Bartender.answers = bartenderAnswers;
Bartender.items = ["Pina colada", "./media/pinaColada.png"];
YogaInstructor.dialogue = yogaDialogue;
YogaInstructor.answers = yogaAnswers;
YogaInstructor.items = ["Not into yoga"];
Butcher.dialogue = butcherDialogue;
Butcher.answers = butcherAnswers;
Butcher.items = ["Half a brain", "./media/halfABrain.png"];
Grocer.dialogue = grocerDialogue;
Grocer.answers = grocerAnswers;
Grocer.items = ["Champagne", "./media/champagne.png"];
Lady.dialogue = ladyDialogue;
Lady.answers = ladyAnswers;
Lady.items = ["Caught in the rain"];


Beach.linkRoom(Street, "east");
Street.linkRoom(Beach, "west");
Street.linkRoom(Street2, "east");
Street.linkRoom(DirtRoad, "south");
DirtRoad.linkRoom(Street, "north");
DirtRoad.linkRoom(YogaRetreat, "south");
YogaRetreat.linkRoom(DirtRoad,"north");
Street2.linkRoom(Street, "west");
Street2.linkRoom(ButcherShop, "north");
Street2.linkRoom(Greengrocer, "south");
Street2.linkRoom(OMalleys, "east");
ButcherShop.linkRoom(Street2, "south");
Greengrocer.linkRoom(Street2, "north");
OMalleys.linkRoom(Street2, "west")

Beach.character = Bartender;
YogaRetreat.character = YogaInstructor;
ButcherShop.character = Butcher;
Greengrocer.character = Grocer;
OMalleys.character = Lady;


//function to handle commands
document.addEventListener("keydown", function (event) {
    action = "";
    const directions = ["north", "south", "east", "west"];
    const answers = ["a", "b", "c", "d"]
    const validCommands = ["start", "restart", "talk", "move", "answer", "leave", "check", "north", "south", "east", "west"]; //for later: "buy",
    if (event.key === "Enter") {
        action = document.getElementById("input").value;
        actionWords = action.split(" ");
        if (actionWords[0].toLowerCase() === "start" || actionWords[0].toLowerCase() === "restart") {
            startGame();
        } else if (!validCommands.includes(actionWords[0].toLowerCase())){
            alert("This is not a valid action. Please try again.");
        }
        if (actionWords[0].toLowerCase() === "move") {
            let currentRoom = PlayerOne.room;
            let availableDirections = currentRoom.linkedRoomList.map(([direction]) => direction);
            let direction = actionWords[1];
            if (directions.includes(actionWords[1].toLowerCase()) && availableDirections.includes(direction)) {
                let nextRoom = currentRoom.moveRooms(direction);
                newRoom(nextRoom);
            } else {
                alert("This is not a valid direction to move in. Please try again.")
            }
        
        }
        if (actionWords[0].toLowerCase() === "talk") {
            let currentRoom = PlayerOne.room;
            if (currentRoom.character !== "") {
                let character = currentRoom.character;
                let dialogueType = character.getDialogueType();
                let dialogue = character.generateDialogue(dialogueType);
                newDialogueScreen(dialogue, dialogueType);
            } else {
                alert("There is noone here to talk to. Please try another action.")
            }
        }    

        if (actionWords[0].toLowerCase() === "answer") {
            if (answers.includes(actionWords[1].toLowerCase())) {
                let currentRoom = PlayerOne.room;
                let character = currentRoom.character;
                let dialogueType = character.getDialogueType(actionWords[1].toLowerCase());
                let dialogue = character.generateDialogue(dialogueType);
                if (dialogueType === "correct" && character !== Lady && character !== YogaInstructor) {
                    let itemImage = document.getElementById("item-image")
                    itemImage.style.display = "flex";
                    itemImage.src = character.items[1];
                    console.log(itemImage.src);
                } 
                newDialogueScreen(dialogue, dialogueType);
            } else {
                alert("This is not a valid answer. Please answer a, b, c or d.")
            }
        }    

        if (actionWords[0].toLowerCase() === "leave") {
            if (document.getElementById("dialogue-text").style.display != "none") {
                endDialogue();
            } else {
                alert("You can't just 'leave' right now!")
            }
        }    

        if (actionWords[0].toLowerCase() === "check") {
            let currentRoom = PlayerOne.room;
            if (currentRoom.character === Lady && Lady.attempts !== 0) {
                bossFight();
            } else if (Lady.attempts === 0) {
                alert("You need to answer your lady's question first.")
            } else {
                alert("You have nothing to check in this room.")
            }        
        }    

        //reset input regardless of value entered
        document.getElementById("input").value = "";
    }
    
})

const startGame = () => {
    /*let existingMusic = document.getElementsByTagName('audio');
    console.log(existingMusic);
    if (existingMusic.length !== 0) {
        existingMusic.remove();
    }*/

    var music = document.getElementById("audio");
    music.setAttribute("src", "./media/escape.mp3");
    music.setAttribute("autoplay", "autoplay");
    music.setAttribute("controls", "controls");
    music.setAttribute("loop", "loop");

    console.log(document.getElementsByTagName('audio'));

    document.getElementById("dialogue-text").style.display = "none";
    document.getElementById("win-text").style.display = "none";
    document.getElementById("room-text").style.display = "flex";

    document.getElementById("room-name").innerHTML = capitalLetter(Beach.name);
    document.getElementById("room-text").innerHTML = Beach.roomMessage();
    document.getElementById("instructions").innerHTML = Beach.generateInstructions();
    document.getElementById("input").value = "";

    PlayerOne.items = [];
    Bartender.attempts = 0;
    YogaInstructor.attempts = 0;
    Butcher.attempts = 0;
    Grocer.attempts = 0;
    Lady.attempts = 0;

    PlayerOne.room = Beach;
    let roomCharacter = Beach.character;
    roomCharacter.attempts = 0;
}

const newRoom = (room) => {
    document.getElementById("room-text").style.display = "flex";
    document.getElementById("room-name").innerHTML = capitalLetter(room.name);
    document.getElementById("dialogue-text").style.display = "none";
    document.getElementById("item-image").style.display = "none";
    document.getElementById("room-text").innerHTML = room.roomMessage();
    document.getElementById("instructions").innerHTML = room.generateInstructions();
    document.getElementById("input").value = "";
    PlayerOne.room = room;
    let roomCharacter = room.character;
    if (roomCharacter.attempts === undefined) {
        roomCharacter.attempts = 0;
    }
}

const newDialogueScreen = (dialogue, dialogueType) => {
    document.getElementById("room-text").style.display = "none";
    document.getElementById("dialogue-text").style.display = "flex";
    document.getElementById("dialogue-text").innerHTML = dialogue;
    let currentRoom = PlayerOne.room;
    let character = currentRoom.character;
    if (dialogueType === "question") {
        document.getElementById("instructions").innerHTML = 'Type "answer" followed by your answer (a, b, c or d) to proceed.';
    } else if (character === Lady) {
        document.getElementById("instructions").innerHTML = 'Enter "check" to see if you have everything she\'s looking for - or "leave" to explore further first.';
    } else {
        document.getElementById("instructions").innerHTML = "They don't seem to want to talk any more. Type 'leave' to go back to looking around the room.";
    }
    document.getElementById("input").value = "";
}

const endDialogue = () => {
    document.getElementById("dialogue-text").style.display = "none";
    document.getElementById("item-image").style.display = "none";
    document.getElementById("room-text").style.display = "flex";
    newRoom(PlayerOne.room);
}

const bossFight = () => {
    if (winConditions() === true) {
        //win screen:
        document.getElementById("room-name").innerHTML = "Well done!";
        document.getElementById("dialogue-text").style.display = "flex";
        document.getElementById("dialogue-text").innerHTML =  generateBossDialogue();
        document.getElementById("room-text").style.display = "none";
        document.getElementById("win-text").style.display = "flex";
        document.getElementById("instructions").innerHTML = 'Enter "restart" to play again.';
        document.getElementById("input").value = "";
    } else {
        //lose screen:
        document.getElementById("room-name").innerHTML = "Game over...";
        document.getElementById("dialogue-text").style.display = "flex";
        document.getElementById("dialogue-text").innerHTML = generateBossDialogue();
        document.getElementById("room-text").style.display = "none";
        document.getElementById("instructions").innerHTML = 'Enter "restart" to play again.';
        document.getElementById("input").value = "";   
    }
}

const winItems = ["Pina colada", "Half a brain", "Not into yoga", "Champagne", "Caught in the rain"]

const winConditions = () => {
    let inventory = PlayerOne.items;
    for (let i = 0; i<winItems.length; i++) {
        if (!inventory.includes(winItems[i])) {
            return false;
        }
    }
    return true;
}

const generateBossDialogue = () => {
    let inventory = PlayerOne.items;
    let string1 = (inventory.includes("Pina colada")) ? "You like pina coladas," : "You don't like pina coladas!";
    let string2 = (inventory.includes("Caught in the rain")) ? "You like getting caught in the rain," : "You don't like getting caught in the rain...";
    let string3 = (inventory.includes("Not into yoga")) ? "You're not into yoga," : "You're into yoga!";
    let string4 = (inventory.includes("Half a brain")) ? "You have half a brain," : "You don't have half a brain!";
    let string5 = (inventory.includes("Champagne")) ? "And you're into champagne!" : "And you're into health food, not champagne. Ew.";
    let string6 = winConditions() ? "You have everything I'm looking for! Let's get out of here and escape." : "You don't have everything I'm looking for. Sorry.";
    return `Your lady says: <br><br>"${string1} <br> ${string2} <br> ${string3} <br> ${string4} <br> ${string5} <br><br> ${string6}`
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

//REUSABLE: Capitalise words
const capitalLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}