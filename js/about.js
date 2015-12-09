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

function optimizeGallery() {
    var imgWidth = $("#container").outerWidth();

    $("#gallery").width(imgWidth);
    $("#galleryImg").width(imgWidth);
    $("#galleryImg img").width(imgWidth);
    $("#galleryImgTemp").css({"left": String(imgWidth) + "px", "width": "0px"});

    $("#galleryImgTemp img").attr("width", "0px");

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

function galleryTransition() {
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
                $("#galleryImg img").attr("title", getImageName("galleryImg img"));

                $("#galleryImgTemp img").attr("src", nextImage("galleryImgTemp img"));
                $("#galleryImgTemp img").css("width", "0px");

                var imgWidth = $("#container").outerWidth();

                $("#galleryImgTemp").css({"left": String(imgWidth) + "px", "width": "0px"});
            }, 50);
        }
    });
}

$(function() {
    $(window).load(function() {
        optimizeGallery();

        $("#bar").animate({
            width: $("#gallery").width()
        }, {duration: 5000, queue: false});

        setInterval(function() {
            galleryTransition();
        }, 5000);
    });

    $(window).resize(function() {
        optimizeGallery();
    });
});
