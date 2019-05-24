module.exports = {
    config: {
        name: "help",
        aliases: ["halp", "commands"]    
    },
    run: async (bot, message, args) => {
        if (!args[0]) {
            let yes = ['```xl', 'Moderating', 'Fun', 'Other', '```'];
            message.channel.send("**Please Search a module by doing $help module <module-name>. The modules are as follow, below.**");
            message.channel.send(yes.join("\n"));
            return message.channel.send("**Or if you want more info on a specific command, type $help <command-name>**");
        } else {
            if (args[0] == "module") {
                if (!args[1]) return message.channel.send("The modules are as follow: Moderating, Games, and Other."); 
                let toSend;
                switch (args[1].toLowerCase()) {
                    case "moderating":
                        toSend = ['```xl', '$addrole: "Add a role to someone"', '$ban: "Ban someone from the guild"', '$kick: "Kick someone from the guild"', '$mute: "Stop someone from talking"', '$purge: "Delete some messages from a channel fast"', '$removerole: "Remove a role from someone"', '$unmute: "Unmute someone whos already muted"', '$warn: "Warn someone if theyre doing something bad"', '```'];
                        break;
                    case "other":
                        toSend = ['```xl', '$botinfo: "Get some info on the bot"', '$calc: "Calculate a mathematical problem"', '$help: "Displays this message"', '$ping: "Gets the bots ping"', '$serverinfo: "Gets some info on the server"', '$urban: "Look up something on the urban dictionary"', '```'];
                        break;
                    case "fun":
                        toSend = ['```xl', '$8ball: "Get a cheesy answer to a question"', '```'];
                        break;
                    default:
                        return message.channel.send("That module was not found!");
                }
                return message.channel.send(toSend.join("\n"));
            } else {
                let msg;
                let pull;
                let gud;
                switch (args[0].toLowerCase()) {
                    case "addrole":
                        pull = require(`../moderating/addrole.js`);
                        if (pull.config.aliases == "" || !pull.config.aliases) {gud = "This command has no aliases."; } else {gud = pull.config.aliases;}
                        msg = ['```xl', 'Point of Command: Add a role to someone', 'Command Syntax: "$addrole <user> <rolename>"', 'Example: "$addrole @Chuck Moderator"', `Aliases: ${gud}`, '```'];
                        break;
                    case "ban":
                        pull = require(`../moderating/ban.js`);
                        if (pull.config.aliases == "" || !pull.config.aliases) {gud = "This command has no aliases.";} else {gud = pull.config.aliases;}
                        msg = ['```xl', 'Point of Command: Ban someone', 'Command Syntax: "$ban <user> <reason?>"', 'Example: "$ban @Jonas being rude"', `Aliases: ${gud}`, '```'];
                        break;
                    case "kick":
                        pull = require(`../moderating/kick.js`);
                        if (pull.config.aliases == "" || !pull.config.aliases) {gud = "This command has no aliases.";} else {gud = pull.config.aliases;}
                        msg = ['```xl', 'Point of Command: Kick someone', 'Command Syntax: "$kick <user> <reason?>"', 'Example: "$kick @Jack not following the rules"', `Aliases: ${gud}`, '```'];
                        break;
                    case "mute":
                        pull = require(`../moderating/mute.js`);
                        if (pull.config.aliases == "" || !pull.config.aliases) {gud = "This command has no aliases.";} else {gud = pull.config.aliases;}
                        msg = ['```xl', 'Point of Command: Mute someone', 'Command Syntax: "$mute <user> <reason?>"', 'Example: "$mute @Chuck spam"', `Aliases: ${gud}`, '```'];
                        break;
                    case "purge":
                        pull = require(`../moderating/purge.js`);
                        if (pull.config.aliases == "" || !pull.config.aliases) {gud = "This command has no aliases.";} else {gud = pull.config.aliases;}
                        msg = ['```xl', 'Point of Command: Delete some messages from a channel fast', 'Command Syntax: "$purge <amount of messages>"', 'Example: "$purge 50"', `Aliases: ${gud}`, '```'];
                        break;
                    case "removerole":
                        pull = require(`../moderating/removerole.js`);
                        if (pull.config.aliases == "" || !pull.config.aliases) {gud = "This command has no aliases.";} else {gud = pull.config.aliases;}
                        msg = ['```xl', 'Point of Command: Remove a role from someone', 'Command Syntax: "$removerole <user> <rolename>"', 'Example: "$removerole @Jonas Moderator"', `Aliases: ${gud}`, '```'];
                        break;
                    case "unmute":
                        pull = require(`../moderating/unmute.js`);
                        if (pull.config.aliases == "" || !pull.config.aliases) {gud = "This command has no aliases.";} else {gud = pull.config.aliases;}
                        msg = ['```xl', 'Point of Command: Unmute someone whos muted', 'Command Syntax: "$unmute <user>"', 'Example: "$unmute @Jack"', `Aliases: ${gud}`, '```'];
                        break;
                    case "warn":
                        pull = require(`../moderating/warn.js`);
                        if (pull.config.aliases == "" || !pull.config.aliases) {gud = "This command has no aliases.";} else {gud = pull.config.aliases;}
                        msg = ['```xl', 'Point of Command: Warn someone if theyre disobeying the rules', 'Command Syntax: "$warn <user> <reason>"', 'Example: "$warn @Chuck abusing permissions"', `Aliases: ${gud}`, '```'];
                        break;
                    case "botinfo":
                        pull = require(`../other/botinfo.js`);
                        if (pull.config.aliases == "" || !pull.config.aliases) {gud = "This command has no aliases.";} else {gud = pull.config.aliases;}
                        msg = ['```xl', 'Point of Command: Get some stats on the bot', 'Command Syntax: "$botinfo"', 'Example: "$botinfo"', `Aliases: ${gud}`, '```'];
                        break;
                    case "calc":
                        pull = require(`../moderating/calc.js`);
                        if (pull.config.aliases == "" || !pull.config.aliases) {gud = "This command has no aliases.";} else {gud = pull.config.aliases;}
                        msg = ['```xl', 'Point of Command: Calculate mathematical equation', 'Command Syntax: "$calc <equation>"', 'Example: "$calc 2+2"', `Aliases: ${gud}`, '```'];
                        break;
                    case "help":
                        pull = require(`../other/help.js`);
                        if (pull.config.aliases == "" || !pull.config.aliases) {gud = "This command has no aliases.";} else {gud = pull.config.aliases;}
                        msg = [`Displays this message!, Aliases: ${gud}`]
                        break;
                    case "ping":
                        pull = require(`../other/ping.js`);
                        if (pull.config.aliases == "" || !pull.config.aliases) {gud = "This command has no aliases.";} else {gud = pull.config.aliases;}
                        msg = ['```xl', 'Point of Command: Get the bots ping', 'Command Syntax: "$ping"', 'Example: "$ping"', `Aliases: ${gud}`, '```'];
                        break;
                    case "serverinfo":
                        pull = require(`../other/serverinfo.js`);
                        if (pull.config.aliases == "" || !pull.config.aliases) {gud = "This command has no aliases.";} else {gud = pull.config.aliases;}
                        msg = ['```xl', 'Point of Command: Get some info on the server youre in', 'Command Syntax: "$serverinfo"', 'Example: "$serverinfo"', `Aliases: ${gud}`, '```'];
                        break;
                    case "urban":
                        pull = require(`../other/urban.js`);
                        if (pull.config.aliases == "" || !pull.config.aliases) {gud = "This command has no aliases.";} else {gud = pull.config.aliases;}
                        msg = ['```xl', 'Point of Command: Look something up on urban dictionary', 'Command Syntax: "$urban <thing to look up>"', 'Example: "$urban dogs"', `Aliases: ${gud}`, '```'];
                        break;
                    case "8ball":
                        pull = require(`../fun/8ball.js`);
                        if (pull.config.aliases == "" || !pull.config.aliases) {gud = "This command has no aliases.";} else {gud = pull.config.aliases;}
                        msg = ['```xl', 'Point of Command: Get a cheesy answer to a question', 'Command Syntax: "$8ball <question>"', 'Example: "$8ball am i smart?"', `Aliases: ${gud}`, '```'];
                        break;
                    default:
                        return message.channel.send("That command was not found!");
                }
                return message.channel.send(msg.join("\n"));
            }
        }
    }
}