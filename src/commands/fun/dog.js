const superagent = require("superagent");
const { SlashCommandBuilder, ChatInputCommandInteraction } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dog')
        .setDescription('Get a cute image of a dog')
        .setDMPermission(false),
    config: {
        name: "dog",
        aliases: ["woof", "bark", "doge"],
        usage: "dog",
        description: "Get a cute image of a dog",
        permissions: "none"
    },
    run: async (bot, message, args) => {
        try {
            let msg = await message.channel.send(". . . Generating . . .");

            let {body} = await superagent
            .get(`https://dog.ceo/api/breeds/image/random`);
            if(!{body}) return message.reply("Unfortunately, an error occurred - try running the command again.");

            if (message instanceof ChatInputCommandInteraction) {
                await message.reply({ 
                    files: [{
                        attachment: body.message,
                        name: "dog.png"
                    }]
                }).then(() => msg.delete());
            } else {
                await message.channel.send({ 
                    files: [{
                        attachment: body.message,
                        name: "dog.png"
                    }]
                }).then(() => msg.delete());
            }
        } catch (err) {
            message.reply("Unfortunately an error occurred.");
            console.error(err);
        }
    }
}