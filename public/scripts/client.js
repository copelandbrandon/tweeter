/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {
  $(".error").hide();
  let createdDate = new Date();
  $(".time-since").html(timeago.format(createdDate));

  // example referenced from LHL assignment page for escape function
  const escape = function(str) {
    let paragraph = document.createElement("p");
    paragraph.appendChild(document.createTextNode(str));
    return paragraph.innerHTML;
  };
  

  const createTweetElement = function(tweet) {
    const $tweet = $(`<article class="tweet-article"></article>`);

    const $tweetHeader = $(
      `<header class="tweet-header">
      <p class="tweet-profile">
      <i class="far fa-user-circle"></i>
      ${tweet.user.name}
      </p>
      <span class="at-username">
      ${tweet.user.handle}
      </span>
      </header>`
    );
    $tweet.append($tweetHeader);
    const $tweetBody = $(`<p class="tweet-body">${escape(tweet.content.text)}</p>`);
    $tweet.append($tweetBody);
      
      
    const $tweetFooter = $(
      `<footer class="tweet-footer">
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
      
  const renderTweets = function(tweets) {
    $(tweets).each(function(tweet) {
      let $composedTweet = createTweetElement(tweets[tweet]);
      return $(".tweet-list").prepend($composedTweet);
    });
  };
      
  $("form").submit(function(event) {
    event.preventDefault();
    let inputData = $("textarea").serialize();
    let charCount = $(".counter").val();
    console.log("counter: ", charCount);
    $(".error").hide();
    if (inputData === "text=" || inputData === null) {
      $(".error").show();
      return $(".error-message").html("<p>Cannot submit an empty tweet!</p>");

    } else if (charCount <= -1) {
      $(".error").show();
      return $(".error-message").html("<p>Too many characters to submit!</p>");
    }

    $.post("/tweets", inputData)
      .then(function() {
        $.get("http://localhost:8080/tweets", null, function(tweets) {
          const newTweet = tweets[tweets.length - 1];
          renderTweets([newTweet]);
        });
      });

    
  });

  const loadTweets = function() {
    $.get("http://localhost:8080/tweets", null, function(tweets) {
      renderTweets(tweets);
    });
  };

  loadTweets();
      
      
});