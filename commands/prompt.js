const { SlashCommandBuilder } = require('discord.js');
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
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            temperature: 0.5,
            max_tokens: max_tokens,
        });

        // Respond on Discord with the API response
        await interaction.editReply(response.data.choices[0].text);
    },
};