const { findError } = require("../../../utils/othererrors.js");

module.exports = {
    config: {
        name: "helpmsg",
        usage: "$helpmsg <error id>",
        description: "Get info on an error id",
        permissions: "none",
        aliases: ["error"]
    },
    run: async (bot, message, args) => {
        let id = args[0];
        if (!id) return message.channel.send("Please supply an error id.");
        
        let fix = findError(id);
        message.channel.send(fix);
    }
}