var colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];

var currentQuote = "";
var currentAuthor = "";
function openURL(url){
  window.open(url, 'Share', 'width=550, height=400, toolbar=0, scrollbars=1 ,location=0 ,statusbar=0,menubar=0, resizable=0');
}

function getQuote() {
  $.ajax({
    headers: {
      "X-Mashape-Key": "OivH71yd3tmshl9YKzFH7BTzBVRQp1RaKLajsnafgL2aPsfP9V",
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    url: 'https://andruxnet-random-famous-quotes.p.mashape.com/cat=',
    success: function(response) {
      var quote = JSON.parse(response);
      currentQuote = quote.quote;
      currentAuthor = quote.author;
      $(".quote-text").animate({
          opacity: 0
        }, 500,
        function() {
          $("#text").text(quote.quote);
          $(".quote-text").animate({
            opacity: 1
          }, 500);
        });

      $(".quote-author").animate({
          opacity: 0
        }, 500,
        function() {
          $(".quote-author").animate({
            opacity: 1
          }, 500);
          $('#author').html(quote.author);
        });

      var index = Math.floor(Math.random() * colors.length);
      $("body").animate({
        backgroundColor: colors[index],
        color: colors[index]
      }, 1000);
      $(".button").animate({
        backgroundColor: colors[index]
      }, 1000);
    }
  });
}

$(document).ready(function() {
  getQuote();
  $("#new-quote").on("click", getQuote);
  $("#tweet-quote").on("click", function() {
    openURL('https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));
  });
  $("#tumblr-quote").on("click", function() {
    openURL('https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption='+encodeURIComponent(currentAuthor)+'&content=' + encodeURIComponent(currentQuote));
  });
});
