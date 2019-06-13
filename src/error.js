const nodeMajorVersion = parseInt(process.versions.node.split('.')[0, 10]);
if (nodeMajorVersion < 10) {
    console.error('This is an unsupported NODE.JS version. Please install and use NODE.JS 10 or newer');
    process.exit(1);
}
const { accessSync } = require("fs");
const path = require("path");
try {
    accessSync(path.join(__dirname, '..', 'node_modules'));
} catch (e) {
    console.error('ERROR: Please run npm install before starting the bot, the node_modules directory was not found.');
    process.exit(1);
}
process.on("uncaughtException", err => {
    console.error(err);
    process.exit(1);
});
try {
    const packageJson = require("../package.json");
    const modules = Object.keys(packageJson.dependencies);
    modules.forEach(mod => {
        accessSync(path.join(__dirname, '..', 'node_modules', mod));
    });
} catch (e) {
    console.error(`ERROR: Please run npm install again, as we have found you have a package missing.`);
    process.exit(1);
}