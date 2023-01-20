const { DMChannel } = require("discord.js");
const { mail } = require("../../loaders/reader");
const fs = require("fs");

module.exports = {
    config: {
        name: "close",
        usage: ["close"],
        description: "must turn on mail option in botconfig to use. closes a modmail thread.",
        permissions: "none"
    },
    run: async (bot, message, args) => {

        if (message.channel instanceof DMChannel) return;
        if (!mail) return message.channel.send("Please turn on the mail option in your bot configuration file.");

        let channels = require("../../models/channels.json");
        if (channels[message.guild.id] == undefined || channels[message.guild.id].length == 0) return message.channel.send("Couldn't find a modmail query to close.");

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

        let append = channels;
        if (!append[message.guild.id].includes(user.id)) return message.channel.send("Couldn't find a modmail thread by this name. If for some reason there is a channel of this name, feel free to delete it yourself.");

        append[message.guild.id].splice(finalElem, 1);
        fs.writeFileSync("src/models/channels.json", JSON.stringify(append));

        try {
            user.send("A moderator closed this thread. You can reopen it at any time by sending another message."); 
            return channel.delete();
        } catch (e) {
            console.log(e);
            return message.channel.send("Unfortunately an error occurred and I was unable to close this channel. Check my permissions?");
        }
        

    }
}