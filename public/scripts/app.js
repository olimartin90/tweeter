$(document).ready(function() {

  function loadTweets () {
    $.ajax({
      url: '/tweets',
      type: 'GET'
    })
    .done(function(arrayOfRawTweets) {
      renderTweets(arrayOfRawTweets);
    })
    .fail(function(err) {
      console.log('Error!', err);
    });
  };

    function renderTweets(tweets) {
        $('#tweet-container').empty();
        for (let tweetElement of tweets) {
            let $tweetElement = createTweetElement(tweetElement);
            $('#tweet-container').prepend($tweetElement);
        }
    };

    function createTweetElement(tweet) {

        let $article = $('<article>')
                        .addClass('all-the-tweets');

        let $header = $('<header>')
                        .addClass('tweet-header');

        let $img = $('<img>')
                      .addClass('profile')
                      .attr('src', tweet.user.avatars.regular);

        let $spanName = $('<span>')
                          .addClass('tweet-name')
                          .text(tweet.user.name);

        let $spanUsername = $('<span>')
                              .addClass('tweet-username')
                              .text(tweet.user.handle);

        let $p = $('<p>')
                    .addClass('tweet-text')
                    .text(tweet.content.text);

        let $footer = $('<footer>')
                        .addClass('tweet-footer');

        let $spanTime = $('<span>')
                          .addClass('time-past')
                          .text(moment(tweet.created_at).fromNow());

        let $firstIcon = $('<i>')
                            .addClass('fas fa-flag footer-icon first-icon');

        let $secondIcon = $('<i>')
                            .addClass('fas fa-retweet footer-icon');

        let $thirdIcon = $('<i>')
                            .addClass('fas fa-heart footer-icon');

        $article.append($header);
        $header.append($img);
        $header.append($spanName);
        $header.append($spanUsername);
        $article.append($p);
        $article.append($footer);
        $footer.append($spanTime);
        $footer.append($firstIcon);
        $footer.append($secondIcon);
        $footer.append($thirdIcon);

        return $article;

    };

    $('#textForm').submit(function(event) {

        event.preventDefault();
        if ($('#textBox').val().length === 0) {
            alert('You cannot tweet nothing!')
        } else if ($('#textBox').val().length > 140) {
            alert('Your tweet must be 140 characters maximum!')
        } else {
            $.ajax({
              method: 'POST',
              url: '/tweets',
              data: $(this).serialize(),
                })
            .done(function() {
              $('#textBox').val('');
              $('.counter').html(140);
              loadTweets();
            });
        }
    });

    $("input.compose-bouton").click(function() {
        $("section.new-tweet").slideToggle(200);
        $("textarea").focus();
    });
    loadTweets();
});