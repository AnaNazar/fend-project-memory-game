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
* @description Create a fade in effect on the target element
* @function
* @param targetElement The HTML target element
*/
function fadeInElement(targetElement) {
	let opacity = 0;
	const frameRate = setInterval(animationFrame, 24);

	function animationFrame() {
		targetElement.style.opacity = opacity;
		if( opacity < 1) {
			opacity += 0.1;
			targetElement.style.opacity = opacity;
		} else {
			clearInterval(frameRate);
			targetElement.style.opacity = 1;
		}
	}
}

/**
* @description Create a fade out effect on the target element
* @function
* @param targetElement The HTML target element
*/
function fadeOutElement(targetElement) {
	let opacity = 1;
	const frameRate = setInterval(animationFrame, 24);

	function animationFrame() {
		targetElement.style.opacity = opacity;
		if( opacity > 0 ) {
			opacity -= 0.1;
			targetElement.style.opacity = opacity;
		} else {
			clearInterval(frameRate);
			targetElement.style.opacity = 0;
		}
	}
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
		return this.moves === 1 ? this.moves + ' move' : this.moves + ' moves';
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
		return this.stars === 1 ? this.stars + ' star' : this.stars + ' stars';
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
		let cardsEventListener = document.querySelector('.deck').querySelectorAll('.card');
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

	// Store all the cards of the deck
	const cardsTotal = document.querySelector('.deck').querySelectorAll('.card');
	// Store all the matched cards of the deck
	const cardsMatched = document.querySelector('.deck').querySelectorAll('.match');
	// Check whether all the cards were matched
	if( cardsMatched.length === cardsTotal.length ) {
		clearInterval(gameTimer);
		displayPopUp();
	}
}

/**
* @description Add event listener to all cards to run the timer on the player's first move
* @function
*/
function addListenerTimer() {
	let cardsEventListener = document.querySelector('.deck').querySelectorAll('.card');
	for(const card of cardsEventListener) {
		card.addEventListener('click', runGameTimer);
	}
}

/**
* @description Control the game's flow
* @function
*/
function gameController(event) {
	// Show card selected
	showCard(event);

	// Return the number of open cards in the deck
	const openCards = verifyOpenCards();

	// Compare two open cards
	if(openCards === 2) {
		compareCards();
	}
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

	// Create a new deck element
	const newDeck = document.createElement('ul');
	newDeck.classList.add('deck');

	// Loop through each card and create its HTML
	for(const card of deck) {
		const newCard = document.createElement('li');
		newCard.classList.add('card');
		newCard.innerHTML = '<i class="fa ' + card + '"></i>';
		// Add card's HTML to the deck element
		newDeck.appendChild(newCard);
	}

	// Add deck's HTML to the document fragment
	newDocumentFragment.appendChild(newDeck);

	// Add the HTML with the deck and cards to the page
	document.querySelector('.container').appendChild(newDocumentFragment);

	// Call function to attach to each card, 
	// an event listener that runs the game's timer
	// when one card it is clicked
	addListenerTimer();
	// Attach event listener to the deck, in order to run the game's controller
	document.querySelector('.deck').addEventListener('click', gameController);
}

/**
* @description Reset the values of the moves counter, rating board, timer
* 			   and display a new set of cards
* @function
*/
function restartGame() {
	// Remove the deck
	const currentDeck = document.querySelector('.deck');
	document.querySelector('.container').removeChild(currentDeck);
	// Reset the move counter
	movesCounter.resetCounter();
	// Reset the rating board
	rating.resetRating();
	// Stop the timer
	clearInterval(gameTimer);
	// Reset the timer's values to 0
	timer.resetTimer();
	// Display a new set of cards
	displayDeck();
}

// Add event listener to the restart button
document.querySelector('.restart').addEventListener('click', function() {
	restartGame();
});

/**
* @description Display a pop up when the game is solved
* @function
*/
function displayPopUp() {

	// Create a document fragment to improve page performance
	const newDocumentFragment = document.createDocumentFragment();

	// Create pop up structure
	const newPopUp = document.createElement('div');
	newPopUp.classList.add('popup');
	newPopUp.innerHTML = '<div class="pop-up-container"><div class="content"><i class="fa fa-trophy"></i><h2>Congratulations! You Won!</h2><p>You solved the game in ' + timer.printTimer() + ' with ' + movesCounter.printMoves() + ' and rating of ' + rating.printRating() + '.</p><p>Wooooooo!</p><span class="new-game">Play again!</span></div></div>';
	if( window.innerHeight >= document.querySelector('.container').offsetHeight ) {
		newPopUp.style.height = window.innerHeight + 1 + 'px';
	} else {
		newPopUp.style.height = document.querySelector('.container').offsetHeight + 1 + 'px';
	}	
	newPopUp.style.opacity = 0;
	newDocumentFragment.appendChild(newPopUp);

	// Add pop up HTML to the page
	document.querySelector('body').appendChild(newDocumentFragment);
	fadeInElement(document.querySelector('.popup'));

	// Restart the game when the new game button is clicked
	document.querySelector('.new-game').addEventListener('click', function(){
		const popUp = document.querySelector('.popup');
		restartGame();
		fadeOutElement(popUp);
		setTimeout(function() {
			document.querySelector('body').removeChild(popUp);
		}, 500);
	});
}

// Initialize the Move Counter's value
movesCounter.resetCounter();

// Initialize the Rating Board
rating.resetRating();

// Initialize the game's timer
timer.resetTimer();

// Call function to start the game
displayDeck();