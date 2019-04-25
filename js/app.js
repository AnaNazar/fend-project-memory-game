// List of cards symbols
const cards = ['fa-anchor', 'fa-bicycle', 'fa-bolt', 'fa-bomb', 'fa-cube', 'fa-diamond', 'fa-leaf', 'fa-paper-plane-o'];

// New deck with pairs of cards
const deck = [...cards];
// Duplicate the symbols
for(const card of cards) {
	deck.push(card);
}

/**
* @description Shuffle function from http://stackoverflow.com/a/2450976
* @function
*/
function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;

	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

/**
* @description Display a new random deck on the page
* @function
*/
function displayDeck() {
	// Shuffle cards deck
	shuffle(deck);

	// Create a document fragment to improve page performance
	const newDocumentFragment = document.createDocumentFragment();

	// Loop through each card and create its HTML
	for(const card of deck) {
		const newCard = document.createElement('li');
		newCard.classList.add('card');
		newCard.innerHTML = '<i class="fa ' + card + '"></i>';
		newDocumentFragment.appendChild(newCard);
	}

	// Add each card's HTML to the page
	document.querySelector('.deck').appendChild(newDocumentFragment);
}

// Call function to start new game
displayDeck();

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

/**
* @description Verify open cards in the deck
* @function
* @returns {number} Return the number of open cards in the deck
*/
function verifyOpenCards() {
	return document.querySelector('.deck').querySelectorAll('.open').length;
}

/**
* @description Display card's symbol
* @function
* @param event
*/
function showCard(event){
	// Verify whether the target is a card element and if is not already opened
	if((event.target.nodeName.toLowerCase() === 'li') && !(event.target.classList.contains('open'))) {
		event.target.classList.add('open', 'show');

		// Remove event listener that call the timer's run function after the player's first move
		// Remove listener from all the cards
		for(const card of cardsEventListener) {
			card.removeEventListener('click', runGameTimer);
		}
	}
}

/**
* @description Lock the matching cards at the open position
* @function
* @param cardOne
* @param cardTwo
*/
function lockCards(cardOne, cardTwo){
	// Remove class
	cardOne.classList.remove('open', 'show');
	cardTwo.classList.remove('open', 'show');
	// Add class
	cardOne.classList.add('match');
	cardTwo.classList.add('match');
}

/**
* @description Set cards at hidden position
* @function
* @param cardOne
* @param cardTwo
*/
function hideCards(cardOne, cardTwo){
	// Remove class
	cardOne.classList.remove('open', 'show');
	cardTwo.classList.remove('open', 'show');
}

/**
* @description Check matching cards in the deck
* @function
*/
function compareCards(){
	const pairOfCards = document.querySelector('.deck').querySelectorAll('.open');

	if( pairOfCards[0].querySelector('i').className === pairOfCards[1].querySelector('i').className ) {
		lockCards(pairOfCards[0], pairOfCards[1]);
	} else {
		setTimeout(function() {
			hideCards(pairOfCards[0], pairOfCards[1]);
		}, 500);
	}

	// Increase one move to the counter
	movesCounter.newMove();
	rating.updateRating(movesCounter.moves);
}

/**
* @description Move Counter
* @property {number}	moves 			Represent the number of player moves
* @property {function}	newMove			Increase a move to the counter
* @property {function}	resetCounter	Reset the counter value to zero
* @property {function}	printMoves		Display the counter value
*/
var movesCounter = {
	moves : 0,
	newMove : function() {
		this.moves += 1;
		return document.querySelector('.moves').textContent = this.moves === 1 ? this.moves + ' Move' : this.moves + ' Moves';
	},
	resetCounter : function() {
		this.moves = 0;
		return document.querySelector('.moves').innerHTML = this.moves + ' Moves';
	},
	printMoves : function() {
		return this.moves === 1 ? this.moves + ' Move' : this.moves + ' Moves';
	}
};

