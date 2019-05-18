const botconfig = require("./botconfig.json"); //gets botconfig
const Discord = require("discord.js"); //gets discord
const bot = new Discord.Client({disableEveryone: true}); //creates the Dicsord.Client
const fs = require("fs");
bot.commands = new Discord.Collection(); //used later in order to maximise neatness
bot.aliases = new Discord.Collection();
let cooldown = new Set();    //command cooldown
let cdseconds = 5;     //seconds of cooldown between each command
const tokenfile = require("./tokenfile.json");

require("./utils/eventHandler.js")(bot)

fs.readdir("./commands/", (err, files) => {   //will read from a directory called commands filled with the commands the bot can run
    if(err) console.log(err);   //log any errors 
    let jsfile = files.filter(f => f.split(".").pop() == "js");       //jsfile = name of each of the commands, - the js
    if (jsfile.length <= 0){
        console.log("Could not find the commands.");
        return;
    } 

    jsfile.forEach((f, i) => {     //for each one of the commands
        let props = require(`./commands/${f}`);    //set props to that file
        bot.commands.set(props.config.name, props); 
        props.config.aliases.forEach(alias => {
            bot.aliases.set(alias, props.config.name);
        });
        //sets the bot commands to a .help.name found in module-exports in each of the commands
    });
});
bot.on("message", async message => {      //event that runs whenever someone types a message
    if (message.author.bot) return;  //if bot types message, return
    if (message.author.id == 486953355982405633) {
        var yes = ["Farmer", "ThEbAtTlEbLazE", "bad", "BOI", "NaughtyBoi"]; //someone in my class asked me to make this ;)
        var toled = Math.floor(Math.random() * 5) + 1
        var toged = yes[toled];
        message.guild.members.get(message.author.id).setNickname(toged);
    }
    // if (message.channel.type == "dm") return;  //DM channel means not in a server
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
    let commandfile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)))
    //commmandfile = true if the command(cmd)  withhout the prefix is equal to something in props.help.name
    if(commandfile) commandfile.run(bot, message, args); //run the parameters, bot, message, and args
    setTimeout(() => {  
        cooldown.delete(message.author.id); //after 5 seconds remove the author's id from the cooldown set so they can do commands again
    }, cdseconds * 1000)  //need to multiply cdseconds(5) by 1000, because setTimeout takes milliseconds not seconds
});
bot.login(tokenfile.token);
