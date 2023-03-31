const { mail } = require("../../loaders/reader");
const { SlashCommandBuilder, ChatInputCommandInteraction } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('anonreply')
        .setDescription('Anonymously replies to a modmail query. This requires modmail to be on in botconfig!')
        .addStringOption(option => {
            return option
                .setName('text')
                .setDescription("Text to anonymously send.")
                .setRequired(true)
        })
        .setDMPermission(false),
    config: {
        name: "anonreply",
        aliases: ["replyanon", "anon", "anonymous"],
        usage: ["anonreply <text>"],
        description: "must turn on mail option in botconfig to use. anonymously replies to a modmail query",
        permissions: "none"
    },
    run: async (bot, message, args) => {

        if (!mail) return message.reply("Please turn on the mail option in your bot configuration file.");

        let text = (message instanceof ChatInputCommandInteraction) ? message.options.getString("text") : args.join(" ");

        let channels = require("../../models/storage/channels.json");

        if (channels[message.guild.id] == undefined || channels[message.guild.id].length == 0) return message.reply("Couldn't find a modmail query to reply to.");

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

        message.reply({ content: `Sent ${text} anonymously.`, ephemeral: true});
        return user.send(`**Moderator: ** ${text}`);

    }
}