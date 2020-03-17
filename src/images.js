// holds the references for the sprites in the game.
function Images() {
	let id;
	let warrior;
	let mage;
	let rogue;

	this.init = function() {
		id = PIXI.loader.resources["img/animals.json"].textures;
		warrior = id["hedgehog.png"];
		mage = id["cat.png"];
		rogue = id["tiger.png"];
	};

	this.getImage = function(c) {
		switch(c) {
			case venturer.WARRIOR:
				return warrior;
			case venturer.MAGE:
				return mage;
			case venturer.ROGUE:
				return rogue;
		}
	};
}

