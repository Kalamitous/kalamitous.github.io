$(function() {
    $(".activeTab").ready(function() {
        $(".activeTab").animate({
            "top": "0px"
        }, 200);
    });
    
    $(document).on("mouseenter", "#tab", function() {
        if ($(this).attr("class") != "activeTab") {
            $(this).animate({
                "top": "-5px"
            }, 200);
        }
    }).on("mouseleave", "#tab", function() {
        if ($(this).attr("class") != "activeTab") {
            $(this).animate({
                "top": "0px"
            }, 200);
        }
    });

    $("#container").animate({
        "opacity": "1",
    }, 200);
});
