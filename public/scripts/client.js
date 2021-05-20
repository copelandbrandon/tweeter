/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {
  $(".error").hide();

  //sets date for the example tweet hardcoded into the html which displays at the bottom of the page
  let createdDate = new Date();
  $(".time-since").html(timeago.format(createdDate));

  // example referenced from LHL assignment page for escape function, will protect the app from cross site scripting,
  const escape = function(str) {
    let paragraph = document.createElement("p");
    paragraph.appendChild(document.createTextNode(str));
    return paragraph.innerHTML;
  };
  
  //forms html from tweet database for an individual tweet
  const createTweetElement = function(tweet) {
    const $tweet = $(`<article class="composed-article"></article>`);

    const $tweetHeader = $(
      `<header class="composed-header">
      <p class="composed-profile">
      <i class="far fa-user-circle"></i>
      ${tweet.user.name}
      </p>
      <span class="composed-username">
      ${tweet.user.handle}
      </span>
      </header>`
    );
    $tweet.append($tweetHeader);
    const $tweetBody = $(`<p class="composed-body">${escape(tweet.content.text)}</p>`);
    $tweet.append($tweetBody);
      
      
    const $tweetFooter = $(
      `<footer class="composed-footer">
      <span class ="time-since">
      ${timeago.format(tweet.created_at)}
      </span>
      <span class="btns">
      <i class="fas fa-flag"></i>
      <i class="fas fa-retweet"></i>
      <i class="fas fa-heart"></i>
      </span>
      </footer>`
    );
        
    $tweet.append($tweetFooter);
        
    return $tweet;
        
  };

  // loops through a list of tweets and feeds individual tweets to createTweetElement
  const renderTweets = function(tweets) {
    $(tweets).each(function(tweet) {
      let $composedTweet = createTweetElement(tweets[tweet]);
      return $(".tweet-list").prepend($composedTweet);
    });
  };


  //ajax post request
  $("form").submit(function(event) {
    event.preventDefault();
    let inputData = $(this).children("textarea").serialize();
    let charCount = $(this).children(".lowerElements").children(".counter").val();
    let error = $(this).children(".error");
    error.hide();
    if (inputData === "text=" || inputData === null) {
      error.show();
      return $(".error-message").html("<p>Cannot submit an empty tweet!</p>");

    } else if (charCount <= -1) {
      error.show();
      return $(".error-message").html("<p>Too many characters to submit!</p>");
    }
    //promise used to refetch the tweet posted by the post request
    $.post("/tweets", inputData)
      .then(function() {
        const tweetData = $.get("http://localhost:8080/tweets");
        return tweetData;
      }).then(data => {
        const newTweet = data[data.length - 1];
        return newTweet;
      }).then(newTweet => {
        renderTweets([newTweet]);
      });
    $(this).children("textarea").val('');
    $(this).children(".lowerElements").children(".counter").val(140);
  });


  const loadTweets = function() {
    $.get("http://localhost:8080/tweets", null, function(tweets) {
      renderTweets(tweets);
    });
  };

  loadTweets();
      
      
});