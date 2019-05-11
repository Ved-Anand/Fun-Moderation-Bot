//NOTE: This command is not finished yet

const Discord = require("discord.js"); //get discord repo

module.exports.run = async (bot, message, args) => {
    message.channel.send("This command is not working as of right now. The commands will be visible to everyone shortly. If you want to get me onto your server, go to this url and select the server of your choice!");
    return message.channel.send("https://discordapp.com/oauth2/authorize?client_id=566802101183971363&scope=bot&permissions=2080898303");
}
module.exports.help = {
    name: "help"
}