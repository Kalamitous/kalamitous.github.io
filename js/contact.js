$(function() {
    $("#submit").click(function() {
        var name = $("#name").val();
        var email = $("#name").val();

        var emailData = "name=" + name + "&email=" + email;

        $.ajax({
            type: "POST",
            url: "contact.php",
            data: emailData,
            success: function() {
                alert("WORKS");
            }
        });
    });
});
