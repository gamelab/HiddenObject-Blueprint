var PlayState = new Kiwi.State('PlayState');

/**
* The PlayState in the core state that is used in the game. 
*
* It is the state where majority of the functionality occurs 'in-game' occurs.
* 
*
* @class playState
* @extends State
* @namespace Kiwi.BluePrints.HiddenObject
* @constructor
*/


/**
* Since we have loaded all the graphics in the LoadingState, the we can skip adding in a preload method to this state and just  start at the create. 
*
* @method create
* @public
*/
PlayState.create = function () {


    //Create our Hidden Object Arrays, This will store all of our hidden objects.
    this.hiddenObjects = [];
    this.gameComplete = false;


    //Add bg
    this.bg = new Kiwi.GameObjects.Sprite(PlayState, PlayState.textures.bg, 0, 0);
    this.addChild(this.bg);


    //Add hint button
    this.hintBtn = new Kiwi.GameObjects.Sprite(PlayState, PlayState.textures.UI_btn, 618, 900);
    this.addChild(this.hintBtn);

    //Add hint icon button
    this.hintIcon = new Kiwi.GameObjects.Sprite(PlayState, PlayState.textures.hint_btn, 618, 900);
    this.addChild(this.hintIcon);


    this.hintBtn.input.onDown.add(this.doHint, this);

    //Add all the hidden objects and their corresponding UI preview images. Give the item random coordinates but inside of the game space.
    this.addHiddenObject('1', Math.random() * 600, Math.random() * 700);
    this.addHiddenObject('2', Math.random() * 600, Math.random() * 700);
    this.addHiddenObject('3', Math.random() * 600, Math.random() * 700);
    this.addHiddenObject('4', Math.random() * 600, Math.random() * 700);
    this.addHiddenObject('5', Math.random() * 600, Math.random() * 700);
}


/**
* This method adds a new hidden object and its preview image onto the game.
* 
* @method addHiddenObject
* @public
* @param objName{String}
* @param objX{Number}
* @param objY{Number}
*/
PlayState.addHiddenObject = function (objName, objX, objY) {

    //Object hidden on the stage
    this['hiddenObject' + objName] = new Kiwi.GameObjects.Sprite(PlayState, PlayState.textures['hidden_' + objName], objX, objY);
    this['hiddenObject' + objName].objName = objName;
    this['hiddenObject' + objName].input.onDown.add(this.clickObject, this);
    this.addChild(this['hiddenObject' + objName]);

    //UI Base of each preview button
    this['UIBase' + objName] = new Kiwi.GameObjects.Sprite(PlayState, PlayState.textures.UI_btn, 110 * this.hiddenObjects.length + 50, 900);
    this.addChild(this['UIBase' + objName])

    //UI preview image
    this['UIButton' + objName] = new Kiwi.GameObjects.Sprite(PlayState, PlayState.textures['UI_' + objName], 110 * this.hiddenObjects.length + 50, 900);
    this.addChild(this['UIButton' + objName]);

    this.hiddenObjects.push(this['hiddenObject' + objName]);
}


/**
* This method scales a hidden object when the user wants a hint of where the a item is.
*
* @method doHint
* @public
*/
PlayState.doHint = function () {
    //if hint is already active, deselect current hint instead
    if (!this.gameComplete) {
        for (var i in this.hiddenObjects) {
            this.hiddenObjects[i].transform.scaleX = 1;
            this.hiddenObjects[i].transform.scaleY = 1;
        }
        
        //get hidden ones, randomize selection and scale.
        var rand = Math.floor(Math.random() * this.hiddenObjects.length);
        if (this.hiddenObjects[rand].visible) {
            this.hiddenObjects[rand].transform.scaleX = 1.5;
            this.hiddenObjects[rand].transform.scaleY = 1.5;
        } else {
            //try aain if the selected one's been found
            this.doHint();
        }
    }
}


/**
* This method removes located object from the background image and UI, for when they have found a image. 
*
* @method clickObject
* @public
* @param hiddenObj{Sprite}
*/
PlayState.clickObject = function (hiddenObj) {
    //remove object and associated UI btn
    hiddenObj.visible = false;
    this['UIButton' + hiddenObj.objName].visible = false;

    //check completion
    var allFound = true;
    for (var i in this.hiddenObjects) {
        if (this.hiddenObjects[i].visible) {
            allFound = false;
        }
    }

    //completion
    if (allFound) {
        this.gameComplete = true;
    }
}