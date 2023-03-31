const { PermissionsBitField, SlashCommandBuilder, ChatInputCommandInteraction } = require("discord.js");
const errors = require("../../../utils/errors.js");
const usage = require("../../../utils/usage"); 

module.exports = {
    data: new SlashCommandBuilder()
        .setName('purge')
        .setDescription("Delete up to 100 messages at a time from a channel.")
        .addNumberOption(option => {
            return option
                .setName('number')
                .setDescription("The number of messages you wish to delete.")
                .setRequired(true)
                .setMaxValue(100)
                .setMinValue(1)
        })
        .setDMPermission(false),
    config: {
        name: "purge",
        aliases: ["del", "delete", "clear"],
        usage: "purge <amount of messages>",
        description: "Delete up to 100 messages at a time from a channel fast",
        permissions: "manage messages"
    },
    run: async (bot, message, args) => {

        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages) && !message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return errors.noPerms(message, "Manage Messages");
        if (!message.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageMessages) && !message.guild.members.me.permissions.has(PermissionsBitField.Flags.Administrator)) return errors.lack(message.channel, "Manage Messages");

        if (!(message instanceof ChatInputCommandInteraction) && args[0] == "help") return message.channel.send({ embeds: [usage.fullHelp(bot, "purge", message)] });

        let numberDeleted = (message instanceof ChatInputCommandInteraction) ? message.options.getNumber("number") : args[0];

        if (isNaN(numberDeleted)) return message.reply(`Please send a number to delete not a word.`);

        if (numberDeleted > 100) return message.reply("Can't delete over 100 messages at one time because of API");
        if (numberDeleted <= 0) return message.reply("You're deleting too little messages!");

        try {
            await message.channel.bulkDelete(numberDeleted).then(() => {
                (message instanceof ChatInputCommandInteraction) ? message.reply({ content: `Successfully deleted ${numberDeleted} messages`, ephemeral: true}) : message.channel.send(`Successfully deleted ${numberDeleted} messages`).then((msg) => {setTimeout(() => msg.delete(), 2000)});
            });
        } catch(e) {
            (message instanceof ChatInputCommandInteraction) ? message.reply({ content: "Unfortunately an error occurred. Messages might be too old!", ephemeral: true}) : message.reply("Unfortunately an error occurred. Messages might be too old!");
            console.log(e);
        }
    }
}