const Long = require("long");
module.exports = async (bot, guild) => {
    const getDefaultChannel = (theGuild) => {
        if (theGuild.channels.has(theGuild.id)) return theGuild.channels.get(theGuild.id);
        const generalChannel = theGuild.channels.find(channel => channel.name === "general");
        if (generalChannel) return generalChannel;
        return theGuild.channels
            .filter(c => c.type === "text" &&
                c.permissionsFor(theGuild.client.user).has("SEND_MESSAGES"))
            .sort((a, b) => a.position - b.position || 
                Long.fromString(a.id).sub(Long.fromString(b.id)).toNumber())
            .first();
    } 
    const channel = getDefaultChannel(guild);
    channel.send(`Sup! I'm Fyre, a multipurpose bot intended for moderation! The default command prefix is !, to get a list of the current commands, type !help.`);
}