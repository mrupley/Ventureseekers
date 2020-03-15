'use strict';
// controls the loading of the game
function loadDefaultGame() {
	var assets = [
		"img/bg.png",
		"img/animals.json",
	];

	var loader = PIXI.loader;
	loader.add(assets);

	setup();

	// create a text object that will be updated...
	var loadingText = new PIXI.Text('Loading: 0%', { font: 'bold italic 60px Arvo', fill: '#3e1707', align: 'center', stroke: '#a4410e', strokeThickness: 7 });

	loadingText.position.x = windowWidth / 3;
	loadingText.position.y = windowHeight / 3;	
	app.stage.addChild(loadingText);

	// listen to the progress event
	loader.on('progress',function (loader,res) {
		// update the text with a new string
		loadingText.text = 'Loading: ' + loader.progress + '%';
		renderer.render(app.stage);
	})
	// listen to the complete event, it will be fired when everything is loaded
	loader.on('complete',function (loader,res) {
		// clean up loading
		app.stage.removeChild(loadingText);
		loadingText = null;

		startGame();
	});

	// start loading
	loader.load();
}
let windowWidth;
let windowHeight;
function setup() {
	//var css = document.getElementById('main');
	windowWidth = 1280;//window.getComputedStyle(css).width;
	windowHeight = 720;//window.getComputedStyle(css).height;

	renderer.view.style.width = windowWidth + "px";
	renderer.view.style.height = windowHeight + "px";
	renderer.resize(windowWidth,windowHeight);
}

let images;
//This `setup` function will run when the images have loaded
function startGame(width, height) {
	images = new Images();
	images.init();
	var bg = new PIXI.Sprite(PIXI.loader.resources["img/bg.png"].texture);
	bg.scale.x = windowWidth;
	bg.scale.y = windowHeight;
	//this part resizes the canvas but keeps ratio the same
	renderer.view.style.width = windowWidth + "px";
	renderer.view.style.height = windowHeight + "px";
	renderer.resize(windowWidth,windowHeight);

	app.stage.addChild(bg);
	app.stage.addChild(gameContainer);
	Game.init();
	renderer.render(app.stage);
	app.ticker.add(delta => Game.loop(delta));
};
