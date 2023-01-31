module.exports = async (bot, message, guild, prefix)  => {

    if (message.content.startsWith(prefix)) return;

    // block check
    let blocks = require("./storage/blocks.json");
    let blocked = false;
    Object.keys(blocks).forEach(elem => {
        if (blocks[elem].includes(message.author.id)) return blocked = true;
    });
    
    if (blocked) return message.channel.send("You can't message someone you've just blocked from using the mail service.");

    let channels = require("./storage/channels.json");

    if (channels[guild.id] == undefined || channels[guild.id].length == 0) return false;

    let channel, user;

    for (var i = 0; i < channels[guild.id].length; i++) {

        user = await bot.users.fetch(channels[guild.id][i]).catch(() => null);
        channel = guild.channels.cache.find(chan => chan.name === user.username.toLowerCase());
        if (channel == message.channel) break;
        
        if (i == channels[guild.id].length - 1) return false;
    }

    return user.send(`**Moderator ${message.author.username}: ** ${message.content}`);

}