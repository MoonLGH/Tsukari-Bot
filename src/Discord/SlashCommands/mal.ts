import {CommandInteraction} from "discord.js"
export = {
    name: "mal",
    description: "Make Me Say Something :D",
    options: [{
        "name": "query",
        "type": "STRING",
        "required": true,
        "description": "Query that you wat to search"
    }],
    interaction: async function (interaction:CommandInteraction) {
        let toreply = interaction.options.getString("query",true)
        interaction.reply(toreply)
    }
}