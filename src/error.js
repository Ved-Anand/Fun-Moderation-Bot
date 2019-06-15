const logger = require('../utils/logger');
const nodeMajorVersion = parseInt(process.versions.node.split('.')[0, 10]);
if (nodeMajorVersion < 10) {
    logger.warn('This is an unsupported NODE.JS version. Please install and use NODE.JS 10 or newer');
    process.exit(1);
}
const { accessSync } = require("fs");
const path = require("path");
try {
    accessSync(path.join(__dirname, '..', 'node_modules'));
} catch (e) {
    logger.warn('Please run npm install before starting the bot, the node_modules directory was not found.');
    process.exit(1);
}
process.on("uncaughtException", err => {
    logger.error(err);
    process.exit(1);
});
try {
    const packageJson = require("../package.json");
    const modules = Object.keys(packageJson.dependencies);
    modules.forEach(mod => {
        accessSync(path.join(__dirname, '..', 'node_modules', mod));
    });
} catch (e) {
    logger.warn("It appears you have a missing package, do npm install again.");
    process.exit(1);
}
logger.info("You have all required modules installed!");