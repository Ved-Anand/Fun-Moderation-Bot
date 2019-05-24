const randomPuppy = require("random-puppy");
const snekfetch = require("snekfetch");
module.exports = {
    config: {
        name: "meme",
        aliases: ["memes", "mem"]
    },
    run: async (bot, message, args) => {
        let reddit = [
            "dankmemes"
        ]
        // let subreddit = reddit[Math.floor(Math.random() * reddit.length - 1)];
        let subreddit = reddit[0];
        let msg = await message.channel.send("...Generating...");
        randomPuppy(subreddit).then(url => {
            snekfetch.get(url).then(async res => {
                await message.channel.send({
                    files: [{
                        attachment: res.body,
                        name: 'meme.png'
                    }]
                }).then(() => msg.delete());
            });
        });
    }
}