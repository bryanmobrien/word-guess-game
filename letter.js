// Call the word.js constuctor.
var Letter = function(guessLetter) {

	this.computerWordLetter = guessLetter;
	this.letterInWord = false;
	// Build the array from which the user will guess.
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