const Discord = require("discord.js");
module.exports = bot => {
    console.log(`${bot.user.username} is running on ${bot.guilds.size} servers!`);
    console.log(`${bot.user.username} is successfully running.`);
    bot.user.setActivity("MODERATING.GIF", {type: "STREAMING"});
}