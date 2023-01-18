module.exports = {
    config: {
        name: "ping",
        aliases: ["latency"],
        usage: "$ping",
        description: "Get the bot's ping!",
        permissions: "none"
    },
    run: async (bot, message, args) => {
        message.channel.send("Pinging...").then(m => {
            let ping = m.createdTimestamp - message.createdTimestamp;
            m.edit(`Bot Latency: \`${ping}ms\`, API Latency: \`${Math.round(bot.ws.ping)}ms\``);
        });
    }
}