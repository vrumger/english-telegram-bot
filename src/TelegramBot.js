`use strict`;

const telegraf = require(`telegraf`);

const replaceSubmatchs = (match, inputText) => {
    return match
        .filter(Boolean)
        .reduce((text, substring, index) => {
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

    addCommmand(commmandName, commmandOptions) {
        const trigger = new RegExp(`^${commmandName}`);

        this.bot.hears(trigger, (ctx) => {
            let { text, options } = commmandOptions;
            options = options || {};

            const isRegex = `regex` in options;

            if (isRegex) {
                text = replaceSubmatchs(ctx.match, text);
            }

            ctx.reply(text, options);
        });
    }

    startPolling() {
        this.bot.startPolling();
        this.bot.telegram.getMe()
            .then((botInfo) => {
                console.log(`@${botInfo.username} is running...`);
            });
    }
}

module.exports = TelegramBot;