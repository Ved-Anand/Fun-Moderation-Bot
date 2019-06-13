const { ownerid } = require("../../loaders/reader");
const { readdir, lstatSync } = require('fs');
module.exports = {
    config: {
        name: "dir",
        aliases: ["directory"],
    },
    run: async (bot, message, args) => {
        if (message.author.id != ownerid) return;
        if (!args[0]) return message.channel.send("Please specify a directory.");
        let directory = args[0].toLowerCase();
        readdir(`./commands/${directory}`, (err, files) => {
            if (err) return message.channel.send("That directory was not found.");
            //let jsfile = files.filter(f => f.split(".").pop() === "js");
            let jsfile = files;
            if (jsfile.length === 0) return message.channel.send("0 javascript files were found in that directory.");
            let tosend = [];
            jsfile.forEach((f, i) => {
                if (lstatSync(`./commands/${directory}/${f}`).isDirectory()) {
                    var gudname = f;
                    gudname = gudname.concat(" **directory**")
                } else var gudname = f;
                tosend.push(gudname);
            });
            return message.channel.send(tosend);
        });
    }
} 