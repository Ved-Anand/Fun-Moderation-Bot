module.exports = async (bot, interaction) => {

    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }

    try {
        await command.run(bot, interaction)
    } catch (err) {
        console.error(err);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: "There was an error in the execution of this command!", ephemeral: true});
        } else {
            await interaction.reply({ content: "There was an error in the execution of this command!", ephemeral: true});
        }
    }

}