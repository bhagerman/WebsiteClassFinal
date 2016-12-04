
//################Globals
var levelCoinCount=[1, 6, 7, 7, 1]; //NOTE: The value at index 0 is the "reset" value for when the game starts over.
										//var levelCoinCount=[1, 1, 1, 1, 1]; //***debug
var TOTAL_LEVELS=5;
var strlvlName=["tutorial","level1", "level2", "level3", "level4"]; //This is for search purposes
var strlvlNameFrontEnd=["Tutorial","Level 1", "Level 2", "Level 3", "LIVES FRENZY"]; //This is purely for display purposes aka the actual level names to the player
var TOTAL_LIVES=3;
var LEVEL_TO_PLAY; //Designates the current level,
var strCurrentLevelFinished, strCurrentLevelDiedOn; //String thats used to identify the current level's id (name aka strlvlName[])
var currentLives, deathCounter = 0;
var justDied = false;
var isNewGame = false;

//STRINGS:
var str_LEVEL_START = "PRESS START!";
var str_LEVEL = "LEVEL: ";
var str_COINS_COLLECT = "Coins to collect: "
var str_DEATH_COUNT = "Death Count: ";
var str_GOOD_JOB = "GOOD JOB!";
//ENDSTRINGS
//################End Globals
//STAT MANAGING
	var coinManager = new StatManager();
	coinManager["coins"] = 0;
	coinManager["totalCoins"] = levelCoinCount[0];
//STAT MANAGING
	
	
var jsApp = {
  onload: function() {
    if (!me.video.init('jsapp', 320, 240, true, 2.0)) {
      alert("html 5 canvas is not supported by this browser.");
      return;
    }
    me.loader.onload = this.loaded.bind(this);
    me.loader.preload(resources);
    me.state.change(me.state.LOADING);
	
	
   // me.gamestat.add("coins", 0);
   // me.gamestat.add("totalCoins", levelCoinCount[0]);
   
	LEVEL_TO_PLAY = 0; //Designates the current level
	currentLives = TOTAL_LIVES; //set up our starting lives
  },
  loaded: function() {
  //manages stats
	
	//
	
    me.entityPool.add("player", PlayerEntity);
    me.entityPool.add("coin", CoinEntity);
    me.entityPool.add("boots", BootsEntity);
    me.entityPool.add("EnemyEntity", EnemyEntity);
	me.entityPool.add("FlyEnemyEntity", FlyEnemyEntity);
	me.entityPool.add("JumpingEnemyEntity", JumpingEnemyEntity);
	me.entityPool.add("OctoEnemyEntity", OctoEnemyEntity);
	me.entityPool.add("waterfall", WaterfallEntity);
	me.entityPool.add("bonusLife", BonusLifeEntity);
	me.entityPool.add("bonus3Life", Bonus3LifeEntity);
    me.state.set(me.state.PLAY, new PlayScreen());
    me.state.set(me.state.MENU, new TitleScreen());
	me.state.set(me.state.READY, new PreLevelScreen());
	me.state.set(me.state.GAME_END, new PostLevelScreen());
	me.state.set(me.state.CREDITS, new WinScreen());
	    me.state.transition("fade", "#2FA2C2", 250);
    me.state.change(me.state.MENU);

  }
};



window.onReady(function() {
  jsApp.onload();
});
