// objects used as unique store items
function character(index, amount = 0, manager = false) {
	var id = index;
	var quantity = amount;
	var hasManager = manager;
	var cashRate = getCashRate(id, quantity);
	var currentPieceImage;
	var managerTexture = PIXI.Texture.fromImage("img/managerbutton.png");
	var managerTextureDisabled = PIXI.Texture.fromImage("img/managerbuttondisabled.png");
	var managerButton = new PIXI.Sprite(hasManager ? managerTextureDisabled : managerTexture);
	var quantityText = new PIXI.Text(quantity, { font: 'bold italic 20px Arvo', fill: '#3e1707', align: 'center', stroke: '#a4410e', strokeThickness: 7 });

	currentPieceImage = new PIXI.Sprite(images.getImage(id));
	currentPieceImage.position.set(100 + 100, 100 * id + 150);
	currentPieceImage.interactive = true;
	currentPieceImage.on('mousedown', onIconClicked);
	gameContainer.addChild(currentPieceImage);

	managerButton.position.set(100 + 200, 100 * id + 180);
	managerButton.interactive = true;
	managerButton.on('mousedown', onManagerClicked);
	gameContainer.addChild(managerButton);

	quantityText.position.set(100 + 165, 100 * id + 190);
	app.stage.addChild(quantityText);

	return {
		addQuantity: function(amount) {
			addQuantity(amount);
		},
		setManager: function(manager) {
			hasManager = manager;
		},
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
		},
		cashRate: function() {
			return cashRate;
		}
	};

	function onIconClicked() {
		addQuantity(1);
		quantityText.text = quantity;
		GameModel.calculateRate();
	}

	function onManagerClicked() {
		hasManager = true;
		GameModel.calculateRate();
		managerButton.texture = managerTextureDisabled;
	}

	function addQuantity(amount) {
		quantity += amount;
		cashRate = getCashRate(id, quantity);
	}
}
