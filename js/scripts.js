// scripts.js
	
var tweetLink = "https://twitter.com/intent/tweet?text="; // standardowy link do wysyłania tweetów na Twittera (treść tweeta po "=")
var prefix = "https://cors-anywhere.herokuapp.com/"; // prefiks pomagający w rozwiązaniu problemu z CORS
var quoteUrl = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1"; // link do API Quotes and Design, pobierający z basy losowe cytaty

function getQuote() {
    $.getJSON(prefix + quoteUrl, createTweet); // uproszczona wersja metody $.ajax(); quoteUrl - parametr będący adresem url do pobrania cytatu (link do API); createTweet - funkcja, która zostanie wykonana po pomyślnym wykonaniu zadania,
    $.ajaxSetup({ cache: false }); // żeby zapytania się nie cache'owały
}

function createTweet(input) { // funkcja ma tworzyć linki z tweetami i podpinać je pod przycisk do tweetowania
    var data = input[0];

    var quoteText = $(data.content).text().trim(); // .text() wyciąga zawartość tekstową z elementu, trim() ucina niepotrzebne spacje na początku i końcu stringa
    var quoteAuthor = data.title;

    if (!quoteAuthor.length) { // sprawdzenie, czy autor jest pustym stringiem. Jeśli tak - pojawia się napis "author unknown"
        quoteAuthor = "unknown author";
    }

    var tweetText = "Quote of the day - " + quoteText + " author: " + quoteAuthor; // wygenerorwanie treści tweeta
    
    if (tweetText.length > 140) { // sprawdzenie, czy tweet nie jest za długi dla Twittera
    	getQuote(); // jeżeli jest za długi, tweet jest generowany ponownie
    } else {
    	var tweet = tweetLink + encodeURIComponent(tweetText); // encodeURIComponent <- This function encodes special characters. In addition, it encodes the following characters: , / ? : @ & = + $ #
    	$('.quote').text(quoteText); // element wyświetlający treść cytatu
    	$('.author').text("author: " + quoteAuthor); // element pokazdujący autora cytatu
    	$('.tweet').attr('href', tweet); // wybór klasy .tweet i modyfikacja zawartości atrybutu href na URL tweeta, który trzymany jest w zmiennej tweet
    } 
}

$(document).ready(function() {
	getQuote();
	$('.trigger').click(function() { // podpięcie elemntu o klasie .trigger nasłuchiwanie na zdarzenie kliknięcia, po którym ma się wykonać funkcja generująca cytat
		getQuote();
	})
});


