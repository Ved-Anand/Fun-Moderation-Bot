const { DMChannel } = require("discord.js");
const { mail } = require("../../loaders/reader");

module.exports = {
    config: {
        name: "anonreply",
        aliases: ["replyanon", "anon", "anonymous"],
        usage: ["anonreply <text>"],
        description: "must turn on mail option in botconfig to use. anonymously replies to a modmail query",
        permissions: "none"
    },
    run: async (bot, message, args) => {

        if (message.channel instanceof DMChannel) return;
        if (!mail) return message.channel.send("Please turn on the mail option in your bot configuration file.");

        let text = args;

        let channels = require("../../models/channels.json");

        if (channels[message.guild.id] == undefined || channels[message.guild.id].length == 0) return message.channel.send("Couldn't find a modmail query to reply to.");

        let channel, finalElem, user;

        for (var i = 0; i < channels[message.guild.id].length; i++) {

            user = await bot.users.fetch(channels[message.guild.id][i]).catch(() => null);
            channel = message.guild.channels.cache.find(chan => chan.name === user.username.toLowerCase());
            if (channel == message.channel) {
                finalElem = i;
                break;
            }
            if (i == channels[message.guild.id].length - 1) return message.channel.send("Couldn't find a modmail thread by this name. Are you using this in the correct channel?");
        }

        return user.send(`**Moderator: ** ${text}`);

    }
}