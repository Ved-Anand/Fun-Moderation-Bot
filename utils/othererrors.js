const Discord = require("discord.js");
let config = require("../botconfig.json");
let array = new Array();
array[91348] = "Error: Missing Permissions. \n Reccomended solution: Go to server settings, roles, and make the bot role the highest one. If this does not work, make sure the bot has all the permissions."
module.exports.getError = (err) => {
    let id;
    if (err == "Missing Permissions") {
        id = "91348"
        return id;
    } else {
        return "Huh, I don't recognize that error!"
    }
}

module.exports.findError = (id) => {
    let fix = array[id];
    if (fix != undefined) {
        return fix;
    } else {
        return "I don't recognize that error id!"
    }
}