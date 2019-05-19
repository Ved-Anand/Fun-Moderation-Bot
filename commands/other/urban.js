const urban = require("urban");

module.exports = {
    config: {
        name: "urban",
        aliases: ["lookup", "define", "see"]
    },
    run: async (bot, message, args) => {
        var targetWord = args == "" ? urban.random() : urban(args);
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