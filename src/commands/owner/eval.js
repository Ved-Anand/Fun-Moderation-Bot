const { inspect } = require("util");
const { ownerid } = require("../../loaders/reader"); //get ownerid from botconfig file

module.exports = {
    config: {
        name: "eval",
        aliases: ["find", "calc", "calculate"]
    },
    run: async (bot, message, args) => {
        if (message.author.id != ownerid) return; //only owner can use

        let toEval = args.join(" ");

        try {
            let evaluated = inspect(eval(toEval, { depth: 0 } ))
            if (!toEval) return message.channel.send("Error: `Cannot evaluate air!`");

            if (evaluated.length > 1950) return message.channel.send("Error: `Request is too long.`");

            let hrDiff = process.hrtime(process.hrtime());
            
            message.channel.send(`*Executed in ${hrDiff[0] > 0 ? `${hrDiff[0]}s` : ''}${hrDiff[1] / 1000000}ms.*\`\`\`javascript\n${evaluated}\n\`\`\``, { maxLength: 1900 });
        } catch(e) {
            message.channel.send(`...An error occurred...: \`${e.message}\``);
        }
    } 
}