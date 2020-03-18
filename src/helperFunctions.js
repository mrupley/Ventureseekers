function rotateContainer(container){
	container.rotation += DEGREES_90; 
};

// math helpers for calculations
function getCashRate(index, quantity) {
	return UPGRADE_MULTIPLIER * (index + 1) * quantity;
}

// rounds to dollars and cents
function roundCash(value) {
	return Number(Math.round(value+'e2')+'e-2');
}

function getCharacterName(id) {
	switch(id)
	{
		case venturer.WARRIOR:
			return "WARRIOR";
		case venturer.MAGE:
			return "MAGE";
		case venturer.ROGUE:
			return "ROGUE";

	}
}
