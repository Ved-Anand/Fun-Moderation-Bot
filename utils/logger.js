const chalk = require("chalk");
const moment = require("moment");
const { inspect } = require("util");

class Logger {
    static log(content, { color = 'grey', tag = 'Log' } = {}) { //log = grey
        this.write(content, { color, tag });
    }
    static info(content, { color = 'green', tag = 'Info' } = {}) { //info = green
        this.write(content, { color, tag });
    }
    static warn(content, { color = 'yellow', tag = 'Warn' } = {}) { //warn = yellow
        this.write(content, { color, tag });
    }
    static error(content, { color = 'red', tag = 'Error' } = {}) { //error = red
        this.write(content, { color, tag, error: true });
    }
    static stacktrace(content, { color = 'white', tag = 'Error' } = {}) { //stacktrace = white
        this.write(content, { color, tag, error: true});
    }
    static write(content, { color = 'grey', tag = 'Log', error = false } = {}) {
        const timestamp = chalk.cyan(`[${moment().format('YYYY-MM-DD HH:mm:ss')}]:`); //format with time
        const levelTag = chalk.bold(`[${tag}]:`); //bold whether log, info, warn, error
        const text = chalk[color](this.clean(content)); //inspect the message to be sent, make it color specified
        const stream = error ? process.stderr : process.stdout; 
        stream.write(`${timestamp} ${levelTag} ${text}\n`); //write to stream
    }
    static clean(item) {
        if (typeof item === 'string') return item;
        const cleaned = inspect(item, { depth: Infinity });
        return cleaned;
    }
}

module.exports = Logger;