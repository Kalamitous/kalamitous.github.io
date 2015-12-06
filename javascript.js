$(function() {
    $(window).resize(function() {
        var bannerWidth = ($("#container").outerWidth() - 16 - 54 * 2 - 59 * 2) / 3;

        $(".banner").width(bannerWidth);
        $("button").width(bannerWidth - 32);
    });

    $.getJSON("http://scriptfodder.com/api/scripts/?api_key=4143b2cbfbc9d500fdb8df2350e2893c6cb54acc", function(data) {
        var bannerWidth = ($("#container").outerWidth() - 16 - 54 * 2 - 59 * 2) / 3;

        var html = "";
        var append = "";

        var scriptArray = data.scripts;

        scriptArray.splice(1, 1);

        $.each(scriptArray, function(key, val) {
            if ((key + 1) == 1) {
                html = html + "<tr>";
            } else if ((key + 1) % 3 == 1 && (key + 1) != 1 && (key + 1) != scriptArray.length + 1) {
                html = html + "</tr><tr>";
            } else if ((key + 1) == scriptArray.length + 1) {
                html = html + "</tr>";
            }

            var name = val.name;
            var banner = val.banner;
            var views = val.views;

            var append = ["<td>",
                              "<div>",
                                  "<table class='script'>",
                                      "<tr>",
                                          "<td colspan='2'><p><b>" + String(name) + "</b></p></td>",,
                                      "</tr>",
                                      "<tr>",
                                          "<td colspan='2'><img class='banner' src='https://s3.scriptfodder.com/script_banners/" + banner + ".png' width='" + String(bannerWidth) +"'></td>",
                                      "</tr>",
                                      "<tr>",
                                          "<td><p>Views: " + String(views) + "</p></td>",
                                          "<td><p>Purchasers: W.I.P.</p></td>",
                                      "</tr>",
                                      "<tr>",
                                          "<td id='buttonCell' colspan='2'><button type='button'>Buy $0.00</button></td>",
                                      "</tr>",
                                  "</table>",
                              "</div>",
                          "</td>"
            ].join("\n");

            html = html + append;
        });

        var $td = $(html);

        $("#sf").append($td);

        $("button").width(bannerWidth - 32);
    });
});
