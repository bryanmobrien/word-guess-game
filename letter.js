// Call the word.js constuctor.
var Letter = function(guessLetter) {

	this.computerWordLetter = guessLetter;
	this.letterInWord = false;
	// Build the player guess array.
	this.showLetter = function(){
		if(this.letterInWord){
			this.computerWordLetter = guessLetter;
		} else {
			this.computerWordLetter = '_';
		}
		return this.computerWordLetter;
	};

};

module.exports = Letter;