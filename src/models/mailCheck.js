module.exports = async (bot, message, guild, prefix)  => {

    if (message.content.startsWith(prefix)) return;

    let channels = require("./channels.json");

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