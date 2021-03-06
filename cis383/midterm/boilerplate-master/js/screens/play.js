game.PlayScreen = me.ScreenObject.extend({
	/**
	 *  action to perform on state change
	 */
	onResetEvent: function() {
		me.levelDirector.loadLevel("area01");
		
	me.audio.playTrack("DST-InertExponent");
		
		// reset the score
		game.data.score = 0;

		// add our HUD to the game world
		game.HUD = new game.HUD.Container();
		me.game.world.addChild(game.HUD);
	},


	/**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		// remove the HUD from the game world
		me.audio.stopTrack();
		me.game.world.removeChild(game.HUD);
	}
});
