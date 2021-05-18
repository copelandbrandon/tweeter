$(document).ready(()=>{
  console.log("DOM ready!");
  
  $(".tweet-text").on("input", function() {
    let inputLength = $(this).val().length;
    let counter = $(this).parent().children(".lowerElements").children(".counter");
    let currentCount = 140 - inputLength;
    counter.html(`${currentCount}`);
    if (currentCount < 0) {
      counter.addClass("negative")
    } else if (currentCount >= 0) {
      counter.removeClass(["negative"]);
    }
  });
  
});