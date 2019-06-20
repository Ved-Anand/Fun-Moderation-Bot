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
            let choices = ["Is this really my ping", "Is it okay? I cant look", "I hope it isnt bad"];
            let response = choices[Math.floor(Math.random() * choices.length)]; ///get random response
            m.edit(`${response}: Bot Latency: \`${ping}\`, API Latency: \`${Math.round(bot.ping)}\``);
        });
    }
}