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
			case venturerImages.WARRIOR:
				return warrior;
			case venturerImages.MAGE:
				return mage;
			case venturerImages.ROGUE:
				return rogue;
		}
	};
}

