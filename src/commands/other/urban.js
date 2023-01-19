const urban = require("urban");
const usage = require("../../../utils/usage.js"); 

module.exports = {
    config: {
        name: "urban",
        aliases: ["define", "see", "lookup"],
        usage: "urban <thing to lookup>",
        description: "Look something up on the urban dictionary",
        permissions: "none"
    },
    run: async (bot, message, args) => {
        var targetWord = args == "" ? urban.random() : urban(args);

        if(args[0] == "help") return message.channel.send({ embeds: [usage.fullHelp(bot, "urban")] });

		targetWord.first(function(json) {
			if (json) {
				var tosend = "Urban Dictionary: **" +json.word + "**\n\n" + json.definition;
				if (json.example) {
					tosend = tosend + "\n\n__Example__:\n" + json.example;
                }
				message.channel.send(tosend);
            } else {
				message.channel.send("No matches found");
            }
        });
    }
}