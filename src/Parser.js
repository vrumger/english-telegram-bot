`use strict`;

const parseToken = (bot) => {
    const token = bot.match(/(?:^|\n)token:\s*(\d+:\w+)/i);

    if (!token) {
        console.log(`The token is invalid`.red);
        process.exit(1);
    }

    return token[1];
};

const parseCommands = (bot) => {
    const commands = {};
    const commandsIndex = bot.match(/(?:^|\n)commands:\r?\n([\s\S]+)/i);

    if (!commandsIndex) {
        return commands;
    }

    const commandsSearchRegex = /(?:\s*)command\s*\((.+)\):/ig;

    let command;
    while ((command = commandsSearchRegex.exec(commandsIndex[1])) !== null) {
        const commandName = command[1];

        const { index, input } = command;
        command = input.slice(index).trim();

        let text = command.match(/.+\r?\n\s*(.+)/i);
        command = command.slice(text[0].length).trim();
        text = text ? text[1] : ``;

        let options = /^options:\s*/i.test(command);

        if (options) {
            const optionsArray = command
                .slice(8)
                .trim()
                .split(`\n`)
                .map(option => option.toLowerCase().trim());

            options = {};

            for (const option of optionsArray) {
                if ([`html`, `markdown`].includes(option)) {
                    if (`parse_mode` in options) {
                        console.log(`You can't use html and markdown in one message`.red);
                        console.log(`Falling back to ${option}`.yellow);
                    }

                    options.parse_mode = option;
                } else if (option === `regex`) {
                    options.regex = true;
                } else if (option.startsWith(`command`)) {
                    break;
                } else if (option !== ``) {
                    console.log(`Unknown option "${option}"`.yellow);
                }
            }
        }

        commands[commandName] = {
            text,
            options
        };
    }

    return commands;
};

module.exports = (bot) => {
    return {
        token: parseToken(bot),
        commands: parseCommands(bot),
    };
};