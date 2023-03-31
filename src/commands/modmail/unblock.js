const { mail } = require("../../loaders/reader");
const { SlashCommandBuilder, ChatInputCommandInteraction } = require("discord.js");
const { writeFileSync } = require("fs");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unblock')
        .setDescription('Unblock someone from using modmail.')
        .addStringOption(option => {
            return option
                .setName('userid')
                .setDescription("User ID of person being unblocked. Reauired unless command used in modmail query of said user.")
        })
        .setDMPermission(false),
    config: {
        name: "unblock",
        aliases: ["unbanmail", "mailunban"],
        usage: ["unblock <id?>"],
        description: "requires mail switch in botconfig to be on. Only usable in a modmail thread, unless ID is given in which case usable everywhere.",
        permissions: "none"
    },
    run: async (bot, message, args) => {

        if (!mail) return message.reply("Can't use this when modmail isn't turned on in the bot config.");

        let channels = require("../../models/storage/channels.json");

        if (channels[message.guild.id] == undefined || channels[message.guild.id].length == 0) {
            // not used in the modmail thread. 

            let toCheck = (message instanceof ChatInputCommandInteraction) ? message.options.getString("userid") : args[0];

            if (!toCheck || toCheck.length < 5) return message.reply("Is this a modmail query? Couldn't find it.");
            
            let blocks = require("../../models/storage/blocks.json");
            if (blocks[message.guild.id] == undefined || blocks[message.guild.id].length == 0) return message.reply("This user doesn't appear to be blocked.");
            let location = blocks[message.guild.id].indexOf(toCheck.replace("<", "").replace("@", "").replace(">", ""));
            if (location == -1) return message.reply("Couldn't find this User ID. Are they even blocked?");

            blocks[message.guild.id].splice(location, 1);
            writeFileSync("src/models/storage/blocks.json", JSON.stringify(blocks));

            let username = await bot.users.fetch(toCheck.replace("<", "").replace("@", "").replace(">", "")).catch(() => null);

            username.send("You have been unblocked.");
            return (message instanceof ChatInputCommandInteraction) ? message.reply(`:white_check_mark: Unblocked ${username.username}.`) : message.channel.send(`:white_check_mark: Unblocked ${username.username}.`);

        }

        let channel, finalElem, user;

        for (var i = 0; i < channels[message.guild.id].length; i++) {

            user = await bot.users.fetch(channels[message.guild.id][i]).catch(() => null);
            channel = message.guild.channels.cache.find(chan => chan.name === user.username.toLowerCase());
            if (channel == message.channel) {
                finalElem = i;
                break;
            }
            if (i == channels[message.guild.id].length - 1) return message.reply("Couldn't find a modmail thread by this name. Are you using this in the correct channel?");
        }

        let append = channels;
        if (!append[message.guild.id].includes(user.id)) return message.reply("Couldn't find a modmail thread by this name.");

        //now we do the unblocking
        let blocks = require("../../models/storage/blocks.json");
        if (blocks[message.guild.id] == undefined || blocks[message.guild.id].length == 0) return message.reply("Couldn't find anyone who was blocked.");

        if (!blocks[message.guild.id].includes(user.id)) return message.reply("This user isn't blocked.");
            
        blocks[message.guild.id].splice(blocks[message.guild.id].indexOf(user.id), 1);


        writeFileSync("src/models/storage/blocks.json", JSON.stringify(blocks));

        return (message instanceof ChatInputCommandInteraction) ? message.reply(`:white_check_mark: Unblocked ${user.username}.`) : message.channel.send(`:white_check_mark: Unblocked ${user.username}.`);

    }
}