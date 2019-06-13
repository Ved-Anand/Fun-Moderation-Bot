const fs = require("fs");
module.exports = (bot) => {
    var lines = fs.readFileSync("src/aliases.txt", "utf8").split("\n");
    for (var i in lines) {
        var input = lines[i];
        if (input.length == 0) return;
        let colon = input.indexOf(":");
        if (colon == -1) continue;
        var alias = input.slice(0, colon);
        var origin = input.slice(colon);
        origin = origin.replace(":", "");
        bot.aliases.set(alias, origin);
    }
};