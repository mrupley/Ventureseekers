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
			// number of frames until you update, only draw on update
			if(tick > TICKER){
				this.update();
			}
		}
	}

	instance.update = function() {
		GameModel.addCash();
		tick = 0;
		renderer.render(app.stage);
	}

	instance.saveData = function() {
		GameModel.saveData();
	}

	return instance;
})();
