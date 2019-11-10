# english-telegram-bot

Now you can write Telegram bots in English.

## Installation

```bash
npm i -g english-telegram-bot
```

## Usage

```bash
english-telegram-bot <path/to/file>
```

## Example

```english
the token is 123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11

/start should reply with text using markdown saying Hi, I'm a bot written in *English*!

/echo (.+) should respond with text saying $1

/md (.+) should respond with text using markdown saying $1

/html (.+) should respond with text using html saying $1

/poll (.+) should respond with a poll where the question is $1 and the options are Yes, No
```

## Inspiration

This project was suggested by [eyaadh](https://t.me/eyaadh) after having some laughs at the new programming languages, [html](https://npmjs.com/html-telegram-bot-api) and [css](https://npmjs.com/css-telegram-bot-api).
