const botconfig = require("./botconfig.json"); //gets botconfig
const Discord = require("discord.js"); //gets discord
const bot = new Discord.Client({disableEveryone: true}); //creates the Dicsord.Client
const fs = require("fs");
bot.commands = new Discord.Collection(); //used later in order to maximise neatness
let cooldown = new Set();    //command cooldown
let cdseconds = 5;     //seconds of cooldown between each command


fs.readdir("./commands/", (err, files) => {   //will read from a directory called commands filled with the commands the bot can run
    if(err) console.log(err);   //log any errors 
    let jsfile = files.filter(f => f.split(".").pop() == "js");       //jsfile = name of each of the commands, - the js
    if (jsfile.length <= 0){
        console.log("Could not find the commands.");
        return;
    } 

    jsfile.forEach((f, i) => {     //for each one of the commands
        let props = require(`./commands/${f}`);    //set props to that file
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props); 
        //sets the bot commands to a .help.name found in module-exports in each of the commands
    });
});


bot.on("ready", async () => {    //event to tell when bot is ready to go online 
    console.log(`${bot.user.username} is running on ${bot.guilds.size} servers!`);
    console.log(`${bot.user.username} is successfully running.`);
    bot.user.setActivity("MODERATING.GIF", {type: "STREAMING"});
});


bot.on("message", async message => {       //event that runs whenever someone types a message
    if (message.author.bot) return;  //if bot types message, return
    if (message.channel.type == "dm") return;  //DM channel means not in a server
    let prefix = botconfig.prefix;        //sets the prefix
    if (!message.content.startsWith(prefix)) return;   
    if(cooldown.has(message.author.id)) {    //set Cooldown from beginning
        message.delete();  
        return message.channel.send(`**${message.author.username}, please wait 4 seconds before doing a command again :)**`);
    } 
    if(message.author.id != 358731232764362762) {   //that number is the owner's id, so if it's him typing commands he doesn't get a cooldown >:)
        cooldown.add(message.author.id);  //if not previous condition, add id.
    }
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    //commmandfile = true if the command(cmd)  withhout the prefix is equal to something in props.help.name
    if(commandfile) commandfile.run(bot, message, args); //run the parameters, bot, message, and args
    setTimeout(() => {  
        cooldown.delete(message.author.id); //after 5 seconds remove the author's id from the cooldown set so they can do commands again
    }, cdseconds * 1000)  //need to multiply cdseconds(5) by 1000, because setTimeout takes milliseconds not seconds
});
bot.login(botconfig.token);    //bot logins with its token defined in botconfig
