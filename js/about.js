var galleryNames = [
    "Garry's Mod",
    "L\xD6VE",
    "osu!"
];

var galleryImages = [
    "./images/about/gmod.png",
    "./images/about/love2d.png",
    "./images/about/osu.png"
];

function setupSelector() {
    var html = "";
    var append = "";

    $.each(galleryNames, function(key, val) {
        if ((key + 1) == 1) {
            html = html + "<tr>";
        } else if ((key + 1) == galleryNames.length + 1) {
            html = html + "</tr>";
        }

        var append = ["<td>",
                          "<div id='sb" + String(key) + "' class='selectorBox'><p></p></div>",
                      "</td>"
        ].join("\n");

        html = html + append;
    });

    $("#selector").append($(html));

    html = "";
    append = "";
}

function optimizeGallery() {
    var imgWidth = $("#container").outerWidth();

    $("#gallery").width(imgWidth);
    $("#galleryImg").width(imgWidth);
    $("#galleryImg img").width(imgWidth);
    $("#galleryImgTemp").css({"left": String(imgWidth) + "px", "width": "0px"});

    $("#galleryImgTemp img").attr("width", "0px");

    $(".selectorBox").css({"width": String(imgWidth / 60) + "px", "height": String(imgWidth / 60) + "px"});

    var imgPos = $("#gallery").position();

    $("#desc").css({"top": String(imgPos.top) + "px", "left": String(imgPos.left) + "px"});
    $("#desc").width(imgWidth);
    $("#desc").height(imgWidth / 30);

    $("#bar").css({"top": String(imgPos.top + $("#gallery").height() - (imgWidth / 200)) + "px", "left": String(imgPos.left) + "px"});
    $("#bar").height(imgWidth / 200);

    $("#desc p").css("font-size", String(imgWidth / 60));

    $("#desc p").css("margin-left", String((imgWidth / 60 / 4 + 1) * 2));
    $("#desc p").css("margin-top", String(imgWidth / 60 / 4 + 1));
}

function getCurKey(id) {
    var image;

    for (var i = 0; i < galleryImages.length; i++) {
        if ($("#" + id).attr("src") == galleryImages[i]) {
            image = i;
        }
    }

    return image;
}
function getImageName(id) {
    var image;

    for (var i = 0; i < galleryImages.length; i++) {
        if ($("#" + id).attr("src") == galleryImages[i]) {
            image = i;
        }
    }

    return galleryNames[image];
}

function nextImage(id) {
    var image;

    for (var i = 0; i < galleryImages.length; i++) {
        if ($("#" + id).attr("src") == galleryImages[i]) {
            image = i;
        }
    }

    if (image == galleryImages.length - 1) {
        image = 0;
    } else {
        image = image + 1;
    }

    return galleryImages[image];
}

var canSwitch = true;

function galleryTransition(key) {
    canSwitch = false;

    if (key != null) {
        $("#galleryImgTemp img").attr("src", galleryImages[key]);
    }

    $(".selectorBox").animate({
        backgroundColor: "#e1e7e9",
    }, {
        duration: 250,
        queue: false,
        complete: function() {
            $("#sb" + String(getCurKey("galleryImgTemp img"))).animate({
                backgroundColor: "#45a1de",
            }, {
                duration: 250,
                queue: false
            });
        }
    });

    $("#galleryImgTemp img").animate({
        width: $("#gallery").width()
    }, {duration: 0, queue: false});

    $("#bar").animate({
        width: 0
    }, {
        duration: 500,
        queue: false,
        complete: function() {
            $("#bar").animate({
                width: $("#gallery").width()
            }, 4500);
        }
    });

    $("#galleryImgTemp").animate({
        left: 0,
        width: $("#gallery").width()
    }, {
        duration: 500,
        queue: false,
        complete: function() {
            $("#galleryImg img").attr("src", $("#galleryImgTemp img").attr("src"));

            $("#desc p").fadeOut(200, function() {
                $("#desc p").text(getImageName("galleryImg img"));

                $("#desc p").fadeIn(500);
            });

            setTimeout(function() {
                canSwitch = true;

                $("#galleryImg img").attr("title", getImageName("galleryImg img"));

                $("#galleryImgTemp img").attr("src", nextImage("galleryImgTemp img"));
                $("#galleryImgTemp img").css("width", "0px");

                var imgWidth = $("#container").outerWidth();

                $("#galleryImgTemp").css({"left": String(imgWidth) + "px", "width": "0px"});
            }, 50);
        }
    });
}

var transition = 0;

function restartTransition(key) {
    $("#bar").stop();

    clearInterval(transition);

    galleryTransition(key);

    transition = setInterval(function() {
        galleryTransition();
    }, 5000);
}

$(function() {
    $(window).load(function() {
        setupSelector();
        optimizeGallery();

        $("#bar").animate({
            width: $("#gallery").width()
        }, {duration: 5000, queue: false})

        transition = setInterval(function() {
            galleryTransition();
        }, 5000);
    });

    $(window).resize(function() {
        optimizeGallery();
    });

    $(document).on("click", ".selectorBox", function() {
        var key = $(this).attr("id");
        key = key.replace("sb", "");

        if ($("#galleryImg img").attr("src") != galleryImages[key]) {
            if (canSwitch == true) {
                restartTransition(key);
            }
        }
    });
});
