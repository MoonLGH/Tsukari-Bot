const {
    MessageActionRow,
    MessageButton
} = require('discord.js');

import {
    ButtonInteraction, CommandInteraction, GuildMember, Message, MessageCollector
} from 'discord.js'
module.exports = {
    name: "rockpaperscissors",
    description: "Challange Someone to play Rock Paper Scissors",
    options: [{
        "name": "enemy",
        "type": "USER",
        "required": true,
        "description": "Mention Enemy to Challange!"
    }],
    interaction: async function (interaction: CommandInteraction) {
        const enemy = await interaction.options.get("enemy")?.member
        if((enemy as GuildMember).id === interaction.user.id){
            return interaction.reply({content:"You Cant Challange Your Self",ephemeral:true})
        }else if((enemy as GuildMember).user.bot){
            return interaction.reply({content:"You Cant Challange A Bot",ephemeral:true})
        }
        const player = {
            "1": {
                name: (interaction.member as GuildMember)?.displayName,
                id: interaction.user.id
            },
            "2": {
                name: (enemy as GuildMember).displayName,
                id: (enemy as GuildMember)?.user.id
            }
        }

        const confirmation = new MessageActionRow().addComponents([new MessageButton().setCustomId(`yes`).setLabel("Accept").setStyle("SUCCESS"), new MessageButton().setCustomId(`no`).setLabel("Decline").setStyle("DANGER")])
        await interaction.reply({
            content: `<@${(enemy as GuildMember)?.id}> ${(interaction.member as GuildMember)?.displayName} Has challanged You to play RockPaperScissors\n you got 15 second to reply`,
            components: [confirmation]
        })

        const confirm = await interaction.fetchReply()
        const filter:any = (interaction: ButtonInteraction) => interaction.user.id === (enemy as GuildMember).id;
        const collector:any = (confirm as Message).createMessageComponentCollector({
            filter: filter,
            time: 15000
        });

        collector.on("collect", async (inter: ButtonInteraction) => {
            if (inter.customId === "yes") {
                await inter.deferUpdate()
                await interaction.deleteReply()
                interaction.channel!.send(`${(enemy as GuildMember).displayName} Has Accepted.`)
                makebutton(interaction, player, enemy, inter, confirm)
            } else if (inter.customId === "no") {
                await inter.deferUpdate()
                await interaction.deleteReply()
                return interaction.channel!.send(`${(enemy as GuildMember).displayName} Has Decline.`)
            }
        })
    },
}

async function makebutton(interaction: any, player:  any, enemy: any, inter: ButtonInteraction, confirm: any) {

    //Buttons
    let scissorsbtn = new MessageButton()
        .setCustomId("scissors")
        .setLabel("Scissors")
        .setStyle("PRIMARY")
        .setEmoji("✌️")
    let rockbtn = new MessageButton()
        .setCustomId("rock")
        .setLabel("Rock")
        .setStyle("PRIMARY")
        .setEmoji("🤜")
    let paperbtn = new MessageButton()
        .setCustomId("paper ")
        .setLabel("Paper")
        .setStyle("PRIMARY")
        .setEmoji("✋")
    let row = new MessageActionRow()
        .addComponents([scissorsbtn], [rockbtn], [paperbtn])

    const main = await interaction.channel.send({
        content: `${player["1"].name} And ${player["2"].name}\nPick 1 of this`,
        components: [row]
    })

    const filter = (interaction: ButtonInteraction) => interaction.user.id === player["2"].id || interaction.user.id === player["1"].id;
    let maincollector = main.createMessageComponentCollector({
        filter: filter,
        time: 15000
    })

    let obj: any = {}

    maincollector.on("collect", async (inter: ButtonInteraction) => {
        await inter.deferUpdate()
        let usernumber: any
        if (inter.user.id === player["1"].id) {
            usernumber = "1"
        } else if (inter.user.id === player["2"].id) {
            usernumber = "2"
        }

        if (inter.customId === "scissors") {
            obj[`player${usernumber}`] = "✌️"
        } else if (inter.customId === "rock") {
            obj[`player${usernumber}`] = "🤜"
        } else if (inter.customId === "paper") {
            obj[`player${usernumber}`] = "✋"
        }

        await interaction.channel.send(`${player[usernumber].name} Has Picked`)
        const win = await checkwinner(obj, inter, player)

        if (win) {
            main.delete()
            return interaction.channel.send(`${player["1"].name} Picked ${obj.player1}\n${player["2"].name} Picked ${obj.player2} \n${win}`)
        }
    })
}

async function checkwinner(obj: any, inter: ButtonInteraction, player: any) {
    let result = "No one wins"
    console.log(obj.player1 + obj.player2)
    if (!obj[`player1`] || !obj["player2"]) {
        return null
    }
    if (obj.player1 === obj.player2) result = "It's a draw!"
    else if (obj.player1 === "✌️" && obj.player2 === "✋") result = `**${player["1"].name}** wins!`;
    else if (obj.player1 === "🤜" && obj.player2 === "✌️") result = `**${player["1"].name}** wins!`;
    else if (obj.player1 === "✋" && obj.player2 === "🤜") result = `**${player["1"].name}** wins!`;
    else if (obj.player2 === "✌️" && obj.player1 === "✋") result = `**${player["2"].name}** wins!`;
    else if (obj.player2 === "🤜" && obj.player1 === "✌️") result = `**${player["2"].name}** wins!`;
    else if (obj.player2 === "✋" && obj.player1 === "🤜") result = `**${player["2"].name}** wins!`;

    return result
}