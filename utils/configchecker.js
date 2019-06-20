const logger = require("./logger"); //better console logging

function checkPrivate(bot, config) {
    if (config.private) {
        if (config.privateID != '') {
            let testGuild = bot.guilds.get(config.privateID); //see if guild is valid
            if (!testGuild) return logger.error("The id provided in the privateID value in the botconfig file was invalid!");
        } else {
            logger.error("The config.private value is set to true in the botconfig file, yet no privateID value was found!");
        }
    } else return;
}

function checkWhitelist(bot, config) {
    if (config.whitelist) {
        if (config.users.length) {
            let testUser;
            let user;
            for (var i in config.users) {
                user = config.users[i];
                testUser = bot.users.get(user); //see if user is valid
                if (!testUser) return logger.error(`Could not find the user ${user}, note that they must be in a server with the bot in order for this feature to work.`);
            }
            return;
        } else return logger.error("The config.whitelist value is set to true in the botconfig file, yet no users were found!");
    } else return;
}

module.exports = {
    checkPrivate,
    checkWhitelist
};