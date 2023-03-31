const { ownerid } = require("../../loaders/reader");
const { SlashCommandBuilder, ChatInputCommandInteraction } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shutdown')
        .setDescription('Shutdown the bot')
        .setDMPermission(false),
    config: {
        name: "shutdown",
        aliases: ["stop", "exit", "rm-rf"]
    },
    run: async (bot, message, args) => {
        if (message instanceof ChatInputCommandInteraction) {
            if (ownerid == null && message.user.id == message.guild.ownerId) return message.channel.send("You need to put in your ID in the ownerid flag of the botconfig file.");
            if (ownerid == null || message.user.id != ownerid) return;
        } else {
            if (ownerid == null && message.author.id == message.guild.ownerId) return message.channel.send("You need to put in your ID in the ownerid flag of the botconfig file.");
            if (ownerid == null || message.author.id != ownerid) return;
        }
        
        try {
            (message instanceof ChatInputCommandInteraction) ? await message.reply(". . . Bot is shutting down . . ."): await message.channel.send(". . . Bot is shutting down . . .");
            process.exit();
        } catch (e) {
            return message.channel.send(`ERROR: ${e.message}`);
        }
    }
}