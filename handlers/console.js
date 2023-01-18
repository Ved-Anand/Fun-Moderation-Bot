const { inspect } = require("util");
const logger = require("../utils/logger"); //better console logging
let sending = false;

logger.log("Note: If you want to exit the bot, type exit into the console.");

module.exports = (bot) => {
    let prompt = process.openStdin();

    prompt.addListener("data", res => {
        let x = res.toString().trim().split(/ +/g)
        let args = res.toString().split(" ");
        x = x.join(" ");
        //x = whatever user types into console

        if (sending == true && !x.startsWith("send")) { 
            //if sending set to true, and user did not type send as they might be trying to turn off send mode run this
            if (x === '') return logger.log("cannot send air!");
            bot.channels.cache.get(/* Put a channel id here: */"").send(x); 
            //if you want to type out a message using the bot in some channel for whatever purpose and the bot is in that server, replace the above text with channel ID>
        } else if (x.startsWith("send")) {
            if (sending == true) {
                sending = false;
                logger.log("turned off sending mode")
            } else {
                sending = true;
                logger.log("turned on sending mode")
            }

        } else if (x.startsWith("info") || x.startsWith("help")) {
            logger.info("Console Administrative Panel Information: \n 1. To send a message from the console, type send , and then the message. \n 2. To exit, type exit. \n 3. To 'clear' the screen, type clear.");
        } else if (x.startsWith("exit")) {
            logger.info(". . . Aborting . . .");;
            process.exit();
        } else if (x.startsWith("eval")) {
            try {

                let toEval = args.join(" "); 
                toEval = toEval.replace("eval", ""); //get rid of the eval in the message

                let evaluated = inspect(eval(toEval, { depth: 0 } )) //actually evaluate it
                if (!toEval) {
                    logger.error("Error: `Cannot evaluate air!`");
                    return;
                }

                logger.log(`${evaluated}`); //log the evaluated code
            } catch(e) {    
                logger.error(`...An error occurred...: \`${e.message}\``);
            }   

        } else if (x.startsWith("clear")) {
            var lines = process.stdout.getWindowSize()[1]; // i built this cuz i have ocd ok
            for (var i = 0; i < lines; i++) {
                console.log('\r\n');
            }
        } else {}
    });
}