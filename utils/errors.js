const { EmbedBuilder } = require("discord.js");
let config = require("../src/loaders/reader"); 

function noPerms(message, perm) {
    let embed = new EmbedBuilder()
        .setTitle("No Perms")
        .setColor(config.red)
        .addFields({
            name: "Insufficient permission:", value: perm, inline: true
        });
    message.channel.send({embeds: [embed] })
        .then(m => {
            setTimeout(() => m.delete(), 4000)
        })
}

function equalPerms(message, user, perms) {
    let embed = new EmbedBuilder()
        .setColor(config.red)
        .setTitle("Error")
        .addFields({
            name: ' ', value: `${user.user.username} has equal or higher perms to you through the permission ${perms}`, inline: true
        });
    message.channel.send({embeds: [embed] })
        .then(m => {
            setTimeout(() => m.delete(), 4000)
        })
}

function botuser(message, command) {
    let embed = new EmbedBuilder()
        .setTitle("Error")
        .setDescription(`You cannot ${command} me!`)
        .setColor(config.red);
    message.channel.send({embeds: [embed] })
        .then(m => {
            setTimeout(() => m.delete(), 4000)
        })
} 

function cantfindUser(channel) {
    let embed = new EmbedBuilder()
        .setTitle("Error")
        .setDescription("That user was not found!")
        .setColor(config.red);
    channel.send({embeds: [embed] })
        .then(m => {
            setTimeout(() => m.delete(), 4000)
        })
}

function noRole(channel) {
    let embed = new EmbedBuilder()
        .setTitle("Error")
        .setDescription("That role was not found!")
        .setColor(config.red);
    channel.send({embeds: [embed] })
        .then(m => {
            setTimeout(() => m.delete(), 4000)
        })
}

function lack(channel, perm) {
    let embed = new EmbedBuilder()
        .setTitle("I don't have enough permissions.")
        .setColor(config.red)
        .addFields({
            name: ' ', value: "I do not have the permission" + perm, inline: true
        });
    channel.send({embeds: [embed] })
        .then(m => {
            setTimeout(() => m.delete(), 4000)
        })
}

function notBanned(channel, id) {
    let embed = new EmbedBuilder()
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
