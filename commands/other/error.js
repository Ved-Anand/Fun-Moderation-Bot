const errors = require("../../utils/othererrors.js");
module.exports = {
    config: {
        name: "error",
        usage: "$error <error id>",
        description: "Get info on an error id",
        permissions: "none"
    },
    run: async (bot, message, args) => {
        let id = args[0]
        if (!id) return message.channel.send("Please supply an error id.");
        let fix = errors.findError(id);
        message.channel.send(fix);
    }
}