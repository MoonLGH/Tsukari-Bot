import {
    CommandInteraction,
    Client
} from 'discord.js';
import { searchcommand } from '../util/others/handleutil';
module.exports = {
    name: 'interactionCreate',
    async execute(interaction: CommandInteraction,client:Client) {
        if (interaction.isCommand()) {
            const cmd = await searchcommand(interaction);
            if (cmd) {
              await cmd.interaction(interaction, client);
            }
          }
    },
};