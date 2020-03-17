function rotateContainer(container){
	container.rotation += DEGREES_90; 
};

function getCashRate(index, quantity) {
	return UPGRADE_MULTIPLIER * (index + 1) * quantity;
}
function roundCash(value) {
	return Number(Math.round(value+'e2')+'e-2');
}
