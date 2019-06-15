const config = require("../../src/loaders/reader");
const logger = require("../../utils/logger");
module.exports = async bot => {
    bot.user.setActivity(config.status, {type: "STREAMING"});
    logger.info("Bot is online!");
    require("../../src/loaders/pluginloader")(bot, config);
}