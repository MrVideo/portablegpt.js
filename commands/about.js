const { SlashCommandBuilder } = require('discord.js');
const { max_tokens } = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('about')
        .setDescription('Sends info about this bot'),
    async execute(interaction) {
        // Embed declaration
        const aboutEmbed = {
            title: 'PortableGPT',
            description: 'A bot to ask simple questions to ChatGPT and get answers on Discord',
            fields: [
                {
                    name: 'Author',
                    value: '[Mario Merlo](https://mariomerlo.me)'
                },
                {
                    name: 'OpenAI API',
                    value: 'https://platform.openai.com/overview'
                },
                {
                    name: 'Token limit',
                    value: `This bot has a limit of ${max_tokens} tokens.`
                }
            ]
        }

        // Respond to user
        await interaction.reply({ embeds: [aboutEmbed] });
    },
};
