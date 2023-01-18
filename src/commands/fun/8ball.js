const { fullHelp } = require("../../../utils/usage"); //good help message

module.exports = {
    config: {
        name: "8ball",
        usage: "8ball <question>",
        description: "Get a cheesy answer to a question",
        permissions: "none"
    },
    run: async (bot, message, args) => {
        if(args[0] == "help") return message.channel.send({ embeds: [usage.fullHelp(bot, "8ball")] });

        if(!args[2]) return message.channel.send("Please ask a full question.");
        //questions should be at least 3 words long

        let replies = [ "It is certain.", "It is decidedly so.", "Without a doubt.", "Yes definitely.",
        "You may rely on it.", "As I see it, yes.", "Most likely.", "Outlook good.", "Yes.", "Signs point to yes.",
        "Reply hazy, try again.", "Ask again later.", "Better not tell you now.", "Cannot predict now.",
        "Concentrate and ask again.", "Don't count on it.", "My reply is no.", "My sources say no.",
        "Outlook not so good.", "Very doubtful."];

        let result = Math.floor((Math.random() * replies.length)); 
        return message.channel.send(replies[result]);
    }
}
