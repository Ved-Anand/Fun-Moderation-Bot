const urban = require("urban");

module.exports = {
    config: {
        name: "urban",
        aliases: ["define", "see", "lookup"]
    },
    run: async (bot, message, args) => {
        var targetWord = args == "" ? urban.random() : urban(args);
        if (args[0].toLowerCase() == "ved") {
            return message.channel.send("Lol no");
        }
        if (message.author.id == 460609573300994048) {
            return message.channel.send("Lol no kedar xD");
        }
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