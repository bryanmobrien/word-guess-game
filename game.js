// NPM Packages
var clear = require('clear');
var prompt = require('prompt');
var S = require('string');
var randomWords = require('random-words');
// Call the word.js constuctor.
var Word = require('./word.js')

prompt.start;

// Game.js constructor
var Game = function(){
	this.guessCounter = 10;
	// playerGuesses = [],
	// this.playerName = playerName;
	this.wins = 0;
	this.loses = 0;
	this.playerName = '';
	this.gameQuestion = ', do you want to play Hangman?'
	this.gameStatus = '';

	var self = this;

	// Greeting Function
	this.greeting = function() {
		clear();
		console.log("What is your name?");
		prompt.get(['playerName'], function(error, result){
			if(result.playerName == '') {
				self.greeting();
			} else {
				self.playerName = S(result.playerName).capitalize().s;
				clear();
				console.log("Welcome "+self.playerName+" To The Game Of Hangman");
				// console.log("A fun way to waste sometime");
				console.log('');
				self.playHangman();
			}
		});
	};

	// Check to see player wants Hangman
	this.playHangman = function() {
		// console.log(this.gameStatus);
		console.log(this.playerName + this.gameQuestion);
		prompt.get(['play'], function(error, result){
			this.play = S(result.play).capitalize().s;
			switch(this.play) {
			    case 'Y':
			    	clear();
					self.initGame();		    	
			        break;
			    case 'N':
			        console.log('');
			        console.log('Maybe another time '+self.playerName+'. Goodbye');
			        break;
			    default:
			    	clear();
			        self.playHangman(); 
			}
		});	
	};		

	// Reset Guess Counter
	this.resetGuessCounter = function(){
		this.guessCounter = 10;
	};

	// Get Word To Guess
	this.getComputerWord = function(){
		this.computerWord = randomWords();
	};

	// Initialize Game 
	this.initGame = function(){
		this.resetGuessCounter();
		this.getComputerWord();
		this.newWord = new Word(this.computerWord);
		this.newWord.getLettersInWord();
		this.newWord.showPlayerWord();
		this.nextGuess();
	};

	// Process Player Guesses
	this.nextGuess = function(){
		// Screen layout
		clear();
		// console.log(self.newWord.computerWord);
		console.log('Wins: '+this.wins+' Losses: '+this.loses);
		console.log('The word to guess is: '+ self.newWord.playerWord);
		console.log('Letters Guessed: '+self.newWord.playerGuesses);
		console.log('Guess #: '+self.guessCounter);
		console.log('');
		console.log(self.playerName+', what is your next guess?');
		// Prompt Player For Guess
		prompt.get(['letterGuess'], function(error, result){
			self.playerGuess = result.letterGuess.toLowerCase();
			// Verify player entered letter.
			if(!S(result.letterGuess.toLowerCase()).isAlpha()){
				self.nextGuess();
			}
			// Verify player only entered one letter
			if(self.playerGuess.length > 1) {
				self.nextGuess();
			}
			// Check letter in guess word.
			self.newWord.checkLetter(self.playerGuess);
			// Check to see player has enter letter previously. If not update letters guessed, remaining quess counter, and letter in guess word.
			if(!self.newWord.duplicateLetter){
				self.newWord.showPlayerWord();
				self.guessCounter--;
				
			}
			// Check to see if player has guesses all letters in quess word.
			self.newWord.checkWord();
			// If player has guessed all letters. Update Win.
			if(self.newWord.wordGuessed == true){
				self.gameWon();
			// Check guess counter and if no guesses remaion. Update loss.	
			} else if(self.guessCounter == 0) {
				self.gameLost()
			// If player has not guessed word and guesses remain, prompt to guess again.	
			} else {
				self.nextGuess();
			}			
		});
	};

	// Update win counter and prompt to play again.
	this.gameWon = function(){
		this.gameQuestion = ', do you want to play again?'
		this.gameStatus = 'You won';
		this.wins++;
		clear();
		console.log(this.gameStatus);
		self.playHangman();
	};

	// Update loss counter and prompt to play again.
	this.gameLost = function(){
		this.gameQuestion = ', do you want to play again?'
		this.gameStatus = 'You lost';
		this.loses++;
		clear();
		self.playHangman();
	};

}

module.exports = Game;