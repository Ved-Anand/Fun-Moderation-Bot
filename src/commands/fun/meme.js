const randomPuppy = require("random-puppy");
const snekfetch = require("snekfetch");

module.exports = {
    config: {
        name: "meme",
        aliases: ["memes", "mem"],
        usage: "$meme",
        description: "Get a meme from the dankmemes subreddit",
        permissions: "none"
    },
    run: async (bot, message, args) => {
        let reddit = [
            "dankmemes"
        ]
        // let subreddit = reddit[Math.floor(Math.random() * reddit.length - 1)];
        let subreddit = reddit[0];
        let msg = await message.channel.send("...Generating...");

        randomPuppy(subreddit).then(url => { //url = image
            snekfetch.get(url).then(async res => { //get that url, res = image
                await message.channel.send({ //send the image
                    files: [{
                        attachment: res.body,
                        name: 'meme.png'
                    }]
                }).then(() => msg.delete()); //delete ...generating... message after sent meme
            });
        });
    }
}