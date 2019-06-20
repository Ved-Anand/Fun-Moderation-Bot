const { get } = require("snekfetch");

module.exports = {
    config: {
        name: "cat",
        usage: "$cat",
        description: "Get an image of a random cat",
        permissions: "none"
    },
    run: async (bot, message, args) => {
        let msg = await message.channel.send(". . . Generating . . .");

        get("https://aws.random.cat/meow").then(async res => { //get cat image, res = pic
            await message.channel.send({ //send message
                files: [{
                    attachment: res.body.file,
                    name: "cat.png"
                }]
            }).then(msg.delete()); //after message sent delete ...generating... message
        });
    }
}