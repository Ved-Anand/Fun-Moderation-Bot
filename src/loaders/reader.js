const { accessSync, readFileSync } = require("fs");
const { parse } = require("json5");
let userConfig;
const configFiles = [
    'botconfig.json',
    'botconfig.json5',
    'botconfig.json.json',
    'botconfig.json.txt',
    'botconfig.js'
];
let foundConfigFile;
for (const configFile of configFiles) {
    try {
        accessSync(__dirname + '/../../' + configFile);
        foundConfigFile = configFile;
        break;
    } catch(e) {} 
}
if (!foundConfigFile) throw new Error(`Could not find botconfig.json!`);
try {
    if (foundConfigFile.endsWith(".js")) {
        userConfig = require(`../../${foundConfigFile}`);
    } else {
        const raw = readFileSync(__dirname + '/../../' + foundConfigFile);
        userConfig = parse(raw);
    }
} catch (e) {
    throw new Error(`Error while reading the botconfig file! Error: ${e.message}`);
}

const defaultConfig = {
    "token": null,
    "status": "Moderating servers!",
    "ownerid": null,
    "prefix": "!",
    "red": "#b70000",
    "orange": "#ff6a00",
    "green": "#00ff26",
    "purple": "#d604cf"
}
const required = ['token', 'ownerid'];
const finalConfig = Object.assign({}, defaultConfig);
for (const [prop, value] of Object.entries(userConfig)) {
    if (!defaultConfig.hasOwnProperty(prop)) {
        throw new Error(`${prop} is an invalid option for the botconfig file!`);
    }
    finalConfig[prop] = value;
}
for (const needed of required) {
    if (!finalConfig[needed]) {
        console.error(`${needed} is a required value in the botconfig file, yet it was not found.`);
        process.exit(1);
    }
}
console.log("Got data!");
module.exports = finalConfig;