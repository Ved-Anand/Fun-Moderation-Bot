const config = require("../../src/loaders/reader"); 
//get the data set in the botconfig file
const logger = require("../../utils/logger");
//if you have not already seen logger.js, this is basically the same as console logging, yet neater.
const configchecker = require("../../utils/configchecker");
//used to check certain elements of the data set in the botconfig file

module.exports = async bot => {
    bot.user.setActivity(config.status, {type: "STREAMING"}); //set status
    logger.info("Bot is online!");

    configchecker.checkPrivate(bot, config); 
    configchecker.checkWhitelist(bot, config);
    //check that if whitelist/private is toggled, correct data has been filled out in the botconfig file
    require("../../src/loaders/pluginloader")(bot, config); //run pluginloader.js
}