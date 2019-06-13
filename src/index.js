const { Client, Collection } = require("discord.js"); //gets Collection + Client from Discord
const { token } = require("../botconfig.json"); //create tokenfile.json and put token in it
const bot = new Client(); //creates the Discord Client
require("./loaders/reader");
["aliases", "commands", "getal"].forEach(x => bot[x] = new Collection());       //for aliases + commands create new Collection
["console", "command", "event"].forEach(x => require(`../handlers/${x}`)(bot))    //for console, command, event, for each require run function with bot parameter
console.log("Successfully loaded other files.");
const yes = require('./loaders/reader');
require('./loaders/pluginloader')(bot, yes);
bot.login(token);