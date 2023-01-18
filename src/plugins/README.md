# Plugins
## Note: Errors might occur
This bot allows you to create your own custom plugins.
To begin, in the plugins folder, we would create a plugin file. We can name this whatever we want. For example, let's name our plugin test.js. In this file, we would start coding our plugin. Example plugin below:
```js
module.exports.run = async (bot, config) => {
    //code goes here
    console.log('My first plugin!');
}
```
When the plugins are run, they are run with 2 parameters passed, bot and config. The bot is simple, it is merely the discord.js client. The config parameter is set to whichever parameters you passed through in the botconfig file.

To make certain javascript files you make in the plugins folder not count as a plugin. What you need to do is make a new key in the botconfig file called notplugins, and set its value to an array equal to the names of the files you don't want to count as plugins. Example:
```json
{
    "notplugins": ["notaplugin"]
}
```
By doing this, the file "notaplugin.js" in the plugins folder will not be treated as a plugin.
Do note that in a plugin, the only two things that are sent through the exports are the bot and config parameters - no message parameter. This means that a plugin is most definitely not a substitute for a command - instead one should only make a plugin if they are trying to add whatever code to the bot that is not dependent on a user's message. 