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
