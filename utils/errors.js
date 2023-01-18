const { MessageEmbed } = require("discord.js");
let config = require("../src/loaders/reader"); 

function noPerms(message, perm) {
    let embed = new MessageEmbed()
        .setTitle("No Perms")
        .setColor(config.red)
        .addField("Insufficient permission:", perm);
    message.channel.send({embeds: [embed] })
        .then(m => {
            setTimeout(() => m.delete(), 4000)
        })
}

function equalPerms(message, user, perms) {
    let embed = new MessageEmbed()
        .setColor(config.red)
        .setTitle("Error")
        .addField(`${user.user.username} has equal or higher perms to you through the permission`, perms);
    message.channel.send({embeds: [embed] })
        .then(m => {
            setTimeout(() => m.delete(), 4000)
        })
}

function botuser(message, command) {
    let embed = new MessageEmbed()
        .setTitle("Error")
        .setDescription(`You cannot ${command} me!`)
        .setColor(config.red);
    message.channel.send({embeds: [embed] })
        .then(m => {
            setTimeout(() => m.delete(), 4000)
        })
} 

function cantfindUser(channel) {
    let embed = new MessageEmbed()
        .setTitle("Error")
        .setDescription("That user was not found!")
        .setColor(config.red);
    channel.send({embeds: [embed] })
        .then(m => {
            setTimeout(() => m.delete(), 4000)
        })
}

function noRole(channel) {
    let embed = new MessageEmbed()
        .setTitle("Error")
        .setDescription("That role was not found!")
        .setColor(config.red);
    channel.send({embeds: [embed] })
        .then(m => {
            setTimeout(() => m.delete(), 4000)
        })
}

function lack(channel, perm) {
    let embed = new MessageEmbed()
        .setTitle("I don't have enough permissions.")
        .setColor(config.red)
        .addField("I do not have the permission", perm);
    channel.send({embeds: [embed] })
        .then(m => {
            setTimeout(() => m.delete(), 4000)
        })
}

function notBanned(channel, id) {
    let embed = new MessageEmbed()
        .setTitle("Error")
        .setDescription(`User with the ID ${id} isn't banned.`)
        .setColor(config.red);
    channel.send({embeds: [embed] })
        .then(m => {
            setTimeout(() => m.delete(), 4000)
        })
}

module.exports = {
    noPerms,
    equalPerms,
    botuser,
    cantfindUser,
    noRole,
    lack,
    notBanned
}
