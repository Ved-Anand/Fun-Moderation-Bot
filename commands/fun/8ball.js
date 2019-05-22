module.exports = {
    config: {
        name: "8ball",
        aliases: []
    },
    run: async (bot, message, args) => {
        if(!args[2]) return message.channel.send("Please ask a full question. \n Command Syntax: $8ball (question)");
        let replies = ["Yes.", "No.", "I don't know.", "Ask again later!", "I refuse to answer this!", "no u boi", "tHaTs wHaT sHe SaId", `${message.author.username}, you're a bot`];
        let result = Math.floor((Math.random() * replies.length));
        return message.channel.send(replies[result]);
    }
}