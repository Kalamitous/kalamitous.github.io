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
    "DarkRP: DataSave",
    "Admin Sit Bubble",
    "Rules Enforcer",
    "DarkRP: Gamble NPC"
];

var scriptBanners = [
    "https://s3.scriptfodder.com/script_banners/9a5cb27a068dfa015c01a790e9650ab6.png",
    "https://s3.scriptfodder.com/script_banners/3c4cac8c733f09511d8fbfecbf847f0e.png",
    "https://s3.scriptfodder.com/script_banners/04e91aeb65c450cacd589fa9c6098b75.png",
    "https://s3.scriptfodder.com/script_banners/72c7b4b5d77d0a6c21585b5a5187e95a.png",
    "https://s3.scriptfodder.com/script_banners/cea3f7b2731fbfc86935ef3b4c2444b7.png",
    "https://s3.scriptfodder.com/script_banners/a4a775cd5bd7a9d00bcff3414b478b77.png"
];

var scriptPrices = [
    "$4.99",
    "$3.99",
    "$14.99",
    "$4.99",
    "$3.99",
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

$(function() {
    function optimizeScriptBoxes() {
        var bannerWidth = ($("#container").outerWidth() - 50 * 4) / 3;
        var iconWidth = ($("#container").outerWidth() - 50 * 5) / 4;

        $(".icon").width(iconWidth);
        $(".banner").width(bannerWidth);

        $(".wsButton").width(iconWidth - 32);
        $(".sfButton").width(bannerWidth - 32);
    }

    $(window).resize(function() {
        optimizeScriptBoxes();
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
                                      "<td id='buttonCell' colspan='2'><button class='sfButton' id='b" + val + "' type='button'>Buy " + scriptPrices[key] + "</button></td>",
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
                                      "<td colspan='2'><p>" + addonNames[key] + "</p></td>",
                                  "</tr>",
                                  "<tr>",
                                      "<td colspan='2'><img class='icon' src='" + addonBanners[key] + "'></td>",
                                  "</tr>",
                                  "<tr>",
                                      "<td id='buttonCell' colspan='2'><button class='wsButton' id='" + val + "' type='button'>Download</button></td>",
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
