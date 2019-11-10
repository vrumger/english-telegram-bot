`use strict`;

const tokenRegex = /^ *the +token +is +(\d+:.+) *$/im;
const commandRegex = /^ *\/(\w+) +(?:(.+?) +)?should +(reply|respond) +with +(text +(?:using +(html|markdown) +)?saying|a +poll) +(.+) *$/gim;
const pollRegex = /^ *where +the +question +is +(.+?) +and +the +options +are +(.+) *$/i;

const regexEscape = regex => {
    return regex.replace(/[-/\\^$*+?.()|[\]{}]/g, `\\$&`);
};

const parseToken = bot => {
    const token = bot.match(tokenRegex);

    if (!token) {
        console.log(`The token is invalid`.red);
        process.exit(1);
    }

    return token[1];
};

const parseCommands = bot => {
    const commands = {};

    for (const match of bot.matchAll(commandRegex)) {
        const [, commandName, regex, a, b, parseMode, text] = match;

        let commandRegex = null;
        if (regex) {
            commandRegex = new RegExp(`^/${regexEscape(commandName)} ${regex}`);
        }

        const command = (commands[commandName] = {
            regex: commandRegex,
            responseType: a,
        });

        if (b.startsWith(`text `)) {
            command.type = `text`;
            command.text = text;
            command.parseMode = parseMode;
        } else if (b === `a poll`) {
            const [, question, options] = text.match(pollRegex);
            const splitOptions = options.split(`,`).map(x => x.trim());

            if (splitOptions.length > 10) {
                console.log(
                    `Telegram doesn't allow more than 10 options on polls, ignoring`
                        .yellow,
                );
            }

            command.type = `poll`;
            command.question = question;
            command.options = splitOptions.slice(0, 10);
        } else {
            console.log(`Invalid type of response, skipping: ${b}`.yellow);
        }
    }

    return commands;
};

module.exports = bot => {
    return {
        token: parseToken(bot),
        commands: parseCommands(bot),
    };
};
