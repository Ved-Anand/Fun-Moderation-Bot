const errors = require("../../../utils/errors.js"); //better errors
const usage = require("../../../utils/usage.js"); //better help-messages
const { prefix } = require("../../loaders/reader") //get prefix from botconfig

module.exports = {
    config: {
        name: "mute",
        aliases: ["nospeak"],
        usage: "$mute <user> <reason>",
        description: "Stop someone from talking if they're spamming, etc.",
        permissions: "manage roles"
    },
    run: async (bot, message, args) => {
        if (message.channel.type == "dm") return message.channel.send("This command only works in a server!");
        if(!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner) return errors.noPerms(message, "MANAGE_ROLES");
        if(!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return errors.lack(message.channel, "MANAGE_ROLES");

        let cmd = message.content.split(" ")[0].replace(prefix, ''); //used because command aliases
        if(args[0] == "help") return message.channel.send(usage.fullHelp(bot, cmd));

        let mutee = message.mentions.members.first() || message.guild.members.get(args[0]);
        if(!mutee) return errors.cantfindUser(message.channel);

        if(mutee.id == bot.user.id) return errors.botuser(message, "mute");

        if (mutee.hasPermission("MANAGE_ROLES")) return errors.equalPerms(message, mutee, "MANAGE_ROLES");

        let reason = args.slice(1).join(" "); 
        if(!reason) reason = "No reason was given!";

        let muterole = message.guild.roles.find(r => r.name === "muted") //look to see if muted role already exists

        if(!muterole) { //if not
            try{
                muterole = await message.guild.createRole({
                    name: "Muted",
                    color: "#514f48",
                    permissions: [] //create muterole name + color
                });
                message.guild.channels.forEach(async (channel, id) => {
                    await channel.overwritePermissions(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false,
                        SEND_TTS_MESSAGES: false,
                        ATTACH_FILES: false,
                        SPEAK: false
                    });  //will overwrite permissiosn for each channel to make it so that the user can't speak
                });
            } catch(e) {
                console.log(e.stack); //if err log err
            }
        }
        //end of create role muted

        if(mutee.roles.has(muterole.id)) return message.channel.send(`${mutee} is already muted!`); //check if user is already muted
        mutee.addRole(muterole.id); //if not add role
        return message.channel.send(`${mutee} has been muted! Reason: ${reason}`);
    }
}
