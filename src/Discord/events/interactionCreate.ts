import {
    CommandInteraction,
    Client
} from 'discord.js';
import { getSlash } from '../util/others/handleutil';
module.exports = {
    name: 'interactionCreate',
    async execute(interaction: CommandInteraction,client:Client) {
        if (interaction.isCommand()) {
            const cmd = await getSlash(interaction);
            if (cmd) {
              await cmd.interaction(interaction, client);
            }
        }
    },
};