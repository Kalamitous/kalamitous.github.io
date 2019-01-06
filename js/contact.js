$(function() {
    var submitted = false;

    $('#gForm').on('submit', function(e) {
        $('#gForm *').fadeTo(100, 0, function() {
            $('#thank').fadeTo(100, 1, function() {
                $('#thank').delay(2000).fadeTo(100, 0, function() {
                    $(this).clearQueue()
                    
                    $('#gForm *').fadeTo(100, 1);
                });
            });
        });
    });
});