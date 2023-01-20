# Meet Fyre, a simple moderation bot!
Fyre is a relatively lightweight moderation bot for <a href="https://discordapp.com/" target="_blank">Discord</a> intended for moderation, yet it also contains a variety of other features. Fyre is built using the powerful <a href="https://discord.js.org/" target="_blank">discord.js library</a>.

## Table of Contents:
- [Setup](#setup)
- [Commands](#commands) -
  - [Moderating](#moderating)
  - [Fun](#fun)
  - [Owner](#owner)
  - [Other](#other)
- [Plugins](#plugins)
## Setup:
1. Install a node.js version of 16 or higher, if not already having done so.
2. Clone/Download this repository.
3. Install the neccessary dependencies by running `npm install`
4. If not already done, create a discord bot application [here](https://discordapp.com/developers/applications/).
5. Make a copy of the botconfig example.json file, and put it in the same folder. Make sure to name this file botconfig.json. Next, open a file editor, and replace the token/ownerid keys with the correct values. If you don't know how to get your id, click [here](https://support.discordapp.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-). The bot's token can be found by clicking on your bot application, clicking on Bot to the left, and copying your token there. 
6. Please note that if you are going to upload this code to github, make sure that your token is invisible. If your token is public any random person can control the bot. By default if it is in a botconfig.json file, the .gitignore should hide it if you for example fork the repo.
7. Add the bot to your server. You can generate an invite link on the application page. Make sure to give the bot administrator, as well as scopes of applications.commands and bot.
8. Run the bot by typing `npm start`, if an error occurs right as you do this command, you may want to type `npm test`, which will let you know if you have npm module(s) missing. The default prefix for the bot is $.

## Commands:
Note: Each command here also has aliases that aren't listed. If you run `$help <command-name>`, you can see all of the aliases a command might have.
### Moderating:
`$addrole <user> <role-name>` Add a role to someone. <br />
`$ban <user> <reason?>` Ban a misbehavior for whatever reason. <br />
`$unban <user> <reason?>` Unban someone you've banned. You can use the id of the user as well. <br />
`$kick <user> <reason?>` Someone getting on your nerves, yet not enough so that you would ban them? The kick command is right for you. <br />
`$mute <user> <reason?>` Stop someone from talking if they are spamming/etc. <br />
`$nick <user>` Change someone's nickname with this command. <br />
`$purge <amount>` This command will let you quickly delete messages from a channel. <br />
`$removerole <user> <role-name>` The counter to $addrole, this command will let you quickly remove a role from someone. <br />
`$unmute <user>` The counter to $mute, this command will unmute someone who is muted, and let them talk again. <br />
`$warn <user> <reason>` Someone starting to misbehave. Warn them to see if they'll stop. <br />
### Fun
`$8ball <question>` Get an answer to a question you may have from the magical 8ball. <br />
`$cat` If you are a cat person. <br />
`$dog` The follow up but if you are a dog person. <br />
### Owner
`$eval <code>` Quickly evaluate some code. As the name of the category implies, only the owner designated by the ownerID in the botconfig can run these commands. <br />
`$reload <command-name>` If you've just made a change to a command, and are tired of having to constantly restart the npm process each time you want your changes to go through, reload will quickly do it for you. <br />
`$shutdown` Shuts down the bot. <br />
### Other
`$prefix <string>` Change the prefix the bot answers to. Currently only one character is allowed. <br /> 
`$botinfo` Get some stats on the bot. <br />
`$help <command-name?>` Saying just $help will cause the bot to send you a list of the commands, if you type a command name, the bot will you give more detailed information on that command itself. <br />
`$ping` Get's the bot's ping. <br />
`$serverinfo` Get some stats on the server you're in. <br />
`$urban <query>` Ask the urban dictionary about something. <br />
### ModMail
`$anonreply <text>` Anonymously reply to a modmail thread started by someone. <br />
`$close` If used in a modmail text response channel, close the thread. <br />

## Bot Options:
These options go in the botconfig.json file.

| Option | Default | Type | Description |
| ------ | ------- | --- | ----------- |
| **token** | None | String | **Required** - The bot's token. You can find this in your application page for this bot. |
| **ownerid** | None | String | **Required** - Your discord user id. If you turn on developer mode in discord settings and right click on your profile, you can copy the ID there. |
| whitelist | false | Boolean | If this is set to true, only messages that were sent by users (see option users) will be parsed. |
| users | String[] | Array | If whitelist is true, then user ID's in this array will be the only ones able to use the bot. |
| mail | false | Boolean | Setting this option to true turns on the user's modmail feature. |
| categoryID | null | String | If modmail is on, then when a user DM's the bot, when a help channel is being created if this is set, the channel will be created underneath a specific category.
| status | Awaiting commands... | String | The bot's displayed activity. |
| prefix | $ | String | The bot's default prefix. Keep in mind you can also just change this with the prefix command. |
| notplugins | String[] | Array | If you have a plugin in src/plugins, any file here will be excluded from executing when plugins load. 

## Plugins:
Plugins are events run at bot startup initialization. Click [here](src/plugins/README.md) for more information.
