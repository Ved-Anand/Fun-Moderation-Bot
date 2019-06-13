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
## Reccommended plugin by github user TJ5 to test if you are using right version of node/errors/have all modules installed. Below are steps on how you can get it.
In the plugins element of the botconfig file, add the string "tester" to it.
```json
{
    "plugins": ["tester"]
}
```
Next create a file in the plugins directory, and call it tester.js. In the file, copy/paste this code:
```javascript
module.exports.run = async (bot, config) => {
    const nodeMajorVersion = parseInt(process.versions.node.split('.')[0, 10]);
    if (nodeMajorVersion < 10) {
        console.error('This is an unsupported NODE.JS version. Please install and use NODE.JS 10 or newer');
        process.exit(1);
    }
    const { accessSync } = require("fs");
    const path = require("path");
    try {
        accessSync(path.join(__dirname, '../..', 'node_modules'));
    } catch (e) {
        console.error('TESTER PLUGIN: Please run npm install before starting the bot, the node_modules directory was not found.');
        process.exit(1);
    }
    process.on("uncaughtException", err => {
        console.error(err);
        process.exit(1);
    });
    try {
        const packageJson = require("../../package.json");
        const modules = Object.keys(packageJson.dependencies);
        modules.forEach(mod => {
            accessSync(path.join(__dirname, '../..', 'node_modules', mod));
        });
    } catch (e) {
        console.error(`TESTER PLUGIN: Please run npm install again, as we have found you have a package missing.`);
        process.exit(1);
    }
}
```
Save the file, and you're done. Now you have quick module checker!
