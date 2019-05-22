const { get } = require("snekfetch");
module.exports = {
    config: {
        name: "cat",
        aliases: []
    },
    run: async (bot, message, args) => {
        let msg = await message.channel.send(". . . Generating . . .");
        get("https://aws.random.cat/meow").then(async res => {
            await message.channel.send({
                files: [{
                    attachment: res.body.file,
                    name: "cat.png"
                }]
            }).then(msg.delete());
        });
    }
}