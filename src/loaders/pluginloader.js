const logger = require("../../utils/logger");
module.exports = (bot, config) => {
  if (config.plugins && config.plugins.length) {
    logger.info('. . . Plugins loading . . .');
    for (const plugin of config.plugins) {
      const pluginFn = require(`../plugins/${plugin}`);
      pluginFn.run(bot, config);
    }
    logger.log(`Successfully loaded ${config.plugins.length} plugin(s).`);
    logger.info(`${bot.user.username} is 100% online!`);
  }
}