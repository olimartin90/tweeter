$(document).ready(function() {

    $("#textBox").on('keyup', function(event) {
        const maxChar = 140;
        const counterDown = maxChar - $(this).val().length;
        $(this).siblings('.counter').text(counterDown);

        if (counterDown < 0) {
            $(".counter").css("color", "red");
        } else {
            $(".counter").css("color", "black");
        }
    });
});