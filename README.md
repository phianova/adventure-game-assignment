# adventure-game-assignment
Assignment 3 for TDA development bootcamp - text-based adventure in JS, demonstrating OOP knowledge


## Project Brief - OOP Text Adventure Game
_The aim of this project is to create a text based adventure game using Object Oriented
Programming techniques in JavaScript_
_Extra bragging rights will be awarded for creativity in the subject and presentation of your game._
### Your Project
_The game should be created using HTML, CSS and JavaScript. The game should include the
following functionality:_
1. _A Single HTML page. The user should not move from the page when playing the
game._
- Achieved! It's all on one page
2. _The ability to move around the game to different “rooms”._
- Achieved! See map - you can move by entering "move (direction)" into the text input field.
3. _The display of a description of the room when the adventurer enters the room._
- Achieved! Each room has a description which shows up in the #room-text HTML element.
4. _The display of a description of any objects or characters who are in the room._
- Achieved - though I haven't used objects, so just for characters.
5. _The ability to interact with characters and /or objects / rooms in the game (e.g. fight a
character, solve a puzzle, collect an object)._
- Achieved - I wanted a bit more variety in interactions but ran out of time slightly, so it's all interactions with characters. Each asks a question you have to get right (or wrong, with one of them), and if you answer correctly you get an item.
6. _The ability to “loose” the game if certain conditions occur (e.g. in interaction with a
character, object or room)._
- Achieved - you lose if you talk to the final boss character, ask her to "check" your items, and don't have what she's looking for.
7. _The ability to “win” the game if certain conditions occur (e.g. in interaction with a
character, object or room)._
- Achieved - you win if you you talk to the final boss character, ask her to "check" your items, and have everything she's looking for.

### Deliverables
The address for the GitHub repository.
The address for the GitHub pages.

### Extension
_Create a win condition that is dependent on several actions during the game (defeat several
enemy characters, collect objects from friendly characters and defeat a final “boss” character)_
- Achieved! You have to interact with a series of characters and answer questions correctly in order to gain the 5 items needed to win the game.

_Reuse the classes and methods to create a second game in a different setting (the second
game could be much simpler and only include navigation around the setting)._
- Not yet - but most of the classes are reusable (though some internal functions are specific to the game)

## Game details
### MAP
                        Butcher
                           ^
Beach > Street West > Street East > O'Malley's
            v              v
           Hill          Grocer
            v
        Yoga Retreat


### Explanation
This was a bit less structured in terms of planning as I got used to principles of OOP.
My refactor and extension ideas are:
1. Refactor: Tidy up the functions a bit so that there are fewer function calls within functions - I think I overcomplicated some of it.
2. Make it possible to "buy" items within the Greengrocer room so that you can interact with the room not the character.
3. Make the "caught in the rain" criteria a room interaction as well - i.e. it's raining on the main street, do you want to wait? yes/no.
4. Make the items an actual class with a constructor.
5. Have the "boss fight" be more dynamic with multiple stages.
6. Have unwanted items also show up in the inventory, so there are different dialogues at the end for having chosen INCORRECTLY versus not choosing at all.