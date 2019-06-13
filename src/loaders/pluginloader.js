module.exports = (bot, config) => {
  if (config.plugins && config.plugins.length) {
    console.log('. . . Plugins loading . . .');
    for (const plugin of config.plugins) {
      const pluginFn = require(`../plugins/${plugin}`);
      pluginFn.run(bot, config);
    }
    console.log(`Successfully loaded ${config.plugins.length} plugin(s).`);
  }
}