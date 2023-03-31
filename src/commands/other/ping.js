const { SlashCommandBuilder, ChatInputCommandInteraction } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription("Get the bot's ping!")
        .setDMPermission(false),
    config: {
        name: "ping",
        aliases: ["latency"],
        usage: "ping",
        description: "Get the bot's ping!",
        permissions: "none"
    },
    run: async (bot, message, args) => {

        try {
            if (message instanceof ChatInputCommandInteraction) {

                message.channel.send("Pinging...").then(m => {
                    let ping = m.createdTimestamp - message.createdTimestamp;
                    m.delete();
                    message.reply(`Bot Latency: \`${ping}ms\`, API Latency: \`${Math.round(bot.ws.ping)}ms\``);
                });

            } else {
                message.channel.send("Pinging...").then(m => {
                    let ping = m.createdTimestamp - message.createdTimestamp;
                    m.edit(`Bot Latency: \`${ping}ms\`, API Latency: \`${Math.round(bot.ws.ping)}ms\``);
                });
            }
        } catch (err) {
            message.reply("Unfortunately an error occurred.");
            console.error(err);
        }
    }
}