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
            bot.channels.get("576452367285878786").send(x); 
            //if you want to freak out some of your friends, replace the number in quotations above with your channel id.
        } else if (x.startsWith("send")) {
            if (sending == true) {
                sending = false;
                logger.log("turned off sending mode")
            } else {
                sending = true;
                logger.log("turned on sending mode")
            }

        } else if (x.startsWith("info")) {
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
        } else {
            logger.log("Note: You have sending mode turned off! If you want to send a message, turn it on first by typing send in the console!");
        }
    });
}