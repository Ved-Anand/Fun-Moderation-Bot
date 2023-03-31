const { fullHelp } = require("../../../utils/usage"); //good help message
const { SlashCommandBuilder, ChatInputCommandInteraction } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("8ball")
        .setDescription("Get a cheesy answer to a question")
        .addStringOption(option => {
            return option
                .setName('question')
                .setDescription("The question to be asked")
                .setRequired(true)
        })
        .setDMPermission(false),
    config: {
        name: "8ball",
        usage: "8ball <question>",
        description: "Get a cheesy answer to a question",
        permissions: "none"
    },
    run: async (bot, message, args) => {
        try {
            let toCheck = (message instanceof ChatInputCommandInteraction) ? message.options.getString("question").split(" ") : args;
            if (toCheck[0] == "help") return message.reply({ embeds: [usage.fullHelp(bot, "8ball", message)] });

            if(!toCheck[2]) return message.reply("Please ask a full question.");
            //questions should be at least 3 words long

            let replies = [ "It is certain.", "It is decidedly so.", "Without a doubt.", "Yes definitely.",
            "You may rely on it.", "As I see it, yes.", "Most likely.", "Outlook good.", "Yes.", "Signs point to yes.",
            "Reply hazy, try again.", "Ask again later.", "Better not tell you now.", "Cannot predict now.",
            "Concentrate and ask again.", "Don't count on it.", "My reply is no.", "My sources say no.",
            "Outlook not so good.", "Very doubtful."];

            let result = Math.floor((Math.random() * replies.length)); 
            return (message instanceof  ChatInputCommandInteraction) ? message.reply(replies[result]) : message.channel.send(replies[result]);
        } catch (err) {
            message.reply("Unfortunately an error occurred.");
            console.error(err);
        }
    }
}
