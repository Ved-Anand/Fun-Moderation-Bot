const config = require("../../src/loaders/reader");
const logger = require("../../utils/logger");
module.exports = async bot => {
    bot.user.setActivity(config.status, {type: "STREAMING"});
    logger.info("Bot is online!");
    if (config.privateID != "") {
        let testGuild = bot.guilds.get(config.privateID);
        if (!testGuild) return logger.error('That guild was not found!');
    }
    require("../../src/loaders/pluginloader")(bot, config);
}