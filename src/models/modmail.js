const { ChannelType } = require("discord.js");
const fs = require('fs');
const { categoryID } = require("../loaders/reader");

module.exports.execute = async (bot, message, guild) => {

    let channel = guild.channels.cache.find(chan => chan.name === message.author.username.toLowerCase());

    let data = require("./channels.json");
    let append = data;

    if (append[guild.id] != undefined) {

        if (!append[guild.id].includes(message.author.id)) {

            append[guild.id].push(message.author.id);

        }

    } else append[guild.id] = [message.author.id];

    fs.writeFileSync("src/models/channels.json", JSON.stringify(append));

    let hoisted = false;
    if (categoryID != null) hoisted = true;
    
    if (channel) {
        return channel.send(`**User ${message.author.username} sent:** ${message.content}`);
    } else {
        await guild.channels.create({
            name: message.author.username,
            type: ChannelType.GuildText,
            parent: hoisted ? categoryID : undefined
        });

        channel = guild.channels.cache.find(chan => chan.name === message.author.username.toLowerCase());
        channel.send(`**User ${message.author.username} sent:** ${message.content}`);

    }
}