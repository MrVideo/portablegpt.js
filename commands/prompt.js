const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { Configuration, OpenAIApi } = require('openai');
const { openAIKey, max_tokens } = require('../config.json');

const configuration = new Configuration({
    apiKey: openAIKey,
});
const openai = new OpenAIApi(configuration);

module.exports = {
    data: new SlashCommandBuilder()
        .setName('prompt')
        .setDescription('Sends a prompt to ChatGPT and returns its answer')
        .addStringOption(option =>
            option.setName('prompt')
                .setDescription('The prompt string')
                .setRequired(true)
        ),
    async execute(interaction) {
        // Defer reply
        await interaction.deferReply();

        // Get user prompt
        const prompt = interaction.options.getString('prompt');

        // Add user prompt to OpenAI API request
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    "role": "system",
                    "content": "You are a helpful and knowledgeable bot that will answer the user's questions."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature: 0.5,
            max_tokens: max_tokens
        });

        const responseEmbed = new EmbedBuilder()
            .setTitle(prompt)
            .setDescription(response.data.choices[0].message.content)
            .addFields({
                name: 'Thanks for using PortableGPT!',
                value: 'Consider donating [here](https://paypal.me/xMrVideo) in order to keep this bot running.'
            })
            .setColor(0x4287f5);

        // Respond on Discord with the API response
        await interaction.editReply({ embeds: [responseEmbed] });
    },
};