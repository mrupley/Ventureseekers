// Handles state interactions
var GameController = (function() {
	var instance = {};
	var tick = 0;
	var state = states.NONE;

	instance.getState = function() {
		return state;
	}

	instance.init = function() {
		GameModel.init();
		state = states.GAME;
	}

	instance.loop = function(delta) {
		if(state == states.GAME) {
			tick += delta;
			if(tick > TICKER){
				this.update();
			}
		}
	}

	instance.update = function() {
		GameModel.addCash(tick);
		tick = 0;
		GameModel.saveData();
	}

	instance.saveData = function() {
		GameModel.saveData();
	}

	return instance;
})();
