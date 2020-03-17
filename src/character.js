// objects used as unique store items
function character(index, amount = 0, manager = false) {
	var id = index;
	var quantity = amount;
	var hasManager = manager;

	function addQuantity(amount) {
		quantity += amount;
	}
	function setManager(manager){
		hasManager = manager;
	}

	return {
		quantity: function() {
			return quantity;
		},
		manager: function() {
			return hasManager;
		},
		id: function() {
			return id;
		},
		toJSON: function() {
			return {id: id, quantity: quantity, manager: hasManager };
		}
	};
}
