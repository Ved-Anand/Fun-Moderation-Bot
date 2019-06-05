module.exports = async bot => {
    console.log(`${bot.user.username} is online!`);
    console.log(`${bot.user.username} is running on ${bot.guilds.size} servers!`);
    bot.user.setActivity("MODERATING.GIF", {type: "STREAMING"});
    console.log('Console Administrative Panel: To get information on what you can do from here, type info into the panel.')
}