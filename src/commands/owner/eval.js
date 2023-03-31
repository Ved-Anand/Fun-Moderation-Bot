const { inspect } = require("util");
const { ownerid } = require("../../loaders/reader");
const { SlashCommandBuilder, ChatInputCommandInteraction } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("eval")
        .setDescription("Evaluate something (owner only)")
        .addStringOption(option => {
            return option
                .setName('query')
                .setDescription("To be evaluated")
                .setRequired(true)
        })
        .setDMPermission(false),
    config: {
        name: "eval",
        aliases: ["find", "calc", "calculate"]
    },
    run: async (bot, message, args) => {
        
        if (message instanceof ChatInputCommandInteraction) {
            if (ownerid == null && message.user.id == message.guild.ownerId) return message.channel.send("You need to put in your ID in the ownerid flag of the botconfig file.");
            if (ownerid == null || message.user.id != ownerid) return;
        } else {
            if (ownerid == null && message.author.id == message.guild.ownerId) return message.channel.send("You need to put in your ID in the ownerid flag of the botconfig file.");
            if (ownerid == null || message.author.id != ownerid) return;
        }

        let toEval = (message instanceof ChatInputCommandInteraction) ? message.options.getString("query") : args.join(" ");

        try {
            let evaluated = inspect(eval(toEval, { depth: 0 } ))
            if (!toEval) return message.channel.send("Error: `Cannot evaluate air!`");

            if (evaluated.length > 1950) return message.channel.send("Error: `Request is too long.`");

            let hrDiff = process.hrtime(process.hrtime());

            (message instanceof ChatInputCommandInteraction) ? message.reply({ content: `*Executed in ${hrDiff[0] > 0 ? `${hrDiff[0]}s` : ''}${hrDiff[1] / 1000000}ms.*\`\`\`javascript\n${evaluated}\n\`\`\``, ephemeral: true}, { maxLength: 1900 }) : message.channel.send(`*Executed in ${hrDiff[0] > 0 ? `${hrDiff[0]}s` : ''}${hrDiff[1] / 1000000}ms.*\`\`\`javascript\n${evaluated}\n\`\`\``, { maxLength: 1900 });
            
        } catch(e) {
            (message instanceof ChatInputCommandInteraction) ? message.reply({ content: `...An error occurred...: \`${e.message}\``, ephemeral: true}) : message.channel.send(`...An error occurred...: \`${e.message}\``);
        }
    } 
}