`use strict`;

const telegraf = require(`telegraf`);

const replaceSubmatchs = (match, inputText) => {
    return match.filter(Boolean).reduce((text, substring, index) => {
        const regex = new RegExp(`\\$${index}`, `g`);
        return text.replace(regex, substring);
    }, inputText);
};

class TelegramBot {
    constructor(token) {
        this.bot = new telegraf(token);
    }

    addCommmands(commmands) {
        for (const commmand in commmands) {
            this.addCommmand(commmand, commmands[commmand]);
        }
    }

    addCommmand(commmandName, commandOptions) {
        const { type, regex, responseType } = commandOptions;

        const callback = (ctx, next) => {
            const reply_to_message_id =
                responseType === `reply` ? ctx.message.message_id : null;

            switch (type) {
                case `text`: {
                    let responseText = commandOptions.text;

                    if (regex) {
                        responseText = replaceSubmatchs(
                            ctx.match,
                            responseText,
                        );
                    }

                    ctx.reply(responseText, {
                        reply_to_message_id,
                        parse_mode: commandOptions.parseMode,
                    });
                    break;
                }

                case `poll`: {
                    let { question, options } = commandOptions;

                    if (regex) {
                        question = replaceSubmatchs(ctx.match, question);
                        options = options.map(option =>
                            replaceSubmatchs(ctx.match, option),
                        );
                    }

                    ctx.replyWithPoll(question, options, {
                        reply_to_message_id,
                    });
                    break;
                }

                default:
                    console.log(
                        `Invalid type of response, skipping: ${responseType}`
                            .yellow,
                    );
                    break;
            }

            next();
        };

        if (regex) {
            this.bot.hears(regex, callback);
        } else {
            this.bot.command(commmandName, callback);
        }
    }

    startPolling() {
        this.bot.launch().then(() => {
            console.log(`@${this.bot.options.username} is running...`);
        });
    }
}

module.exports = TelegramBot;
