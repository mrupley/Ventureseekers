var Storage = (function() {
	var instance = {};
	//let itemsArray;
	//itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
	//localStorage.setItem('items', JSON.stringify(itemsArray));
	//const data = JSON.parse(localStorage.getItem('items'));

	//localStorage.clear();

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
			 return 0;
		} 
		return cash;
	}

	instance.loadTimeDifference = function() {
		return Number(new Date().getTime()) - Number(localStorage.sessionTimer);
	}

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
