const config = require("../../src/loaders/reader"); 
const logger = require("../../utils/logger");
const configchecker = require("../../utils/configchecker");

module.exports = async bot => {
    bot.user.setActivity(config.status, {type: "STREAMING"}); //customize this if you want
    logger.info("Bot is online!");

    configchecker.checkPrivate(bot, config); 
    configchecker.checkWhitelist(bot, config);
   
    require("../../src/loaders/pluginloader")(bot, config); 

    bot.registerCommandAlias = function (alias, command) {
        bot.aliases.set(alias, command);
    }
    bot.execute = function (command, bot, message, args) {
        let commandfile = bot.commands.get(command) || bot.aliases.get(bot.commands.get(command));
        commandfile.run(bot, message, args);
    }
}