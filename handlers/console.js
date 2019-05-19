module.exports = (bot) => {
    let prompt = process.openStdin()
    prompt.addListener("data", res => {
        let x = res.toString().trim().split(/ +/g)
        if (x != "") {
            bot.channels.get("576452367285878786").send(x.join(" "));
        }
    });
}