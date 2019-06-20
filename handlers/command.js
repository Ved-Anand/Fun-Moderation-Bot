const { readdirSync, lstatSync, readdir } = require("fs");
const logger = require("../utils/logger"); //logger = better console.log

module.exports = (bot) => {
  const load = dirs => {
    const commands = readdirSync(`./src/commands/${dirs}/`).filter(d => d.endsWith('.js')); 
    //commands = all javascript files inside the dirs parameter.

    for (let file of commands) { //for each of these files
      let pull = require(`../src/commands/${dirs}/${file}`);
      bot.commands.set(pull.config.name, pull); //bot.commands defined in index.js, is discord collection
      if (pull.config.aliases) pull.config.aliases.forEach(a => bot.aliases.set(a, pull.config.name)); //bot aliases :)
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
  });
};