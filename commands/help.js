const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription("Returns the list of the bot's commands"),
    async execute(interaction) {
        // Embed declaration
        const helpEmbed = {
            title: 'Command list',
            description: "You can also start typing '/' and see a list of commands directly on the message box",
            fields: [
                {
                    name: 'This menu',
                    value: '`/help`'
                },
                {
                    name: 'Info about this bot',
                    value: '`/about`'
                },
                {
                    name: 'Ask a question',
                    value: '`/prompt <query>`'
                }
            ]
        }

        // Respond to user
        await interaction.reply({ embeds: [helpEmbed] });
    },
};