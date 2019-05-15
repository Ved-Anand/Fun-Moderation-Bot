const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
    if (message.channel.type == "dm") return;
    if (message.author.id != 358731232764362762) return;
    try {
        await message.channel.send(". . . Bot is shutting down . . .");
        process.exit();
    } catch (e) {
        return message.channel.send(`ERROR: ${e.message}`);
    }
}
module.exports.help = {
    name: "shutdown"
}