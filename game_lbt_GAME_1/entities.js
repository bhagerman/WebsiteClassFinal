var PlayerEntity = me.ObjectEntity.extend({
  init: function(x, y, settings) {
    this.parent(x, y, settings);
    me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
    this.setVelocity(1, 12);
	this.setMaxVelocity(3, 12);

	this.gravity = .98
  },
  update: function() {
  //if (this.onLadder){this.doWalk(true);}
  //me.debug.renderHitBox = true;
  //this.updateColRect(-1, -1, 0, 16); //change the collision because 9.9 melon sucks
   if (me.input.isKeyPressed('up')) //ladder code
{
	
	this.doClimb(true);
	//this.gravity += .1;
	//me.game.viewport.reset();
	//me.game.viewport.move(5, 1);
}
else if (me.input.isKeyPressed('down')) //downladder code
{
	
    //this.gravity -= .1;
	this.doClimb(false);
	//me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
}
	
	if (me.input.isKeyPressed('left')) { this.doWalk(true); } 
    else if (me.input.isKeyPressed('right')) { this.doWalk(false); } 
    else { this.vel.x = 0; };
    if (me.input.isKeyPressed('jump') ) { this.doJump(); }
    me.game.collide(this);
    this.updateMovement();
    
	//OUT OF BOUNDS CODE
	if (LEVEL_TO_PLAY != 4) //Level 4 is a vertical level
	{
		if (this.bottom > 490)
		{ 
		
			this.gameOver(); 
		
		
		} //out of bounds checker
    }
	//END OUT OF BOUNDS CODE
	if (this.vel.x!=0 || this.vel.y!=0) {
      this.parent(this);
      return true;
    }
    return false;
  },
  gameOver: function() {
	if (currentLives > 0)
	{
	justDied = true;
	strCurrentLevelDiedOn = me.levelDirector.getCurrentLevelId(); //get the level we just died on
     me.state.change(me.state.READY);
	}
	else
	{
	LEVEL_TO_PLAY = 0;
	deathCounter = 0;
	 currentlives = TOTAL_LIVES;
	 isNewGame = true;
	 me.state.change(me.state.MENU);
	 document.getElementById('life_count').innerHTML = "";
	 //me.gamestat.reset("coins"); //reset collected coins & total coins to their default values
	 //me.gamestat.reset("totalCoins");
	 coinManager["coins"] = 0;
	coinManager["totalCoins"] = levelCoinCount[0];

	}
  },
  youWin: function() {
    LEVEL_TO_PLAY = 0;
    deathCounter = 0;
    currentlives = TOTAL_LIVES;
	isNewGame = true;
    me.state.change(me.state.MENU);
    document.getElementById('game_state').innerHTML = "You Win!";
    document.getElementById('instructions').innerHTML = "";
	//me.gamestat.reset("coins"); //reset collected coins & total coins to their default values
	//me.gamestat.reset("totalCoins");
		coinManager["coins"] = 0;
	coinManager["totalCoins"] = levelCoinCount[0];
	
  }
});
var CoinEntity = me.CollectableEntity.extend({
  init: function(x, y, settings) {
    this.parent(x, y, settings);
  },
  onCollision : function (res, obj) {
    //me.gamestat.updateValue("coins", 1);
	coinManager["coins"] += 1;
    this.collidable = false;
    me.game.remove(this);
    if(coinManager["coins"] === coinManager["totalCoins"]){ //If player collects all coins in a level	
		//make screen object change.
		 		// switch (lvlStr)		//Switch to check for what levelname gets returned ##The first value is "level1"
		// {
		// case strlvlName[0]: //lvl1
		  // lvlCnt=0;
		  // break;
		// case strlvlName[1]: //lvl2
		  // lvlCnt=1;
		  // break;
		// case strlvlName[2]: //lvl3
		  // lvlCnt=2;
		  // break;
		// default:
		  // lvlCnt=0; //there should probably be a better error-resolution here
		// }
		strCurrentLevelFinished = me.levelDirector.getCurrentLevelId(); //assign the level id to the global string
		me.state.change(me.state.GAME_END);
	}
  }
}); 
var EnemyEntity = me.ObjectEntity.extend({
  init: function(x, y, settings) {
    settings.image = "badguy";
    settings.spritewidth = 16;
    this.parent(x, y, settings);
    this.startX = x;
    this.endX = x + settings.width - settings.spritewidth;
    this.pos.x = this.endX;
    this.walkLeft = true;
    this.setVelocity(1.5);
    this.collidable = true;
	
  },
  onCollision: function(res, obj) {
    obj.gameOver();
  },
  update: function() {
    if (!this.visible){
      return false;
    }
    if (this.alive) {
      if (this.walkLeft && this.pos.x <= this.startX) {
        this.walkLeft = false;
      } 
      else if (!this.walkLeft && this.pos.x >= this.endX){ 
        this.walkLeft = true;
      }
      this.doWalk(this.walkLeft);
    }
    else { this.vel.x = 0; }
    this.updateMovement();
    if (this.vel.x!=0 || this.vel.y!=0) {
      this.parent(this);
      return true;
    }
    return false;
  }
});
var FlyEnemyEntity = me.ObjectEntity.extend({
  init: function(x, y, settings) {
    settings.image = "player";
    settings.spritewidth = 16;
    this.parent(x, y, settings);
    this.startX = x;
    this.endX = x + settings.width - settings.spritewidth;
    this.pos.x = this.endX;
    this.walkLeft = true;
    this.setVelocity(2);
    this.collidable = true;
	this.gravity = 0
  },
  onCollision: function(res, obj) {
    obj.gameOver();
  },
  update: function() {
    if (!this.visible){
      return false;
    }
    if (this.alive) {
      if (this.walkLeft && this.pos.x <= this.startX) {
        this.walkLeft = false;
      } 
      else if (!this.walkLeft && this.pos.x >= this.endX){ 
        this.walkLeft = true;
      }
      this.doWalk(this.walkLeft);
    }
    else { this.vel.x = 0; }
    this.updateMovement();
    if (this.vel.x!=0 || this.vel.y!=0) {
      this.parent(this);
      return true;
    }
    return false;
  }
});
var JumpingEnemyEntity = me.ObjectEntity.extend({
  init: function(x, y, settings) {
    settings.image = "jumper";
    settings.spritewidth = 16;
    this.parent(x, y, settings);
    this.startX = x;
    this.endX = x + settings.width - settings.spritewidth;
    this.pos.x = this.endX;
    this.walkLeft = true;
    this.setVelocity(1);
    this.collidable = true;
	//this.gravity = 0;
	
  },
  onCollision: function(res, obj) {
    obj.gameOver();
  },
	update: function() {
		if (!this.visible){
		  return false;
		}
		if (this.alive) {
		  if (this.walkLeft && this.pos.x <= this.startX) {
			this.walkLeft = false;
		  } 
		  else if (!this.walkLeft && this.pos.x >= this.endX){ 
			this.walkLeft = true;
			
		  }
		  this.doWalk(this.walkLeft);
		}
		else { this.vel.x = 0; }
		this.updateMovement();
		if (this.vel.x!=0 || this.vel.y!=0) {
		  this.parent(this);
		  return true;
		}
		return false;
		}
});
var OctoEnemyEntity = me.ObjectEntity.extend({
  init: function(x, y, settings) {
    settings.image = "octo";
    settings.spritewidth = 16;
    this.parent(x, y, settings);
    this.startX = x;
    this.endX = x + settings.width - settings.spritewidth;
    this.pos.x = this.endX;
    this.walkLeft = true;
    this.setVelocity(0.5);
    this.collidable = true;
	
  },
  onCollision: function(res, obj) {
    obj.gameOver();
  },
  update: function() {
    if (!this.visible){
      return false;
    }
    if (this.alive) {
      if (this.walkLeft && this.pos.x <= this.startX) {
        this.walkLeft = false;
      } 
      else if (!this.walkLeft && this.pos.x >= this.endX){ 
        this.walkLeft = true;
      }
      this.doWalk(this.walkLeft);
    }
    else { this.vel.x = 0; }
    this.updateMovement();
    if (this.vel.x!=0 || this.vel.y!=0) {
      this.parent(this);
      return true;
    }
    return false;
  }
});

var WaterfallEntity = me.ObjectEntity.extend({
    init: function(x, y, settings) {
    this.parent(x, y, settings);
	}
});

//PowerUps
var BootsEntity = me.CollectableEntity.extend({
  init: function(x, y, settings) {
    this.parent(x, y, settings);
  },
  onCollision : function (res, obj) {
    this.collidable = false;
    me.game.remove(this);
    obj.gravity = obj.gravity/1.5;
  }
});

var BonusLifeEntity = me.CollectableEntity.extend({
  init: function(x, y, settings) {
    this.parent(x, y, settings);
  },
  onCollision : function (res, obj) {
    this.collidable = false;
    me.game.remove(this);
    ++currentLives;
	document.getElementById('life_count').innerHTML = currentLives + " life(s) left.";
  }
});

var Bonus3LifeEntity = me.CollectableEntity.extend({
  init: function(x, y, settings) {
    this.parent(x, y, settings);
  },
  onCollision : function (res, obj) {
    this.collidable = false;
    me.game.remove(this);
    currentLives += 3;
	document.getElementById('life_count').innerHTML = currentLives + " life(s) left.";
  }
});