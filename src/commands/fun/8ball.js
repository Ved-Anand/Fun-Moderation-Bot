const { fullHelp } = require("../../../utils/usage");
module.exports = {
    config: {
        name: "8ball",
        usage: "$8ball <question>",
        description: "Get a cheesy answer to a question",
        permissions: "none"
    },
    run: async (bot, message, args) => {
        if (args[0] == "help") {
            let embed = fullHelp(bot, "8ball");
            return message.channel.send(embed);
        }
        let cmd = message.content.split(" ")[0];
        if(!args[2]) return message.channel.send(`Please ask a full question. \n Command Syntax: ${cmd} (question)`);
        let replies = ["Yes.", "No.", "I don't know.", "Ask again later!", "I refuse to answer this!", "no u boi", "tHaTs wHaT sHe SaId", `${message.author.username}, you're a bot`];
        let result = Math.floor((Math.random() * replies.length));
        return message.channel.send(replies[result]);
    }
}