/**
* @description Change the star symbol
* @function
* @param starSymbol
*/
function changeStar(starSymbol) {
	starSymbol.classList.remove('fa-star');
	starSymbol.classList.add('fa-star-o');
}

/**
* @description Star Rating Board
* @property {number}	stars 			Represent the number of stars achieve by the player
* @property {function}	updateRating	Set the number of stars according to the number of player moves
* @property {function}	resetRating		Reset the number os stars to 3 (maximum value)
* @property {function}	printRating		Display the number of stars achieved
*/
var rating = {
	stars : 3,
	updateRating : function(numberOfMoves) {
		this.moves = numberOfMoves;
		const stars = document.querySelector('.stars').querySelectorAll('.fa');

		if(this.moves > 20) {
			this.stars = 0;
		} else if(this.moves > 16) {
			this.stars = 1;
		} else if(this.moves > 12) {
			this.stars = 2;
		} else {
			this.stars = 3;
		}

		for(let i = 3; i > this.stars; i--) {
			changeStar(stars[i - 1]);
		}
	},
	resetRating : function() {
		this.stars = 3;
		const stars = document.querySelector('.stars').querySelectorAll('.fa');
		for(const star of stars) {
			star.className = 'fa fa-star';
		}
	},
	printRating : function() {
		return this.stars === 1 ? this.stars + ' Star' : this.stars + ' Stars';
	}
};

/**
* @description Timer Controller
* @property {number}	seconds
* @property {number}	minutes
* @property {number}	hours
* @property {function}	printTimerBoard Display the time on the board game
* @property {function}	updateTimer 	Increase one second and update minutes and hours if necessary
* @property {function}	resetTimer		Reset seconds, minutes and hours variables to 0
* @property {function}	resetTimer		Display the amount of time the player took to solve the game
*/
const timer = {
	seconds : 0,
	minutes : 0,
	hours : 0,
	printTimerBoard : function() {
		// Print updated timer on the Board Game
		document.querySelector('.timer').textContent = (this.hours < 10 ? '0' + this.hours : this.hours) + ':' + (this.minutes < 10 ? '0' + this.minutes : this.minutes) + ':' + (this.seconds < 10 ? '0' + this.seconds : this.seconds);
	},
	updateTimer : function() {
		this.seconds += 1;

		// Verify if one minute has been completed
		if(this.seconds % 60 === 0) {
			this.minutes++;
			this.seconds = 0;
			// Verify if one hour has been completed
			if(this.minutes % 60 === 0) {
				this.hours++;
				this.minutes = 0;
			}
		}

		// Print updated timer on the Board Game
		this.printTimerBoard();
	},
	resetTimer : function() {
		this.seconds = 0;
		this.minutes = 0;
		this.hours = 0;

		// Print updated timer on the Board Game
		this.printTimerBoard();
	},
	printTimer : function() {
		return (this.hours < 10 ? '0' + this.hours : this.hours) + ':' + (this.minutes < 10 ? '0' + this.minutes : this.minutes) + ':' + (this.seconds < 10 ? '0' + this.seconds : this.seconds);
	}
};

// Timer variable
let gameTimer;

/**
* @description Set the time interval to one second
* @function
*/
function runGameTimer() {
	gameTimer = setInterval(function(){
		// Invoke timer's method
		timer.updateTimer();
	}, 1000);
}

// Add event listener to all cards to run the timer on the player's first move
const cardsEventListener = document.querySelector('.deck').querySelectorAll('.card');
for(const card of cardsEventListener) {
	card.addEventListener('click', runGameTimer);
}

// Add event listener to process player's mouse click  on the deck element
document.querySelector('.deck').addEventListener('click', function(event) {
	// Show card selected
	showCard(event);

	// Return the number of open cards in the deck
	const openCards = verifyOpenCards();

	// Compare two open cards
	if(openCards === 2) {
		compareCards();
	}
});

// Initialize the Move Counter's value
movesCounter.resetCounter();

// Initialize the Rating Board
rating.resetRating();

// Initialize the game's timer
timer.resetTimer();
