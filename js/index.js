var scriptIDs = [
    "722",
    "814",
    "908",
    "920",
    "1152",
    "1454"
];

var scriptNames = [
    "Realistic Player Damage",
    "Server Crash Menu & Auto Reconnection",
    "DataSave",
    "Admin Sit Bubble",
    "Rules Enforcer",
    "DarkRP: Gamble NPC"
];

var scriptBanners = [
    "https://media.gmodstore.com/_/script_banners/78c84a636b257a1d9bd54430e6f95af2_full.png",
    "https://media.gmodstore.com/_/script_banners/4b0713475df444e27d44640c4b7446d1_full.png",
    "https://media.gmodstore.com/_/script_banners/d6cc135121d8dcdf5a7cb119e529b142_full.png",
    "https://media.gmodstore.com/_/script_banners/343024bdd2b3261795b45cda9917a293_full.png",
    "https://media.gmodstore.com/_/script_banners/ea4b381c6eef3b13e7fea2aace2c68e6_full.png",
    "https://media.gmodstore.com/_/script_banners/c34c01537188fe844c879cfa47ce1139_full.png"
];

var scriptPrices = [
    "$4.99",
    "$4.99",
    "$14.99",
    "$4.99",
    "$4.99",
    "$4.99"
];

var addonIDs = [
    "211300890",
    "521401390",
    "533142185",
    "534857430"
];

var addonNames = [
    "Human Rocket Launcher",
    "Quick Knife",
    "Plunder Ability",
    "Goomba Stomp"
];

var addonBanners = [
    "http://images.akamai.steamusercontent.com/ugc/573439791044613501/8A2E9EF0AA2EBEB5B310C2EB984515C416210C0A/",
    "http://images.akamai.steamusercontent.com/ugc/613969645862389774/0648E00ABA981C1726E5DAB909767C65C49EDC61/",
    "http://images.akamai.steamusercontent.com/ugc/571187356415848420/09CE97E0123F01CBD04626EA05F10403E203A1FC/",
    "http://images.akamai.steamusercontent.com/ugc/575696389344567478/8A482B1061438F6A2E7108EB9697F9975CE978ED/"
];

function optimizeScriptBoxes() {
    var bannerWidth = ($("#container").outerWidth() - 50 * 4) / 3;
    var iconWidth = ($("#container").outerWidth() - 50 * 5) / 4;

    $(".icon").width(iconWidth);
    $(".banner").width(bannerWidth);

    $(".wsButton").width(iconWidth - 32);
    $(".sfButton").width(bannerWidth - 32);
}

$(function() {
    $(window).load(function() {
        optimizeScriptBoxes();
    });

    $(window).resize(function() {
        optimizeScriptBoxes();
    });

    $(document).on("click", "button", function() {
        if ($(this).attr("class") == "sfButton") {
            var id = $(this).attr("id");
            id = id.replace("b", "");

            var win = window.open("https://gmodstore.com/market/view/" + id, "_blank");
            win.focus();
        } else {
            var id = $(this).attr("id");

            var win = window.open("http://steamcommunity.com/sharedfiles/filedetails/?id=" + id, "_blank");
            win.focus();
        }
    });

    $(document).ready(function() {
        var html = "";
        var append = "";

        $.each(scriptIDs, function(key, val) {
            if ((key + 1) == 1) {
                html = html + "<tr>";
            } else if ((key + 1) % 3 == 1 && (key + 1) != 1 && (key + 1) != scriptIDs.length + 1) {
                html = html + "</tr><tr class='spacer'></tr></tr>";
            } else if ((key + 1) == scriptIDs.length + 1) {
                html = html + "</tr>";
            }

            var append = ["<td>",
                              "<table class='addon'>",
                                  "<tr>",
                                      "<td colspan='2'><p class='addonTitle'>" + scriptNames[key] + "</p></td>",
                                  "</tr>",
                                  "<tr>",
                                      "<td colspan='2'><img class='banner' src='" + scriptBanners[key] + "'></td>",
                                  "</tr>",
                                  "<tr>",
                                      "<td id='buttonCell' colspan='2'><button class='dl-button sfButton' id='b" + val + "' type='button'>Buy " + scriptPrices[key] + "</button></td>",
                                  "</tr>",
                              "</table>",
                          "</td>"
            ].join("\n");

            html = html + append;
        });

        $("#sf").append($(html));

        html = "";
        append = "";

        $.each(addonIDs, function(key, val) {
            if ((key + 1) == 1) {
                html = html + "<tr>";
            } else if ((key + 1) % 4 == 1 && (key + 1) != 1 && (key + 1) != scriptIDs.length + 1) {
                html = html + "</tr><tr class='spacer'></tr></tr>";
            } else if ((key + 1) == scriptIDs.length + 1) {
                html = html + "</tr>";
            }

            var append = ["<td>",
                              "<table class='addon'>",
                                  "<tr>",
                                      "<td colspan='2'><p class='addonTitle'>" + addonNames[key] + "</p></td>",
                                  "</tr>",
                                  "<tr>",
                                      "<td colspan='2'><img class='icon' src='" + addonBanners[key] + "'></td>",
                                  "</tr>",
                                  "<tr>",
                                      "<td id='buttonCell' colspan='2'><button class='dl-button wsButton' id='" + val + "' type='button'>Download</button></td>",
                                  "</tr>",
                              "</table>",
                          "</td>"
            ].join("\n");

            html = html + append;
        });

        $("#ws").append($(html));

        optimizeScriptBoxes();
    });
});
