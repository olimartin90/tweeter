// Test / driver code (temporary). Eventually will get this from the server.
// const data = [{
//     "user": {
//         "name": "Newton",
//         "avatars": {
//             "small": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
//             "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
//             "large": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
//         },
//         "handle": "@SirIsaac"
//     },
//     "content": {
//         "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
// }, {
//     "user": {
//         "name": "Descartes",
//         "avatars": {
//             "small": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
//             "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
//             "large": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
//         },
//         "handle": "@rd"
//     },
//     "content": {
//         "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
// }, {
//     "user": {
//         "name": "Johann von Goethe",
//         "avatars": {
//             "small": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
//             "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
//             "large": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
//         },
//         "handle": "@johann49"
//     },
//     "content": {
//         "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
//     },
//     "created_at": 1461113796368
// }];

const data = [];

$(document).ready(function() {

    function renderTweets(tweets) {
        $('#tweet-container').empty();
        for (let tweetElement of tweets) {
            let $tweetElement = createTweetElement(tweetElement);
            $('#tweet-container').prepend($tweetElement);

        }
    };

    function createTweetElement(tweet) {

        let $article = $('<article>').addClass('all-the-tweets');

        let $header = $('<header>').addClass('tweet-header');

        let $img = $('<img>').addClass('profile').attr('src', tweet.user.avatars.regular);

        let $spanName = $('<span>').addClass('tweet-name').text(tweet.user.name);

        let $spanUsername = $('<span>').addClass('tweet-username').text(tweet.user.handle);

        let $p = $('<p>').addClass('tweet-text').text(tweet.content.text);

        let $footer = $('<footer>').addClass('tweet-footer');

        let $spanTime = $('<span>').addClass('time-past').text(moment(tweet.created_at).fromNow());

        let $firstIcon = $('<i>').addClass('fas fa-flag footer-icon first-icon');

        let $secondIcon = $('<i>').addClass('fas fa-retweet footer-icon');

        let $thirdIcon = $('<i>').addClass('fas fa-heart footer-icon');

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

    renderTweets(data);

    $('#textForm').submit(function(event) {

        var tweets = data;
        event.preventDefault();
        if ($('#textBox').val().length === 0) {
            alert('You cannot tweet nothing!')
        } else if ($('#textBox').val().length > 140) {
            alert('Your tweet must be 140 characters maximum!')
        } else {
            $.ajax({
                method: 'POST',
                url: '/tweets',
                data: $(this).serialize()
            }).done(function(newTweet) {
                $('#textBox').val('');
                $('.counter').html(140);
                tweets.push(newTweet);
                renderTweets(tweets);
            });
        }
    });
});
