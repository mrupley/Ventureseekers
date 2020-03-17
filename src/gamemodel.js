var GameModel = (function () {
	var instance = {};
	var cash = 0;
	let characters;

	instance.init = function() {
		characters = [];
		Object.keys(venturer).forEach(this.loadCharacter);
	}
	instance.save = function() {
		Storage.saveToStorage();
	}

	instance.loadCharacter = function(item, index) {
		var unit = Storage.loadCharacterFromStorage(index);

		// character not in storage, create a default
		if(unit == 0) {
			unit = character(index);
		}

		characters.push(unit);
	} 

	instance.saveData = function() {
		Storage.saveData(cash, characters);
	}

	instance.toString = function() {
		console.log("cash: " + cash);
		characters.forEach(character => console.log("id: " + character.id() + " quantity: " + character.quantity() + " manager: " + character.manager()));
	}

	instance.addCash = function(newCash) {
		cash += newCash;
	}

	return instance;
})();


