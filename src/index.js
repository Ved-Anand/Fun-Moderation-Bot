require("./error"); 
//check that all modules are installed before proceeding

const logger = require("../utils/logger"); 
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const fs = require("fs");

const bot = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ] 
}); 

const config = require("./loaders/reader"); 

["aliases", "commands"].forEach(x => bot[x] = new Collection()); 
["console", "command", "event"].forEach(x => require(`../handlers/${x}`)(bot));

logger.log("Successfully loaded other files.");
bot.login(config.token);  