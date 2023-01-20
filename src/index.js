require("./error"); 
//check that all modules are installed before proceeding

const logger = require("../utils/logger"); 
const { Client, Collection, GatewayIntentBits, Partials } = require("discord.js");

const bot = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.DirectMessages
    ],
    partials: [
        Partials.Channel
    ] 
}); 

const config = require("./loaders/reader"); 

["aliases", "commands"].forEach(x => bot[x] = new Collection()); 
["console", "command", "event"].forEach(x => require(`../handlers/${x}`)(bot));

logger.log("Successfully loaded other files.");
bot.login(config.token);  