/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {

  let createdDate = new Date();
  $(".time-since").html(timeago.format(createdDate));


  // Test / driver code (temporary). Eventually will get this from the server.
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];

  
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
    
    const $tweetBody = $(`<p class="tweet-body">${tweet.content.text}</p>`);
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
    $(tweets).each( function(tweet) {
      let $composedTweet = createTweetElement(tweets[tweet]);
      return $(".tweet-list").append($composedTweet);
    });
  };
    
  renderTweets(data);

      
});