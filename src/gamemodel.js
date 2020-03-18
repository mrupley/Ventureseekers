var GameModel = (function () {
	var instance = {};
	var cash = 0;
	var cashRate = 0;
	let characters;

	instance.init = function() {
		characters = [];
		Object.keys(venturer).forEach(this.loadCharacter);
		this.calculateRate();
		cash = Storage.loadCash();
		var idleTime = Storage.loadTimeDifference();
		characters.forEach(character => {
			cash += character.idleCash(idleTime);
		});
	}
	instance.save = function() {
		Storage.saveToStorage();
	}

	instance.calculateRate = function() {
		mCashRate = 0;
		characters.forEach(character => {
			if(character.manager()) {
				mCashRate += character.cashRate();
			}
		});
		cashRate = mCashRate;
	}
	instance.loadCharacter = function(item, index) {
		var unit = Storage.loadCharacterFromStorage(index);
		// character not in storage, create a default
		if(unit == null) {
			unit = character(index);
		}
		characters.push(unit);
	} 

	instance.saveData = function() {
		Storage.saveData(cash, characters);
	}

	instance.removeCash = function(amount) {
		if(amount > cash) {
			return false;
		}
		cash -= amount;
		return true;
	}

	instance.toString = function() {
		console.log("cash: " + cash);
		characters.forEach(character => console.log("id: " + character.id() + " quantity: " + character.quantity() + " manager: " + character.manager() + " percent: " + character.percent()));
	}

	instance.addCash = function() {
		cashText.text = "Cash: $" + roundCash(cash);
		characters.forEach(character => {
			if(character.timer()) {
				cash += character.cashRate();
			}
		});
	}

	return instance;
})();


