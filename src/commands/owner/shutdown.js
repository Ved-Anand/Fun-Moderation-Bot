const { ownerid } = require("../../loaders/reader");

module.exports = {
    config: {
        name: "shutdown",
        aliases: ["stop", "exit", "rm-rf"]
    },
    run: async (bot, message, args) => {
        if (ownerid == null && message.author.id == message.guild.ownerId) return message.channel.send("You need to put in your ID in the ownerid flag of the botconfig file.");
        if (ownerid == null || message.author.id != ownerid) return;
        
        try {
            await message.channel.send(". . . Bot is shutting down . . .");
            process.exit();
        } catch (e) {
            return message.channel.send(`ERROR: ${e.message}`);
        }
    }
}