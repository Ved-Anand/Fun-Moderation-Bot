const { mail } = require("../../loaders/reader");
const { SlashCommandBuilder, ChatInputCommandInteraction } = require("discord.js");
const { writeFileSync } = require("fs");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('block')
        .setDescription('Block someone from using modmail. Only usable in a modmail thread.')
        .setDMPermission(false),
    config: {
        name: "block",
        aliases: ["banmail", "mailban"],
        usage: ["block"],
        description: "requires mail switch in botconfig to be on. Only usable in a modmail thread.",
        permissions: "none"
    },
    run: async (bot, message, args) => {

        if (!mail) return message.reply("Can't use this when modmail isn't turned on in the bot config.");

        let channels = require("../../models/storage/channels.json");
        if (channels[message.guild.id] == undefined || channels[message.guild.id].length == 0) return message.reply("Is this a modmail query? Couldn't find it.");

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

        //now we do the blocking
        let blocks = require("../../models/storage/blocks.json");
        if (blocks[message.guild.id] == undefined || blocks[message.guild.id].length == 0) {
            //first block or no one is blocked:
            blocks[message.guild.id] = [user.id];

        } else if (!blocks[message.guild.id].includes(user.id)) {
            blocks[message.guild.id].push(user.id);
        } else return message.reply("User is already blocked.");

        writeFileSync("src/models/storage/blocks.json", JSON.stringify(blocks));

        try {
            user.send("You have been blocked from starting another modmail query.");
            return (message instanceof ChatInputCommandInteraction) ? message.reply(`:white_check_mark: Blocked ${user.username} from starting another modmail query.`) : message.channel.send(`:white_check_mark: Blocked ${user.username} from starting another modmail query.`);
        } catch (err) {
            console.log(err);
            return (message instanceof ChatInputCommandInteraction) ? message.reply("Unfortunately an error occurred in the use of this command.") : message.channel.send("Unfortunately an error occurred in the use of this command.");
        }

    }
}