game = Object.create(Game.prototype);
game.keys = ['UP', 'DWN', 'LEFT', 'RIGHT'];
// for (var i = 0; i < game.keys.length; i++){
  // atom.input.bind(atom.key[game.keys[i]], game.keys[i]);
// };

//Key bindings - start
atom.input.bind(atom.key.UP_ARROW, "UP");
atom.input.bind(atom.key.DOWN_ARROW, "DWN");
atom.input.bind(atom.key.LEFT_ARROW, "LEFT");
atom.input.bind(atom.key.RIGHT_ARROW, "RIGHT");
//Key bindings - end

atom.currentMoleTime = 0;
atom.tillNewMole = 2;
activeLabel = "";
game.update = function(dt) {
  atom.currentMoleTime = atom.currentMoleTime + dt;
  if (atom.currentMoleTime > atom.tillNewMole){
    var tempNum = Math.floor(Math.random()*4);
			//game.activeMole = Math.floor(Math.random()*4);
	game.activeMole = tempNum;
	activeLabel = game.keys[tempNum];
    atom.currentMoleTime = 0;
    if(game.bop.bopped === false){
      game.bop.total = game.bop.total-1;
    }
    else{
      game.bop.bopped = false;
    }
  };
  for (var i = 0; i < game.keys.length; i++){
    if (atom.input.pressed(game.keys[i])){
      game.bop.with_key(game.keys[i]);	  
    }
  };
};
game.bop = {
  bopped: true,
  total:0,
  draw: function(){
	atom.context.fillStyle = '#000';
    atom.context.font = '100px monospace';
    atom.context.fillText('Score: ' + this.total, 300, 200);
	atom.context.font = '75px Arial';
	atom.context.fillStyle = '#65000b';
	atom.context.fillText(activeLabel, 15 , atom.height/2 - 100);
  },
  with_key: function(key){
    if (!!(game.activeMole + 1) === true && key === game.holes[game.activeMole].label){
      this.total = this.total+1;
      game.activeMole = -1;
	  activeLabel = "";
      this.bopped = true;
    }
    else{
      this.total = this.total-1;
    }
  }
}
game.draw = function() {
  this.drawBackground();
  for (var i = 0; i < game.holes.length; i++){
    if (i === game.activeMole){
      game.holes[i].active = true;
    }
    else{
      game.holes[i].active = false;
    };
    game.holes[i].draw();
  }
  this.bop.draw();
};
game.makeHoles = function(labels, xOffset, yOffset){
  game.holes = [];
  for(var i = 0; i < labels.length; i++){
    var newHole = Object.create(game.hole);
    newHole.holeLocation = [xOffset + game.hole.spacing*i, yOffset];
	
    newHole.label = labels[i];
    game.holes.push(newHole);
  };
};
game.drawHoles = function(holeLabels, xOffset, yOffset){
  for(i = 0; i < holeLabels.length; i++){
    atom.context.fillStyle = game.hole.color;
    var holeLocation = [xOffset + game.hole.spacing*i, yOffset];
    game.hole.draw(holeLocation, holeLabels[i]);
  }
};
game.hole = {
  size: 40,
  spacing: 280,
  color: '#311',
  labelOffset: 140,
  labelColor: '#000',
  labelFont: "75px Arial",
  moleOffset: 20,
  draw: function(){
    this.drawHole();
    this.drawLabel();
    if (this.active === true){
      //this.drawMole(this.holeLocation[0], this.holeLocation[1] - this.moleOffset);
	  this.drawHighlight(this.holeLocation[0], this.holeLocation[1]);
	  //this.drawMole(85, atom.height/2 -150);
    };
  },
  drawHole: function(){
    atom.context.fillStyle = this.color;
    atom.context.beginPath(); 
    atom.context.arc(this.holeLocation[0], this.holeLocation[1], this.size, 0, Math.PI*2, false); 
    atom.context.fill();
  },
  drawLabel: function(){
    atom.context.fillStyle = this.labelColor;
    atom.context.font = this.labelFont;
    atom.context.fillText(this.label, this.holeLocation[0] - this.size, this.holeLocation[1] + this.labelOffset);
  },
  drawMole: function(xPosition, yPosition){
    game.mole.draw(xPosition, yPosition);
  },
  drawHighlight: function(xPosition, yPosition){
	game.highlight.draw(xPosition, yPosition);
  }
};
game.drawBackground = function(){
  atom.context.beginPath();
  atom.context.fillStyle = '#003300';
  atom.context.fillRect(0, 0, atom.width, atom.height/2);
  atom.context.fillStyle = '#002649';
  atom.context.fillRect(0, atom.height/2, atom.width, atom.height/2);
  //atom.context.fillStyle = '#191970';
  //atom.context.arc(110, atom.height/2 -30, 90, Math.PI*2, 0);  //old color
  atom.context.fillStyle = '#191970';
  atom.context.fillRect(0, atom.height/2 -200, atom.width/6, atom.height/6);
  atom.context.fill();
  atom.context.fillStyle = '#00a693';
  atom.context.fillRect(14, atom.height/2 -185, atom.width/6 -25, atom.height/6 -25);
  atom.context.fill();
};
game.mole = {
  size: 40,
  color: '#557',
  noseSize: 8,
  noseColor: "#c55",
  eyeSize: 5,
  eyeOffset: 10, 
  eyeColor: "#000",
  draw: function(xPosition, yPosition){
    this.drawHead(xPosition, yPosition);
    this.drawEyes(xPosition, yPosition);
    this.drawNose(xPosition, yPosition);
    this.drawWhiskers(xPosition, yPosition);
  },
  drawHead: function(xPosition, yPosition){
    atom.context.beginPath(); 
    atom.context.fillStyle = this.color;
    atom.context.arc(xPosition, yPosition, this.size, 0, Math.PI*2); 
    atom.context.fill();
  },
  drawNose: function(xPosition, yPosition){
    atom.context.beginPath(); 
    atom.context.fillStyle = this.noseColor;
    atom.context.arc(xPosition, yPosition, this.noseSize, 0, Math.PI*2); 
    atom.context.fill();
  },
  drawEyes: function(xPosition, yPosition){
    atom.context.beginPath(); 
    atom.context.fillStyle = this.eyeColor;
    atom.context.arc(xPosition + this.eyeOffset, yPosition - this.eyeOffset, this.eyeSize, 0, Math.PI*2); 
    atom.context.fill();
    atom.context.beginPath(); 
    atom.context.fillStyle = this.eyeColor;
    atom.context.arc(xPosition - this.eyeOffset, yPosition - this.eyeOffset, this.eyeSize, 0, Math.PI*2); 
    atom.context.fill();
  },
  drawWhiskers: function(xPosition, yPosition){
    atom.context.beginPath(); 
    atom.context.moveTo(xPosition - 10, yPosition); 
    atom.context.lineTo(xPosition - 30, yPosition); 
    atom.context.moveTo(xPosition + 10, yPosition); 
    atom.context.lineTo(xPosition + 30, yPosition); 
    atom.context.moveTo(xPosition - 10, yPosition + 5); 
    atom.context.lineTo(xPosition - 30, yPosition + 10); 
    atom.context.moveTo(xPosition + 10, yPosition + 5); 
    atom.context.lineTo(xPosition + 30, yPosition + 10); 
    atom.context.stroke();
  }
}

game.highlight = {
  size: 25,
  color: '#65000b',
  draw: function(xPosition, yPosition){
	atom.context.beginPath(); 
    atom.context.fillStyle = this.color;
    atom.context.arc(xPosition, yPosition, this.size, 0, Math.PI*2); 
    atom.context.fill();
  }
 };
window.onblur = function() {
  return game.stop();
};
window.onfocus = function() {
  return game.run();
};
game.makeHoles(game.keys, 145, atom.height/2 + 85);
game.run();
