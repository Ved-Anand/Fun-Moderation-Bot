const config = require("../../src/loaders/reader");
const logger = require("../../utils/logger");
module.exports = async bot => {
    bot.user.setActivity(config.status, {type: "STREAMING"});
    logger.info("Bot is online!");
    if (config.privateID != "") {
        let testGuild = bot.guilds.get(config.privateID);
        if (!testGuild) return logger.error('That guild was not found!');
    }
    if (config.users && config.users.length) {
        let testUser;
        let user;
        for (var i in config.users) {
            user = config.users[i];
            testUser = bot.users.get(user);
            if (!testUser) return logger.error(`Could not find the user ${user}, did you make sure to enter their id, and put it into the users array in the config file?`);
        }
    }
    require("../../src/loaders/pluginloader")(bot, config);
}