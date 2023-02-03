const { accessSync, readFileSync } = require("fs");
const { parse } = require("json5");
const logger = require('../../utils/logger'); 

let userConfig;
const configFiles = [ //possible config files 
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

if (!foundConfigFile) logger.error("Could not find the botconfig file!"); 

try {
    if (foundConfigFile.endsWith(".js")) { //javascript file is sort of the easiest since you can just require it.
        userConfig = require(`../../${foundConfigFile}`);
    } else {
        const raw = readFileSync(__dirname + '/../../' + foundConfigFile); 
        userConfig = parse(raw);

    }
} catch (e) {
    logger.error(e);
}

const defaultConfig = {
    "token": null,
    "ownerid": null,
    "whitelist": false,
    "users": [],
    "mail": false,
    "categoryID": null,
    "status": "Awaiting commands...",
    "prefix": "$",
    "notplugins": [],

    // non config options just here for ease of access

    "red": "#b70000",
    "orange": "#ff6a00",
    "green": "#00ff26",
    "purple": "#d604cf",
};

const required = ['token'];
const finalConfig = Object.assign({}, defaultConfig); 

for (const [prop, value] of Object.entries(userConfig)) { 
  
    if (!defaultConfig.hasOwnProperty(prop)) { 

        logger.warn(`${prop} is an invalid option for the botconfig file!`);
    }
    finalConfig[prop] = value; 
}

for (const needed of required) { 
    if (!finalConfig[needed]) { 
        logger.error(`${needed} is a required value in the botconfig file, yet it was not found.`);
        process.exit(1);
    }
}
logger.log("Got data from botconfig file!");

module.exports = finalConfig;