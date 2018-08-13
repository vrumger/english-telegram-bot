# english-telegram-bot

Now you can write Telegram bots in English (mostly).

## Installation

```console
$ npm i -g english-telegram-bot
```

## Usage

```console
$ english-telegram-bot <path/to/file>
```

## Example

```english
token: 123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11

commands:
    command (/start):
        Hi! I'm a bot written in *English* (mostly)!
        options:
            markdown

    command (/echo (.+)):
        $1
        options:
            regex
    
    command (/md (.+)):
        $1
        options:
            regex
            markdown
    
    command (/html (.+)):
        $1
        options:
            regex
            html
```

## Inspiration

This project was suggested by [eyaadh](https://t.me/eyaadh) after having some laughs at the new programming languages, html and css.