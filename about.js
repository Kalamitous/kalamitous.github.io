var galleryImages = [
    "http://i.imgur.com/UXOAdCt.jpg",
    "http://i.imgur.com/4XpHX.png",
    "https://s3.amazonaws.com/img-pixelapse/79060/8653700/img_5964784.png"
];

function optimizeGallery() {
    var imgWidth = ($("#container").outerWidth() - 50 * 4) / 2;

    $("#gallery").width(imgWidth);
    $("#galleryImg").width(imgWidth);
    $("#galleryImg img").width(imgWidth);
    $("#galleryImgTemp").css({"left": String(imgWidth) + "px", "width": "0px"});

    $("#galleryImgTemp img").attr("width", "0px");

    var imgPos = $("#gallery").position();

    $("#desc").css({"top": String(imgPos.top) + "px", "left": String(imgPos.left) + "px"});
    $("#desc").width(imgWidth);

    $("#desc").height(imgWidth / 20);
    $("#desc p").css("font-size", String(imgWidth / 40));

    $("#desc p").css("margin-left", String(imgWidth / 40 / 4 + 1));
    $("#desc p").css("margin-top", String(imgWidth / 40 / 4 + 1));
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

    $("#galleryImgTemp").animate({
        left: 0,
        width: $("#gallery").width()
    }, {
        duration: 500,
        queue: false,
        complete: function() {
            $("#galleryImg img").attr("src", $("#galleryImgTemp img").attr("src"));

            setTimeout(function() {
                $("#galleryImgTemp img").attr("src", nextImage("galleryImgTemp img"));
                $("#galleryImgTemp img").css("width", "0px");

                var imgWidth = ($("#container").outerWidth() - 50 * 4) / 2;

                $("#galleryImgTemp").css({"left": String(imgWidth) + "px", "width": "0px"});
            }, 50);
        }
    });
}

$(function() {
    $(window).load(function() {
        optimizeGallery();

        setInterval(function() {
            galleryTransition();
        }, 4000);
    });

    $(window).resize(function() {
        optimizeGallery();
    });
});
