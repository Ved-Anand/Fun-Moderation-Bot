const { ownerid } = require("../../src/loaders/reader");
module.exports = {
    config: {
        name: "shutdown",
        aliases: ["stop", "exit", "rm-rf"]
    },
    run: async (bot, message, args) => {
        if (message.author.id != ownerid) return;
        try {
            await message.channel.send(". . . Bot is shutting down . . .");
            process.exit();
        } catch (e) {
            return message.channel.send(`ERROR: ${e.message}`);
        }
    }
}