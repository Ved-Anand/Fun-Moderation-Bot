const { ownerid } = require("../../tokenfile.json");
module.exports = {
    config: {
        name: "id",
        aliases: []
    },
    run: async (bot, message, args) => {
        if (message.author.id != ownerid) return;
        if (message.channel.type == "dm") return;
        let ided = message.mentions.members.first() || message.guild.members.get(args[0]);
        if (!ided) return message.channel.send("User not found.");
        return message.channel.send(ided.id);
    }
}