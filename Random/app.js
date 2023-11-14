function getRandomQuote() {
    $.ajax({
        method: 'GET',
        url: 'https://api.quotable.io/random',
        success: function (result) {
            const quote = result.content;
            const author = result.author;
            displayQuote(quote, author);
        },
        error: function ajaxError(jqXHR) {
            console.error('Error: ', jqXHR.responseText);
        }
    });
}

function displayQuote(quote, author) {
    var quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = `<blockquote>${quote}</blockquote><p>- ${author}</p>`;
}
