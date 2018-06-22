$(document).ready(function() {

    // Function for counting the character when pressing a key.
    $("#textBox").on('keyup', function(event) {
        const maxChar = 140;
        const counterDown = maxChar - $(this).val().length;
        $(this).siblings('.counter').text(counterDown);

        if (counterDown < 0) {
            $(".counter").css("color", "red");
        } else {
            $(".counter").css("color", "black");
        };
    });
});
