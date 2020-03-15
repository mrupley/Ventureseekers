// Handles state interactions from the mouse
var Game = (function() {
	var instance = {};
	var tick = 0;
	var state = states.NONE;

	instance.getState = function() {
		return state;
	}

	instance.init = function() {
		GameController.init();
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
		tick = 0;
	}

	return instance;
})();
