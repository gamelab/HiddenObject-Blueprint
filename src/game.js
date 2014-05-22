
/**
* The core HiddenObject blueprint game file.
* 
* This file is only used to initalise (start-up) the main Kiwi Game 
* and add all of the relevant states to that Game.
*
*/


//Initialise the Kiwi Game. 
var gameOptions = {
	width: 768,
	height: 1024
}; 

var game = new Kiwi.Game('content', 'HiddenObjectBlueprint', null, gameOptions);

//Add all the States we are going to use.
game.states.addState(LoadingState);
game.states.addState(IntroState);
game.states.addState(PlayState);

//Switch to/use the Preloader state. 
game.states.switchState("LoadingState");