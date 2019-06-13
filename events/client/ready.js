const config = require("../../src/loaders/reader");
module.exports = async bot => {
    bot.user.setActivity(config.status, {type: "STREAMING"});
    console.log("Bot is online!");
}