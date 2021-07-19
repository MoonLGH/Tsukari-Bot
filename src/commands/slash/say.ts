module.exports = {
    name: "say",
    description: "Make Me Say Something :D",
    options: [{
        "name": "tosay",
        "type": "STRING",
        "required": true,
        "description": "What Do You Want To Echo"
    }],
    interaction: async function (interaction:any) {
        let Say:any = interaction.options.get("tosay")?.value
        interaction.reply(Say)
    }
}