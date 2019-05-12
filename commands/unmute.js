const Discord = require("discord.js") //get discord repo
const errors = require("../utils/errors.js") //get errors file
const usage = require("../utils/usage.js"); //get usage file
//Point of Command: Unmute someone who's muted
//Command Syntax: $unmute <user> (reason) - optional

module.exports.run = async (bot, message, args) => {
    if(message.channel.type == "dm") return;
    if(!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner) return errors.noPerms(message, "MANAGE_ROLES");
    if(!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return errors.lack(message.channel, "MANAGE_ROLES");
    //if command author not have required perms return noPerms()
    //if bot not have required perms return lack()
    if(args[0] == "help") usage.reasonHelp("unmute", message.channel);

    let mutee = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!mutee) return errors.cantfindUser(message.channel);
    //if user not found return cantfinduser()

    let reason = args.slice(1).join(" "); 
    if(!reason) reason = "No reason was given!"; //default reason = No reason was given

    let muterole = message.guild.roles.find(r => r.name === "muted")
    if(!muterole) return message.channel.send("There is no mute role to remove!") //if no role

    if(!mutee.roles.has(muterole.id)) return message.channel.send("That user is not muted to begin with!"); //if not muted
    mutee.removeRole(muterole.id); //remove role
    return message.channel.send(`${mutee} has been unmuted! Reason: ${reason}`);
}
module.exports.help = {
    name: "unmute"
}
