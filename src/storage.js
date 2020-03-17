var Storage = (function() {
	var instance = {};
	let itemsArray;
	itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
	localStorage.setItem('items', JSON.stringify(itemsArray));
	const data = JSON.parse(localStorage.getItem('items'));

	instance.saveToStorage = function() {
		if (localStorage.liquidCash) {
			localStorage.liquidCash = Number(localStorage.liquidCash) + 1;
		} else {
			localStorage.liquidCash = 1;
		}
		localStorage.clear();
	}

	instance.loadCharacterFromStorage = function(item) {
		var characterArray = JSON.parse(localStorage.getItem(item));
		if(characterArray) {
			console.log("ITEM: " + characterArray);
			return character(character.id, character.quantity, character.manager);
		}
		return 0;
	}

	instance.saveData = function(cash, characters) {
		localStorage.liquidCash = cash;
		characters.forEach(character => localStorage.setItem( character.id(), JSON.stringify(character.toJSON()) ));
		this.toString();	
	}
	
	instance.toString = function() {
		console.log(localStorage);
	}

	return instance;
})();
