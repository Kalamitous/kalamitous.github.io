$(function() {
    $(window).resize(function() {
        var bannerWidth = ($("#container").outerWidth() - 50 * 4) / 3;
        var iconWidth = ($("#container").outerWidth() - 50 * 5) / 4;

        $(".icon").width(iconWidth);
        $(".banner").width(bannerWidth);

        $(".wsButton").width(iconWidth - 32);
        $(".sfButton").width(bannerWidth - 32);
    });

    $.getJSON("http://scriptfodder.com/api/scripts/?api_key=4143b2cbfbc9d500fdb8df2350e2893c6cb54acc", function(script) {
        var bannerWidth = ($("#container").outerWidth() - 50 * 4) / 3;
        var iconWidth = ($("#container").outerWidth() - 50 * 5) / 4;

        $(".wsButton").width(iconWidth - 32);

        $(".icon").width(iconWidth);

        var html = "";
        var append = "";

        var scriptArray = script.scripts;

        scriptArray.splice(1, 1);

        $.each(scriptArray, function(key, val) {
            if ((key + 1) == 1) {
                html = html + "<tr>";
            } else if ((key + 1) % 3 == 1 && (key + 1) != 1 && (key + 1) != scriptArray.length + 1) {
                html = html + "</tr><tr>";
            } else if ((key + 1) == scriptArray.length + 1) {
                html = html + "</tr>";
            }

            var id = val.id;
            var name = val.name;
            var banner = val.banner;
            var views = val.views;
            var purchasers;
            var price;

            $.getJSON("http://scriptfodder.com/api/scripts/purchases/" + String(id) + "?api_key=4143b2cbfbc9d500fdb8df2350e2893c6cb54acc", function(purchasesArray) {
                var manual = 0;

                $.each(purchasesArray.purchases, function(key, val) {
                    if (val.transaction_id == null || val.purchase_revoked == "1") {
                        manual = manual + 1;
                    }
                });

                $("#p" + String(id)).text("Purchases: " + String(Number(purchasesArray.purchases.length) - manual));
            });

            $.getJSON("http://scriptfodder.com/api/scripts/info/" + String(id) + "?api_key=4143b2cbfbc9d500fdb8df2350e2893c6cb54acc", function(info) {
                $("#b" + String(id)).text("Buy $" + String(Number(info.script.price) - Number(info.script.price_discount)));
            });

            var append = ["<td>",
                              "<table class='script'>",
                                  "<tr>",
                                      "<td colspan='2'><p><b>" + String(name) + "</b></p></td>",
                                  "</tr>",
                                  "<tr>",
                                      "<td colspan='2'><img class='banner' src='https://s3.scriptfodder.com/script_banners/" + banner + ".png' width='" + String(bannerWidth) +"'></td>",
                                  "</tr>",
                                  "<tr>",
                                      "<td><p>Views: " + String(views) + "</p></td>",
                                      "<td><p id='p" + String(id) + "'>Purchases: . . .</p></td>",
                                  "</tr>",
                                  "<tr>",
                                      "<td id='buttonCell' colspan='2'><button class='sfButton' id='b" + String(id) + "' type='button'>Buy $. . .</button></td>",
                                  "</tr>",
                              "</table>",
                          "</td>"
            ].join("\n");

            html = html + append;
        });

        var $td = $(html);

        $("#sf").append($td);

        $("td").width(bannerWidth / 2);
        $(".sfButton").width(bannerWidth - 32);
    });

    $(document).on("click", "button", function() {
        if ($(this).attr("class") == "sfButton") {
            var id = $(this).attr("id");
            id = id.replace("b", "");

            var win = window.open("https://scriptfodder.com/scripts/view/" + id, "_blank");
            win.focus();
        } else {
            var id = $(this).attr("id");

            var win = window.open("http://steamcommunity.com/sharedfiles/filedetails/?id=" + id, "_blank");
            win.focus();
        }
    });
});
