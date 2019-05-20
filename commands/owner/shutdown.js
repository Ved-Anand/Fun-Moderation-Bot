const { ownerid } = require("../../tokenfile.json");
module.exports = {
    config: {
        name: "shutdown",
        aliases: ["stop", "exit", "reboot"]
    },
    run: async (bot, message, args) => {
        if (message.channel.type == "dm") return;
        if (message.author.id != ownerid) return;
        try {
            await message.channel.send(". . . Bot is shutting down . . .");
            process.exit();
        } catch (e) {
            return message.channel.send(`ERROR: ${e.message}`);
        }
    }
}