// objects used as unique store items
function character(index, amount = 0, manager = false, savedPercent = 0) {
	var id = index;
	const timer = Math.pow(TIMER_MULTIPLIER, id) * 1000; //in ms, calculate once and keep in memory
	var quantity = amount;
	var hasManager = manager;
	var cashRate = getCashRate(id, quantity);
	var currentPieceImage;
	var percent = savedPercent;
	var currentTimer = 0;

	// graphics
	var managerTexture = PIXI.Texture.fromImage("img/managerbutton.png");
	var managerTextureDisabled = PIXI.Texture.fromImage("img/managerbuttondisabled.png");
	var loadingBarTexture = PIXI.Texture.fromImage("img/loading.png"); // 1x1 pixel to save memory
	var loadingBarBackgroundTexture = PIXI.Texture.fromImage("img/loadingbg.png"); // 1x1 pixel saves memory
	var loadingBarBackgroundButton = new PIXI.Sprite(loadingBarBackgroundTexture);
	var loadingBarButton = new PIXI.Sprite(loadingBarTexture);
	var managerButton = new PIXI.Sprite(hasManager ? managerTextureDisabled : managerTexture);
	var quantityText = new PIXI.Text(quantity, { font: 'bold italic 20px Arvo', fill: '#3e1707', align: 'center', stroke: '#a4410e', strokeThickness: 7 });

	currentPieceImage = new PIXI.Sprite(images.getImage(id));
	currentPieceImage.position.set(100 + 100, 100 * id + 150);
	currentPieceImage.interactive = true;
	currentPieceImage.on('mousedown', onIconClicked);
	gameContainer.addChild(currentPieceImage);

	loadingBarBackgroundButton.position.set(100 + 170, 100 * id + 150);
	loadingBarBackgroundButton.interactive = true;
	loadingBarBackgroundButton.scale.x = 100;
	loadingBarBackgroundButton.scale.y = 30;
	loadingBarBackgroundButton.on('mousedown', onLoadingClicked);
	gameContainer.addChild(loadingBarBackgroundButton);

	loadingBarButton.position.set(100 + 170, 100 * id + 153);
	loadingBarBackgroundButton.interactive = true; //false will block all click events on the bar
	loadingBarButton.scale.x = percent;
	loadingBarButton.scale.y = 24;
	gameContainer.addChild(loadingBarButton);

	managerButton.position.set(100 + 220, 100 * id + 180);
	managerButton.interactive = true;
	managerButton.on('mousedown', onManagerClicked);
	gameContainer.addChild(managerButton);

	quantityText.position.set(100 + 165, 100 * id + 190);
	app.stage.addChild(quantityText);

	// getters and setters for a character
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
			return {id: id, quantity: quantity, manager: hasManager, percent: percent };
		},
		cashRate: function() {
			return cashRate;
		},
		idleCash: function(idleTime) {
			return getIdleCash(idleTime);
		},
		timer: function() {
			return calculateTimerPercentage();
		},
		percent: function() {
			return percent;
		}
	};

	// increases the cash between sessions, and restores progress bar to the proper state
	function getIdleCash(idleTime) {
		var value = idleTime / timer;
		if(percent > 0) {
			percent += value % 1;
			currentTimer = new Date().getTime() + (timer * (1 - percent));
		}
		if(hasManager) {
			return Math.floor(value) * cashRate;
		} 
		else {
			if(percent > 1) {
				percent = 1;
			}
		}
		return 0;
	}

	// buy a new character
	function onIconClicked() {
		var cost = 1.07 * quantity * ((id+1) * 12);
		if(GameModel.removeCash(cost)) {
			addQuantity(1);
			quantityText.text = quantity;
			GameModel.calculateRate();
		}
	}
	
	// purchase the manager
	function onManagerClicked() {
		if(!hasManager && GameModel.removeCash((id+1)*48)) {
			hasManager = true;
			GameModel.calculateRate();
			managerButton.texture = managerTextureDisabled;
		}
	}

	function addQuantity(amount) {
		quantity += amount;
		cashRate = getCashRate(id, quantity);
	}

	// click on the loading bar to start progress
	function onLoadingClicked() {
		if(currentTimer == 0 && quantity > 0) {
			// start a new progress
			currentTimer = new Date().getTime() + timer;
		}
	}

	// calculates the percentage to fill the bar based on time clicked versus now
	function calculateTimerPercentage() {
		if(hasManager) {
			// call an auto-update on progress if needed
			onLoadingClicked();
		}
		
		// active progress in session
		if(currentTimer > 0) {
			percent = (timer - (currentTimer - new Date().getTime())) / timer;
		}
		// the bar is full, reset and update
		if(percent >= 1){
			currentTimer = 0;
			percent = 0;
			return true; //update cash
		}

		loadingBarButton.scale.x = 100 * percent;
		return false; //do not update cash
	}
}
