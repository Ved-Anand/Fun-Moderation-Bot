const { ownerid } = require("../../botconfig.json");
const { readdir } = require('fs');
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
            if (jsfile.length === 0) return message.channel.send("0 files were found in that directory.");
            let tosend = [];
            jsfile.forEach((f, i) => {
                tosend.push(f);
            });
            return message.channel.send(tosend);
        });
    }
} 