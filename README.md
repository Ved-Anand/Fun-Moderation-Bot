# Meet Fyre, a simple moderation bot!
Fyre is a simple moderation bot for <a href="https://discordapp.com/" target="_blank">Discord</a> intended for moderation, yet it also contains a variety of other features. Fyre is built using the powerful <a href="https://discord.js.org/" target="_blank">discord.js library</a>.

## T.O.C (Table of Contents):
- [Setup](#setup)
- [Commands](#commands) -
  - [Moderating](#moderating)
  - [Fun](#fun)
  - [Owner](#owner)
  - [Other](#other)
- [Plugins](#plugins)
## Setup:
1. Install a node.js version 10 or higher, if not already having done so.
2. Clone/Download this repository.
3. Install the neccessary dependencies by running `npm ci`
4. If not already done, create a discord bot application [here](https://discordapp.com/developers/applications/).
4. Make a copy of the botconfig example.json file, and put it in the same folder. Make sure to name this file botconfig.json. Next, open a code editor, and replace the token/ownerid keys with the correct values. If you don't know how to get your id, click [here](https://support.discordapp.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-).
5. Add the bot to your server.
6. Run the bot by typing `npm start`, if an error occurs right as you do this command, you may want to type `npm test`, which will let you know if you have npm module(s) missing. Note: When the bot is running, the default prefix for the bot is !

## Commands:

### Moderating:
`!addrole <user> <role-name>` Quickly add a role to someone with this nifty command! <br />
`!ban <user> <reason?>` This command is sure to punish misbehavers. <br />
`!kick <user> <reason?>` Someone getting on your nerves, yet not enough so that you would ban them? The kick command is right for you! <br />
`!mute <user> <reason?>` Stop someone from talking if they are spamming/etc. <br />
`!nick <user>` Change someone's nickname with this command. <br />
`!purge <amount>` This command will let you quickly delete messages from a channel. <br />
`!removerole <user> <role-name>` The counter to !addrole, this command will let you quickly remove a role from someone. <br />
`!unmute <user>` The counter to !mute, this command will unmute someone who is muted, and let them talk again. <br />
`!warn <user> <reason>` Someone starting to misbehave! Warn them to see if they'll stop. If they don't stop, more drastic action such as the !kick and !ban command may have to be used...
### Fun
`!8ball <question>` Get a somewhat cheesy answer to a question you may have. <br />
`!cat` Who doesn't like a good cat picture when you're feeling down? <br />
`!dog` The follow up to `!cat`, dog pictures are great! <br />
`!meme` These memes come straight from [r/dankmemes](https://reddit.com/r/dankmemes/)
### Owner
`!eval <code>` Quickly evaluate some code. If you're editing the code, be sure to not let only the most trusted people use this command, as very dangerous things can happen if you let everyone use this command. <br />
`!reload <command-name>` If you've just made a change to a command, and are tired of having to constantly restart the npm process each time you want your changes to go through, reload will quickly do it for you. <br />
`!shutdown` Shuts down the bot.
### Other
`!botinfo` Get some stats on the bot. <br />
`!help <command-name?>` Saying just !help will cause the bot to send you a list of the commands, if you type a command name, the bot will you give more detailed information on that command itself. <br />
`!helpmsg <number>` Every so now and then, you may get an error from the bot, and an error code will be sent into the channel. You can look up these errors with the !helpmsg command, and see what exactly they are. <br />
`!ping` Get's the bot's ping. <br />
`!serverinfo` Get some stats on the server you're in. <br />
`!urban <query>` Ask the urban dictionary about something.

## Bot Options:
These options go in the botconfig.json file.

| Option | Default | Description |
| ------ | ------- | ----------- |
| **token** | None | **Required** - The bot's token. You can find this in your application page for this bot. |
| **ownerid** | None | **Required** - Your discord user id. |
| status | Moderating servers! | What the bot is displayed as doing. |
| prefix | ! | The bot's command prefix. |
| privateID | None | If in config file, it takes a guild id. Doing this will make commands only possible in this guild.
| users | None | If mentioned, let only the user id's in the array use bot commands

## Plugins:
Although this bot will allow you to make plugins, this entire mode still has bugs as it is still being tested. However, if you want to make a plugin with these risks, click [here](src/plugins/README.md).