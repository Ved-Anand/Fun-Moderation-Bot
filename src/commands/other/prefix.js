const { PermissionsBitField } = require("discord.js");
const errors = require("../../../utils/errors.js");
const usage = require("../../../utils/usage"); 
const fs = require("fs");

module.exports = {
    config: {
        name: "prefix",
        usage: "prefix <string>",
        description: "Change the prefix",
        permissions: "Manage Server"
    },
    run: async (bot, message, args) => {
        if (message.channel.type == "dm") return;

        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !message.member.permissions.has(PermissionsBitField.Flags.ManageGuild)) return errors.noPerms(message, "Manage Server");

        if (!args[0]) return message.channel.send("No Prefix was given.");
        if(args[0] == "help") return message.channel.send({ embeds: [usage.fullHelp(bot, "prefix", message)] });
        
        if (args[0].length > 3) return message.channel.send("Prefix length is too long.");

        let changedPrefix = args[0];

        let data = require("../../models/storage/prefix.json");

        let append = data;

        append[message.guild.id] = {
            prefix: changedPrefix
        };

        fs.writeFileSync("src/models/storage/prefix.json", JSON.stringify(append));

        return message.channel.send(":white_check_mark: Changed prefix to " + args[0]);
        
    }

}