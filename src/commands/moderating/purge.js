const errors = require("../../../utils/errors.js"); //better errors
const second = require("../../../utils/othererrors.js"); //better errors

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
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return errors.noPerms(message, "MANAGE_MESSAGES");
        if(!message.guild.me.hasPermission(["MANAGE_MESSAGES", "ADMINISTRATOR"])) return errors.lack(message.channel, "MANAGE_MESSAGES");

        let cmd = message.content.split(" ")[0]; //because command aliases
        if(args[0] == "help") return message.channel.send(`Usage: ${cmd} (number of messages)`);

        if(isNaN(args[0])) return message.channel.send(`Usage: ${cmd} (number of messages)`); //must be number not word

        if (args[0] > 100) return message.channel.send("No deleting over 100 messages at a time to prevent lag, please!");
        if(args[0] == 0) return message.channel.send("You cannot delete 0 messages!");

        const fetched = await message.channel.fetchMessages({limit: args[0]});
        
        try {
            await message.channel.bulkDelete(fetched);
            if (args[0] > 40) {
                message.channel.send(`Successfully deleted ${args[0]} messages`).then(msg => msg.delete(2000));
            } else return;
        } catch(e) {
            let id = second.getError(e.message);
            message.channel.send(`**-Unfortunately an error occurred. Error ID: ${id}**`);
        }
    }
}