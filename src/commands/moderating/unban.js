const errors = require("../../../utils/errors"); 
const usage = require("../../../utils/usage"); 

module.exports = {
    config: {
        name: "unban",
        aliases: ["unbanish", "removeban", "pardon"],
        usage: "unban <user/userid> <reason>",
        description: "Unban someone from the server if you for some reason forgive them.",
        permissions: "ban members"
    },
    run: async (bot, message, args) => {
        if (message.channel.type == "dm") return;

        if(args[0] == "help") return message.channel.send({ embeds: [usage.fullHelp(bot, "unban")] });

        if(!message.member.permissions.has(["BAN_MEMBERS", "ADMINISTRATOR"])) return errors.noPerms(message, "Ban Members");
        if(!message.guild.me.permissions.has(["BAN_MEMBERS", "ADMINISTRATOR"])) return errors.lack(message.channel, "Ban Members");
        
        let ubUser = args[0].replace("<", "").replace("@", "").replace(">", "");
       
        let ubReason = args.join(" ").slice(22);
        if(!ubReason) ubReason = "No reason given";

        try {
            await message.guild.members.unban(ubUser, {reason: ubReason} )
            .then(() => {
                return message.channel.send("User was unbanned.");
            }) 
        } catch (e) {
            console.log(e);
            return message.channel.send("An error occurred. User picked may be invalid or not banned.");
        }
    }
}
