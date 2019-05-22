const randomPuppy = require("random-puppy");
module.exports = {
    config: {
        name: "dog",
        aliases: ["woof", "bark"]
    },
    run: async (bot, message, args) => {
        randomPuppy()
            .then(url => {
                return message.channel.send(url);
            }).catch(() => {
                return message.channel.send("Unfortunately, an error occurred.");
            });
    }
}