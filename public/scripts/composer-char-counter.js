$(document).ready(function() {

    $("#textBox").on('keyup', function(event) {

        var counterDown = 140 - $(this).val().length;
        $('.counter').text(counterDown);

        if (counterDown < 0) {
            $(".counter").css("color", "red");
        } else {
            $(".counter").css("color", "black");
        }
    });
});