require("./error");
const { Client, Collection } = require("discord.js"); //gets Collection + Client from Discord
const bot = new Client(); //creates the Discord Client
const yt = require("./loaders/reader");
["aliases", "commands", "getal"].forEach(x => bot[x] = new Collection());       //for aliases + commands create new Collection
["console", "command", "event"].forEach(x => require(`../handlers/${x}`)(bot))    //for console, command, event, for each require run function with bot parameter
console.log("Successfully loaded other files.");
bot.login(yt.token);