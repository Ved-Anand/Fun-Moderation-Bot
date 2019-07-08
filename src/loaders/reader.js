const { accessSync, readFileSync } = require("fs");
const { parse } = require("json5");
const logger = require('../../utils/logger'); //better console logging

let userConfig;
const configFiles = [ //possible config files found
    'botconfig.json',
    'botconfig.json5',
    'botconfig.json.json',
    'botconfig.json.txt',
    'botconfig.js'
];

let foundConfigFile;
for (const configFile of configFiles) { //for each of the possible config files
    try {
        accessSync(__dirname + '/../../' + configFile); //see if specific config file exists
        foundConfigFile = configFile; //if it does exist, set foundConfigFile to it
        break; //stop running the loop
    } catch(e) {} 
    //if accessSync fails cause config file does not exist, do nothing and simply go through next element in loop
}

if (!foundConfigFile) logger.error("Could not find the botconfig file!"); //if still no foundConfigFile

try {
    if (foundConfigFile.endsWith(".js")) { //if javascript file, userConfig set to simply requiring it
        userConfig = require(`../../${foundConfigFile}`);
    } else {
        const raw = readFileSync(__dirname + '/../../' + foundConfigFile); 
        userConfig = parse(raw);
        //if not javascript file, userConfig set to parsed version of config file
    }
} catch (e) {
    logger.error(e);
}

const defaultConfig = {
    "token": null,
    "ownerid": null,
    "private": false,
    "whitelist": false,
    "status": "Moderating servers!",
    "prefix": "!",
    "privateID": "",
    "red": "#b70000",
    "orange": "#ff6a00",
    "green": "#00ff26",
    "purple": "#d604cf",
    "users": [],
    "notplugins": [],
};

const required = ['token', 'ownerid'];
const finalConfig = Object.assign({}, defaultConfig); //finalConfig has defaultConfig's properties

for (const [prop, value] of Object.entries(userConfig)) { 
    //prop = string in userConfig, e.g token, ownerid, etc.
    if (!defaultConfig.hasOwnProperty(prop)) { 
        //if the default config does not have prop, it is unknown value, so end with an error
        logger.warn(`${prop} is an invalid option for the botconfig file!`);
    }
    finalConfig[prop] = value; //if not, reset the finalConfig[prop] value to whatever was put inside the config file
}

for (const needed of required) { //for each of the items in the required array, (token, ownerid)
    if (!finalConfig[needed]) { //if finalConfig does not have them, meaning they were not specified, return an error.
        logger.error(`${needed} is a required value in the botconfig file, yet it was not found.`);
        process.exit(1);
    }
}
logger.log("Got data from botconfig file!");

module.exports = finalConfig;