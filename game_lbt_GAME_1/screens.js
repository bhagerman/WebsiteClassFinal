var PlayScreen = me.ScreenObject.extend({
  onDestroyEvent: function() {
    //me.gamestat.reset("coins");
	//me.gamestat.reset("totalCoins");
	coinManager["coins"] = 0;
	coinManager["totalCoins"] = levelCoinCount[0];
  },
  onResetEvent: function() {
	if (LEVEL_TO_PLAY === 0) //If the game just started.
	{
		me.levelDirector.loadLevel("tutorial");
		//me.levelDirector.loadLevel("level3"); //DEBUG

	}
	else
	{
		//LEVEL_TO_PLAY = str name of level...to find str name of level must have a variable that keeps track of which level is loaded.
		me.levelDirector.loadLevel(strlvlName[LEVEL_TO_PLAY]);
		
	}
	if (isNewGame === true) {currentLives = TOTAL_LIVES; isNewGame = false;}	//Resets life counter upon new game
	
    me.input.bindKey(me.input.KEY.LEFT, "left");
    me.input.bindKey(me.input.KEY.RIGHT, "right");
	me.input.bindKey(me.input.KEY.UP, "up");
	me.input.bindKey(me.input.KEY.DOWN, "down");
	
	document.getElementById('life_count').innerHTML = currentLives + " life(s) left.";
    document.getElementById('game_state').innerHTML = "Collect all of the coins!";
    document.getElementById('instructions').innerHTML = "Arrows to move and Space to jump.";
  }
});
var TitleScreen = me.ScreenObject.extend({
  init: function() {
    this.parent(true);
    me.input.bindKey(me.input.KEY.SPACE, "jump", true);
  },
  onResetEvent: function() {
    if (this.title == null) {
      this.title = me.loader.getImage("titleScreen");
	  document.getElementById('life_count').innerHTML = "";
      document.getElementById('game_state').innerHTML = "";
      document.getElementById('instructions').innerHTML = ""; 

    }
  },
  update: function() {
    if (me.input.isKeyPressed('jump')) {
      me.state.change(me.state.READY); //Modify this to go to our prelevel
    }
    return true;
  },
  draw: function(context){
    me.video.clearSurface (context, "white"); //turn to black.
    context.drawImage(this.title, 22, 50);
	
  }
});
var PreLevelScreen = me.ScreenObject.extend({
  init: function() {
    this.parent(true);
    me.input.bindKey(me.input.KEY.SPACE, "jump", true);
  },
  onResetEvent: function() {
    if (this.title == null) {
	  //this.title = me.loader.getImage("scrnlvl_1");
	  document.getElementById('life_count').innerHTML = currentLives + " life(s) left.";
      document.getElementById('game_state').innerHTML = "this is the prelevelscreen";
      document.getElementById('instructions').innerHTML = ""; 
    }
	if (justDied === true) 
	{
	 deathCounter += 1;
	 currentLives -= 1; 
	 justDied = false;
	var lvlStr = strCurrentLevelDiedOn;
	var tcoinCnt, lvlName;
	var lvlCnt = -1;

		for(i=0; i<strlvlName.length;i++) //sequential search to find the level's string that matches the level-we-died-on's string name.
		{
			if(lvlStr === strlvlName[i])
			{
				lvlCnt = i;
				break;
			}
		}
		 lvlName=strlvlNameFrontEnd[lvlCnt]; //Set level name for display
		 //tcoinCnt=levelCoinCount[lvlCnt]; //Set total coin count for nxt lvl
		 //me.gamestat.reset("coins"); //reset collected coins
		 //me.gamestat.setValue("totalCoins", levelCoinCount[lvlCnt]); //Sets total coins required to the amount of the level we just died on. (elminates incosistiencies)
		 coinManager["coins"] = 0;
		coinManager["totalCoins"] = levelCoinCount[lvlCnt];
	 }
  },
  onDestroyEvent: function() {
	;this.txtLevel = null;
	;this.txtLevelNum = null;
	;this.txtCoinColl = null;
  
  },
  update: function() {
    if (me.input.isKeyPressed('jump')) {
      me.state.change(me.state.PLAY);
    }
    return true;
  },
  draw: function(context){

	this.txtLevel = new me.Font('Comic Sans', 30, 'gray');
	this.txtLevelNum = new me.Font('Comic Sans', 22, 'red');
	this.txtCoinColl = new me.Font('Comic Sans', 18, 'white');
	
	me.video.clearSurface (context, "black"); //turn to black.

	//Declare strings to display:
	var strLevelNum = strlvlNameFrontEnd[LEVEL_TO_PLAY];
	var strCoinColl = str_COINS_COLLECT + levelCoinCount[LEVEL_TO_PLAY];
	
	
      width_txtLevel = this.txtLevel.measureText(context,str_LEVEL_START).width;
	  width_txtLevelNum = this.txtLevelNum.measureText(context, strLevelNum).width; 
	  width_txtCoinColl = this.txtCoinColl.measureText(context, strCoinColl).width;

      // draw our text 

      this.txtLevel.draw(context, str_LEVEL_START, ((me.video.getWidth() - width_txtLevel) / 2),  (me.video.getHeight() - 50));	
      this.txtLevelNum.draw(context, strLevelNum, ((me.video.getWidth() - width_txtLevelNum) / 2),  (me.video.getHeight() - 210));	
	  this.txtCoinColl.draw(context, strCoinColl, ((me.video.getWidth() - width_txtCoinColl) / 2),  (me.video.getHeight() - 120));		  
                    				
		this.txtLevel.bold();
  }
});
var WinScreen = me.ScreenObject.extend({
  init: function() {
    this.parent(true);
    me.input.bindKey(me.input.KEY.SPACE, "jump", true);
  },
  onResetEvent: function() {
    if (this.title == null) {
      this.title = me.loader.getImage("scrnWin");
	  document.getElementById('life_count').innerHTML = currentLives + " live(s) left.";
      document.getElementById('game_state').innerHTML = "*****YOU WON!*****";
      document.getElementById('instructions').innerHTML = "*CONGRATULATIONS*"; 

    }
  },
  update: function() {
    if (me.input.isKeyPressed('jump')) 
	{
	LEVEL_TO_PLAY = 0;
	currentlives = TOTAL_LIVES;
	isNewGame = true;
	me.state.change(me.state.MENU);
	document.getElementById('life_count').innerHTML = "";
    }
    return true;
  },
  draw: function(context){
    me.video.clearSurface (context, "white"); //turn to black.
    context.drawImage(this.title, 22, 50);
  }
});
var PostLevelScreen = me.ScreenObject.extend({

  init: function() {
    this.parent(true);
    me.input.bindKey(me.input.KEY.SPACE, "jump", true);
  },
  onResetEvent: function() {
    if (this.title == null) {
      this.title = me.loader.getImage("scrnlvl_2");
	  document.getElementById('life_count').innerHTML = currentLives + " life(s) left.";
      document.getElementById('game_state').innerHTML = "this is the post level screen";
      document.getElementById('instructions').innerHTML = ""; 
    }
	var lvlStr = strCurrentLevelFinished;
	var tcoinCnt, lvlName;
	var lvlCnt = -1;

		for(i=0; i<strlvlName.length;i++) //sequential search to find the level's string that matches the level-we-just-finished's string name.
		{
			if(lvlStr === strlvlName[i])
			{
				lvlCnt = i;
				break;
			}
		}
		 lvlName=strlvlNameFrontEnd[lvlCnt]; //Set level name for display
		 //tcoinCnt=levelCoinCount[lvlCnt+1]; //Set total coin count for nxt lvl
		if(lvlCnt != TOTAL_LEVELS -1) //If we're not out of levels
		{
			LEVEL_TO_PLAY = lvlCnt+1; //set the next level to be played
			if (LEVEL_TO_PLAY >= TOTAL_LEVELS) //If there are no more levels
				{
				 obj.youWin();
				}
		 //me.levelDirector.nextLevel(); //go  to next level [this is now managed in the screens.js]
		 ////window.alert(lvlName + ' Complete!'); //Change this to have screens in the future
		 //me.gamestat.reset("coins"); //reset collected coins
		 //me.gamestat.setValue("totalCoins", levelCoinCount[lvlCnt+1]); //Needs to be +1 because the switch returns at the end of level 1. (This call preps to play lvl2 etc)
		 	coinManager["coins"] = 0;
	coinManager["totalCoins"] = levelCoinCount[lvlCnt+1];
		}
		else
		{
		  me.state.change(me.state.CREDITS);
		}
  },
    onDestroyEvent: function() {
	;this.txtLevel = null;
	;this.txtLevelNum = null;
	;this.txtCoinColl = null;
  
  },
  update: function() {
    if (me.input.isKeyPressed('jump')) {
      me.state.change(me.state.READY);
    }
    return true;
  },
  draw: function(context){
    //txtLevel = "PRESS START"
	this.txtLevel = new me.Font('Comic Sans', 30, 'gray');
	
	this.txtGoodJob = new me.Font('Comic Sans', 30, 'orange');
	this.txtDeathCount = new me.Font('Comic Sans', 18, 'white');
	
	me.video.clearSurface (context, "black"); //turn to black.

	//Declare strings to display:
	var strGoodJob = str_GOOD_JOB;
	var strDeathCount = str_DEATH_COUNT + deathCounter;
	
	
      width_txtLevel = this.txtLevel.measureText(context,str_LEVEL_START).width;
	  width_txtGoodJob = this.txtGoodJob.measureText(context, strGoodJob).width; 
	  width_txtDeathCount = this.txtDeathCount.measureText(context, strDeathCount).width;

      // draw our text 

      this.txtLevel.draw(context, str_LEVEL_START, ((me.video.getWidth() - width_txtLevel) / 2),  (me.video.getHeight() - 50));	
      this.txtGoodJob.draw(context, strGoodJob, ((me.video.getWidth() - width_txtGoodJob) / 2),  (me.video.getHeight() - 160));	
	  this.txtDeathCount.draw(context, strDeathCount, ((me.video.getWidth() - width_txtDeathCount) / 2),  (me.video.getHeight() - 120));		  
                    				
		this.txtLevel.bold();
  
  }
  
  	
		 
});
