require("./error"); 
//check that all modules are installed before proceeding

const logger = require("../utils/logger"); 
const { Client, Collection, Intents } = require("discord.js");

const bot = new Client({ 
    intents: [
        Intents.FLAGS.GUILDS, 
        Intents.FLAGS.GUILD_MESSAGES
    ] 
}); 

const data = require("./loaders/reader"); 

["aliases", "commands"].forEach(x => bot[x] = new Collection()); 
["console", "command", "event"].forEach(x => require(`../handlers/${x}`)(bot));

logger.log("Successfully loaded other files.");
bot.login(data.token); 