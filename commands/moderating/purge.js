const errors = require("../../utils/errors.js"); //get errors file
//Point of command: Delete messages from a channel fast
//Command Syntax: $purge <number of messages>

module.exports = {
    config: {
        name: "purge",
        aliases: ["del", "delete", "clear"],
        usage: "$purge <amount of messages>",
        description: "Delete up to 100 messages at a time from a channel fast",
        permissions: "manage messages"
    },
    run: async (bot, message, args) => {
        if (message.channel.type == "dm") return message.channel.send("This command only works in a server!");
        if(!message.member.hasPermission("MANAGE_MESSAGES") && message.author.id != 559498763010310144) return errors.noPerms(message, "MANAGE_MESSAGES");
        if(!message.guild.me.hasPermission(["MANAGE_MESSAGES", "ADMINISTRATOR"])) return errors.lack(message.channel, "MANAGE_MESSAGES");
        //if command author not have required perms return errors no Perms function()
        //if bot not have required perms return lack function()
        let cmd = message.content.split(" ")[0];
        if(args[0] == "help") return message.channel.send(`Usage: ${cmd} (number of messages)`);
        if(isNaN(args[0])) return message.channel.send(`Usage: ${cmd} (number of messages)`);
        if (args[0] > 100) return message.channel.send("No deleting over 100 messages at a time to prevent lag, please!");
        if(args[0] == 0) return message.channel.send("You cannot delete 0 messages!");
        const fetched = await message.channel.fetchMessages({limit: args[0]});
        await message.channel.bulkDelete(fetched).catch(() => {
            message.channel.send("**-Unfortunately an error occurred, try doing the command again, maybe the messages are over 14 days old?**");
        });
        message.channel.send(`Successfully deleted ${args[0]} messages`).then(msg => msg.delete(2000));
    }
}