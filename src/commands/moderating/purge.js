const { PermissionsBitField } = require("discord.js");
const errors = require("../../../utils/errors.js");
const usage = require("../../../utils/usage"); 

module.exports = {
    config: {
        name: "purge",
        aliases: ["del", "delete", "clear"],
        usage: "purge <amount of messages>",
        description: "Delete up to 100 messages at a time from a channel fast",
        permissions: "manage messages"
    },
    run: async (bot, message, args) => {
        if (message.channel.type == "dm") return message.channel.send("This command only works in a server!");

        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages) && !message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return errors.noPerms(message, "Manage Messages");
        if (!message.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageMessages) && !message.guild.members.me.permissions.has(PermissionsBitField.Flags.Administrator)) return errors.lack(message.channel, "Manage Messages");

        if(args[0] == "help") return message.channel.send({ embeds: [usage.fullHelp(bot, "purge")] });

        if(isNaN(args[0])) return message.channel.send(`Please send a number to delete not a word.`);

        if (args[0] > 100) return message.channel.send("Can't delete over 100 messages at one time because of API");
        if(args[0] == 0) return message.channel.send("You cannot delete 0 messages!");

        // const fetched = message.channel.fetchMessages({limit: args[0]});
        if (args[0] < 101) {
            try {
                await message.channel.bulkDelete(args[0]);
                if (args[0] > 40) {
                    message.channel.send(`Successfully deleted ${args[0]} messages`).then(msg => msg.delete(2000));
                } else return;
            } catch(e) {
                message.channel.send("Unfortunately an error occurred.");
                console.log(e);
            }
        } else {
            
        }
    }
}