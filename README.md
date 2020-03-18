# Ventureseekers
## Hire Venturers to loot the dungeon, bringing the profits back to you!

### Features:
**Hire warriors, mages, and rogues to do the dirty work for you, bringing back the spoils!**
**Hire a manager to keep the Venturers fed and well rested so you can take a break!**
**Work happens around the clock, so expect to see a nice pile of gold waiting for your return!**

### Problems:
- Build an extendible code base, leaving room for adding new features and characters
	- New characters take 1 image and only a couple lines of code to implement
- Store and load the state 
	- I used local storage to store character objects and cash
	- progress can be calculated from this
- Create a loading screen
- Add managers to continuously do the work without any input
	- I used a manager flag to control the state
	- extra progress only calculated if a manager exists

### Front end focused 
- emphasis on UI layout and quick implementation of features
- Model-View-Controller architecture
	- Player controls through the controller using the visible view
	- Only the Model can communicate with local storage or hypothetical server storage
- Character object / class
	- keep the logic within the class, the character will handle all of its operations
	- extensible structure through subclassing, add new traits to the subclasses

### Tradeoffs
	- no server backend, only local storage
	- Math and logic lives in the character class instead of being handled as a constant elsewhere
	- UI elements exist in the character class, making the character class a model and view
		- does not follow MVP strictly, but has only the single responsibility of a single character
	- More time would have been spend on UI names, more characters, and a new feature
		- I wanted to add in a spawner class to create more of another characters at a slow rate
	- More time could have been spent organizing assets into a single sprite sheet instead of only a few
	- The game balance is too linear, making the difficulty curve too easy and lowering retention

### LINKS
Github:
https://github.com/mrupley/Ventureseekers

Github URL:
https://mrupley.github.io/Ventureseekers/

