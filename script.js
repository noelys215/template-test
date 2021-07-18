const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const animeText = document.getElementById('anime');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Loading Spinner Shown
function loading() {
	loader.hidden = false;
	quoteContainer.hidden = true;
}

// Remove Loading Spinner
function complete() {
	quoteContainer.hidden = false;
	loader.hidden = true;
}

//Show new Quote
function newQuote() {
	loading();
	const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
	//Check if Author field is black and replace with 'Unknown"
	if (!quote.character) {
		authorText.textContent = 'Unknown';
	} else {
		authorText.textContent = quote.character;
		animeText.textContent = quote.anime;
	}
	//Check quote length to determine styling
	if (quote.quote.length > 120) {
		quoteText.classList.add('long-quote');
	} else {
		quoteText.classList.remove('long-quote');
	}
	//Set Quote, Hide Loader
	quoteText.textContent = quote.quote;
	complete();
}

// Get Quotes From API
async function getQuotes() {
	loading();
	// const apiUrl = 'https://type.fit/api/quotes';
	const apiUrl = 'https://animechan.vercel.app/api/quotes';
	try {
		const response = await fetch(apiUrl);
		apiQuotes = await response.json();
		console.log(apiQuotes);
		newQuote();
	} catch (error) {
		console.log(error);
	}
}

//Tweet Quote
function tweetQuote() {
	const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
	window.open(twitterUrl, '_blank');
}

//Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

//On Load
getQuotes();
