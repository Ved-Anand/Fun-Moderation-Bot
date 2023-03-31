const { readdirSync, lstatSync, readdir } = require("fs");
const logger = require("../utils/logger"); 

const { REST, Routes } = require("discord.js");
const { token } = require("../botconfig.json");
const slashCommands = [];
let hasLoaded = false;

module.exports = (bot) => {
  const load = dirs => {
    const commands = readdirSync(`./src/commands/${dirs}/`).filter(d => d.endsWith('.js')); 
    //commands = all javascript files inside the dirs parameter.

    for (let file of commands) { //for each of these files
      let pull = require(`../src/commands/${dirs}/${file}`);
      bot.commands.set(pull.config.name, pull); //bot.commands defined in index.js, is discord collection
      if (pull.config.aliases) pull.config.aliases.forEach(a => bot.aliases.set(a, pull.config.name)); //bot aliases :)

      // slash commands:
      if (pull.data) slashCommands.push(pull.data.toJSON());
    };

  };
  readdir(`./src/commands/`, (err, directories) => {
    //directories = the directories the bot commands are separated into
    if (err) logger.error(err); 
    var dirArray = [];
    directories.forEach((f, i) => { 
      if (lstatSync(`./src/commands/${f}`)) {  
        dirArray.push(f);
      }
    });

    dirArray.forEach(x => load(x));


    if (bot.user != null) {
      slashCommandLoad(bot);
    } else {
      setTimeout(() => {
        slashCommandLoad(bot);
      }, 1000);
    }

  });
};

function slashCommandLoad(bot) {
 
  try {
    if (bot.user || bot.user.id == null) { //infinitely recurse until runnable (bot.user is only defined after bot comes online)
      if (!hasLoaded) {
        setTimeout(() => {
          slashCommandLoad(bot);
        }, 1000);
      }
    }
  } catch(err) {
    if (!hasLoaded) {
      setTimeout(() => {
        slashCommandLoad(bot);
      }, 1000);
    }
  }

  (async () => {

    const rest = new REST({ version: '10' }).setToken(token);

    try {

      if (!hasLoaded && bot.user != null && bot.user.id != null) {
        logger.log(`Started loading ${slashCommands.length} application (/) commands.`);
        hasLoaded = true;
    
        const data = await rest.put(
          Routes.applicationCommands(bot.user.id),
          { body: slashCommands },
        );
    
        logger.log(`Successfully reloaded ${data.length} application (/) commands.`);
        logger.info("Initialization finished!");
        // hasLoaded = true;
      } else return;
    } catch (error) {
      console.error(error);
    }
  })();
}