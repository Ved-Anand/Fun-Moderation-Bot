const { mail } = require("../../loaders/reader");
const fs = require("fs");

module.exports = {
    config: {
        name: "unblock",
        aliases: ["unbanmail", "mailunban"],
        usage: ["unblock <semi optional id>"],
        description: "requires mail switch in botconfig to be on. Only usable in a modmail thread, unless ID is given in which case usable everywhere.",
        permissions: "none"
    },
    run: async (bot, message, args) => {

        if (!mail) return message.channel.send("Can't use this when modmail isn't turned on in the bot config.");

        let channels = require("../../models/storage/channels.json");
        if (channels[message.guild.id] == undefined || channels[message.guild.id].length == 0) {
            if (!args[0] || args[0].length < 5) return message.channel.send("Is this a modmail query? Couldn't find it.");
            
            let blocks = require("../../models/storage/blocks.json");
            if (blocks[message.guild.id] == undefined || blocks[message.guild.id].length == 0) return message.channel.send("This user doesn't appear to be blocked.");
            let location = blocks[message.guild.id].indexOf(args[0].replace("<", "").replace("@", "").replace(">", ""));
            if (location == -1) return message.channel.send("Couldn't find this User ID. Are they even blocked?");

            blocks[message.guild.id].splice(location, 1);
            fs.writeFileSync("src/models/storage/blocks.json", JSON.stringify(blocks));

            let username = await bot.users.fetch(args[0].replace("<", "").replace("@", "").replace(">", "")).catch(() => null);

            username.send("You have been unblocked.");
            return message.channel.send(`:white_check_mark: Unblocked ${username.username}.`);

        }

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
        if (!append[message.guild.id].includes(user.id)) return message.channel.send("Couldn't find a modmail thread by this name.");

        //now we do the unblocking
        let blocks = require("../../models/storage/blocks.json");
        if (blocks[message.guild.id] == undefined || blocks[message.guild.id].length == 0) return message.channel.send("Couldn't find anyone who was blocked.");

        if (!blocks[message.guild.id].includes(user.id)) return message.channel.send("This user isn't blocked.");
            
        blocks[message.guild.id].splice(blocks[message.guild.id].indexOf(user.id), 1);


        fs.writeFileSync("src/models/storage/blocks.json", JSON.stringify(blocks));

        return message.channel.send(`:white_check_mark: Unblocked ${user.username}.`);

    }
}