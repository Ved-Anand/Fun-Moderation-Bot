const { readdirSync, lstatSync, readdir } = require("fs");

module.exports = (bot) => {
    const load = dirs => {
        const commands = readdirSync(`./commands/${dirs}/`).filter(d => d.endsWith('.js'));
        for (let file of commands) {
            let pull = require(`../commands/${dirs}/${file}`);
            bot.commands.set(pull.config.name, pull);
            if (pull.config.aliases) pull.config.aliases.forEach(a => bot.aliases.set(a, pull.config.name));
          };
        };
        readdir(`./commands/`, (err, files) => {
          if (err) console.log(err);
          var bettername = [];
          files.forEach((f, i) => {
            if (lstatSync(`./commands/${f}`)) {
              bettername.push(f);
            }
          });
          bettername.forEach(x => load(x));
        });
        require("./aliases")(bot)
};