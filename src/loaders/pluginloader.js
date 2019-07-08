const logger = require("../../utils/logger"); //better console logging
const { readdirSync } = require("fs");
module.exports = (bot, config) => {
  const plugins = readdirSync("./src/plugins").filter(c => c.endsWith(".js"));
  var nonJsPlugins = 0;
  if (plugins && plugins.length) {
    for (let plugin of plugins) {
      var without = plugin.split('.')[0];
      if (config.notplugins.includes(plugin) || config.notplugins.includes(without)) {
        nonJsPlugins++;
        continue;
      }
      const pluginFn = require(`../plugins/${plugin}`);
      pluginFn.run(bot, config);
    }
    logger.log(`Successfully loaded ${plugins.length - nonJsPlugins} plugin(s).`);
  }
  logger.info(`${bot.user.username} is 100% online!`);
}