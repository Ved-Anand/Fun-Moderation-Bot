const { readdirSync, lstatSync, readdir } = require("fs");
const config = require("../src/loaders/reader");
module.exports = (bot) => {
    const load = dirs => {
        const commands = readdirSync(`./src/commands/${dirs}/`).filter(d => d.endsWith('.js'));
        for (let file of commands) {
            let pull = require(`../src/commands/${dirs}/${file}`);
            bot.commands.set(pull.config.name, pull);
            if (pull.config.aliases) pull.config.aliases.forEach(a => bot.aliases.set(a, pull.config.name));
          };
        };
        readdir(`./src/commands/`, (err, files) => {
          if (err) console.log(err);
          var bettername = [];
          files.forEach((f, i) => {
            if (lstatSync(`./src/commands/${f}`)) {
              bettername.push(f);
            }
          });
          bettername.forEach(x => load(x));
        });
        require("./aliases")(bot)
        if (config.plugins && config.plugins.length) {
          console.log('. . . Plugins loading . . .');
          for (const plugin of config.plugins) {
            const pluginFn = require(`../src/plugins/${plugin}`);
            pluginFn.run(bot, config);
          }
          console.log(`Successfully loaded ${config.plugins.length} plugin(s).`);
        }
};