const Discord = require("discord.js");
let config = require("../src/loaders/reader");


module.exports.noPerms = (message, perm) => {  //parameters = message, and permission
    let embed = new Discord.RichEmbed()
        .setAuthor(message.author.username)
        .setTitle("NO PERMS")
        .setColor(config.red)  //examples of those set colors
        .addField("Insufficient permission:", perm);
    message.channel.send(embed).then(m => m.delete(4000));
} //if a command is run and author does not have required perms, it will run this function

module.exports.equalPerms = (message, user, perms) => { //parameters = message, user, and permissions
    let embed = new Discord.RichEmbed()
        .setAuthor(message.author.username)
        .setColor(config.red)
        .setTitle("Error")
        .addField(`${user.user.username} has perms`, perms);
    message.channel.send(embed).then(m => m.delete(4000));  
} /*if command is run and command author wants to run a command such as the ban command against a user with the same perms
 as the author, this command will run */

module.exports.botuser = (message, command) => { //parameters = message
    let embed = new Discord.RichEmbed()
        .setTitle("Error")
        .setDescription(`You cannot ${command} a bot!`)
        .setColor(config.red);
    message.channel.send(embed).then(m => m.delete(4000));
} // if command is run, and specified user = bot, return by running this function 

module.exports.cantfindUser = (channel) => { //parameters = channel in which message was sent
    let embed = new Discord.RichEmbed()
        .setTitle("Error")
        .setDescription("That user was not found!")
        .setColor(config.red);
    channel.send(embed).then(m => m.delete(3000));
}  //if command is run and specified user was not found, return by running this function

module.exports.noRole = (channel) => { //parameters = channel in which message was sent
    let embed = new Discord.RichEmbed()
        .setTitle("Error")
        .setDescription("That role was not found!")
        .setColor(config.red);
    channel.send(embed).then(m => m.delete(3000));
}  //will only be used in commands that deal with Roles, such as addrole command, or removerole command

module.exports.lack = (channel, perm) => { //parameters = channel in which command request was sent
    let embed = new Discord.RichEmbed()
        .setTitle("I DONT HAVE ENOUGH PERMS")
        .setColor(config.red)
        .addField("I do not have the permission", perm);
    channel.send(embed).then(m => m.delete(3000));
} //if BOT itself does not have required perms to run command, return with this function