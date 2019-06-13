# Plugins
## Note: This is still in beta-testing mode, and errors may occur.
This bot allows you to create your own custom plugins. To create a plugin, in your botconfig file, make a new element called "plugins", and set it equal to an array with the names of your plugin(s). You can have as many as you want. 
```json
{
    "plugins": ["test"]
}
```
Next, in this plugins folder, we would create the plugin file, which would be equal to the name we put in the plugins array. For example, in this scenario, since we put "test" in the plugins array, we would create a file called test.js. In this file, we would start coding our plugin. Example plugin below:
```js
module.exports.run = async (bot, config) => {
    //code goes here
    console.log('My first plugin!');
}
```
When the plugins are run, they are run with 2 parameters passed, bot and config. The bot is simple, it is merely the discord.js client. The config parameter is set to whichever parameters you passed through in the botconfig file.
