import {CommandInteraction} from "discord.js";
export = {
  name: "say",
  description: "Make Me Say Something :D",
  options: [{
    "name": "tosay",
    "type": "STRING",
    "required": true,
    "description": "What Do You Want To Echo",
  }],
  interaction: async function(interaction:CommandInteraction) {
    const toreply = interaction.options.getString("tosay", true);
    interaction.reply(toreply);
  },
}
