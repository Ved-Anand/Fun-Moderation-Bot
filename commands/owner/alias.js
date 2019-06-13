const { appendFileSync } = require("fs");
const { ownerid } = require("../../src/loaders/reader");
module.exports = {
    config: {
        name: "alias",
        aliases: ["makealias", "bind"]
    },
    run: async (bot, message, args) => {
        if (message.author.id != ownerid) return;
        let alias = args[0];
        if (!alias) return message.channel.send("Please specify an alias.");
        let origin = args[1];
        if (!origin) return message.channel.send("Please specify what that alias should do.");
        appendFileSync("src/aliases.txt", `\n${alias}:${origin}`);
        require("../../handlers/aliases")(bot);
        return message.channel.send(`Successfully binded ${alias} to ${origin}`);
    }
}