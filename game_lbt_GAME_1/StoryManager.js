//Goal: Create a system for easy story narrative.
//Design constraints:
// #1: Must create a box for the text.
// #2: Must display new words depending on story progression.
// #3: Must behave appropriately when on different levels etc.
// #4: Contains the actual story

function StoryManager(GLOBAL)
{
	this.created = true;
	this.storyProgression = "";
	this.storyStage = "";
	this.speakingActor = "";
};



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