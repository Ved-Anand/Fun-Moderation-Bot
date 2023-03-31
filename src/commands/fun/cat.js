const { get } = require("snekfetch");
const { SlashCommandBuilder, ChatInputCommandInteraction } = require("discord.js");
const https = require("https");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cat')
        .setDescription('Get an image of a random cat')
        .setDMPermission(false),
    config: {
        name: "cat",
        usage: "cat",
        description: "Get an image of a random cat",
        permissions: "none"
    },
    run: async (bot, message, args) => {

        // this command is completely bugged at the moment. not sure why.

        try {
            let out = get("https://aws.random.cat/meow").then(async res => { 
                if (message instanceof ChatInputCommandInteraction) {
                    await message.reply({ 
                        files: [{
                            attachment: res.body.file,
                            name: "cat.png"
                        }]
                    }).then(msg.delete());
                } else {
                    await message.channel.send({ 
                        files: [{
                            attachment: res.body.file,
                            name: "cat.png"
                        }]
                    }).then(msg.delete());
                }
            });
            out.on('error', function(err) {
                console.log(err);
                return message.reply("Unfortunately an error occurred.");
            });
        } catch (err) {
            message.reply("Unfortunately an error occurred.");
            console.error(err);
        }
    }
}