module.exports = async bot => {
    console.log(`${bot.user.username} is online`)
   bot.user.setActivity("MODERATING.GIF", {type: "STREAMING"});
}