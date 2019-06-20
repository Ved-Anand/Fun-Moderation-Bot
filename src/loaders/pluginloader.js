const logger = require("../../utils/logger"); //better console logging

module.exports = (bot, config) => {
  if (config.plugins && config.plugins.length) { //if there are plugins specified in botconfig file

    logger.info('. . . Plugins loading . . .'); 

    for (const plugin of config.plugins) {
      const pluginFn = require(`../plugins/${plugin}`);
      pluginFn.run(bot, config);
    }
    //for each of these plugins run them

    logger.log(`Successfully loaded ${config.plugins.length} plugin(s).`);
  }
  logger.info(`${bot.user.username} is 100% online!`);
}