var Storage = (function() {
	var instance = {};

	//localStorage.clear(); // force game reset

	instance.loadCharacterFromStorage = function(item) {
		var characterArray = JSON.parse(localStorage.getItem(item));
		if(characterArray) {
			return character(characterArray.id, characterArray.quantity, characterArray.manager, characterArray.percent);
		}
		return null;
	}

	instance.loadCash = function() {
		var cash = Number(localStorage.liquidCash);

		// no data stored, return default
		if(Number.isNaN(cash)) {
			 return 12; // player has minimum to buy something to prevent soft lock
		} 
		return cash;
	}
	
	// time (in ms) since the last session ended
	instance.loadTimeDifference = function() {
		return Number(new Date().getTime()) - Number(localStorage.sessionTimer);
	}

	// save the game state
	instance.saveData = function(cash, characters) {
		localStorage.liquidCash = cash;
		characters.forEach(character => localStorage.setItem( character.id(), JSON.stringify(character.toJSON()) ));
		localStorage.sessionTimer = new Date().getTime();
	}

	instance.toString = function() {
		console.log(localStorage);
	}

	return instance;
})();
