const { ownerid } = require("../../loaders/reader"); //get ownerid from botconfig file

module.exports = {
    config: {
        name: "shutdown",
        aliases: ["stop", "exit", "rm-rf"]
    },
    run: async (bot, message, args) => {
        if (message.author.id != ownerid) return; //only owner can use
        
        try {
            await message.channel.send(". . . Bot is shutting down . . .");
            process.exit();
        } catch (e) {
            return message.channel.send(`ERROR: ${e.message}`);
        }
    }
}