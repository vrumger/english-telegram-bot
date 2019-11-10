`use strict`;

require(`colors`);
const program = require(`commander`);
const fs = require(`fs`);
const package = require(`../package.json`);

const TelegramBot = require(`./TelegramBot`);
const parseBot = require(`./Parser`);

program
    .version(package.version)
    .arguments(`<path/to/file>`)
    .action(start)
    .parse(process.argv);

if (program.args.length === 0) {
    console.log(`File name is required`.red);
    process.exit(1);
}

function start(filename) {
    fs.readFile(filename, (err, res) => {
        if (err) throw err;

        const { token, commands } = parseBot(res.toString());

        const bot = new TelegramBot(token);
        bot.addCommmands(commands);
        bot.startPolling();
    });
}
