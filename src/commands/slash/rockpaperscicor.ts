const {
    MessageActionRow,
    MessageButton
} = require('discord.js');

import { CommandInteraction,ButtonInteraction } from 'discord.js'
module.exports = {
    name: "rockpaperscissors",
    description: "Challange Someone to play Rock Paper Scissors",
    options: [{
        "name": "enemy",
        "type": "STRING",
        "required": true,
        "description": "Mention Enemy to Challange!"
    }],
    interaction: async function (interaction:any) {
        let enemyid:any = interaction.options.get("enemy")?.value
        if(enemyid.startsWith("<@!") ||enemyid.startsWith("<@") ){
            enemyid = enemyid.replace("<@", "").replace("!","").replace(">", "")
        }else {
            return interaction.channel?.send("Mention An User")
        }
        
        const enemy = await interaction.guild.members.fetch(enemyid)

        const player = {
            "1": {
                name: interaction.member.displayName,
                id: interaction.user.id
            },
            "2": {
                name: enemy.displayName,
                id: enemy.user.id
            }
        }

        const confirmation = new MessageActionRow().addComponents([new MessageButton().setCustomId(`yes`).setLabel("Accept").setStyle("SUCCESS"), new MessageButton().setCustomId(`no`).setLabel("Decline").setStyle("DANGER")])
        await interaction.reply({
            content: `<@${enemyid}> ${interaction.member.displayName} Has challanged You to play RockPaperScissors\n you got 15 second to reply`,
            components: [confirmation]
        })

        const confirm = await interaction.fetchReply()
        const filter = (interaction:ButtonInteraction) => interaction.user.id === enemyid;
        const collector = confirm.createMessageComponentCollector({
            filter: filter,
            time: 15000
        });

        collector.on("collect", async (inter:ButtonInteraction) => {
            if (inter.customId === "yes") {
                await inter.deferUpdate()
                await interaction.deleteReply()
                interaction.channel.send(`${enemy.displayName} Has Accepted.`)
                makebutton(interaction, player, enemy, inter, confirm)
            } else if (inter.customId === "no") {
                await inter.deferUpdate()
                await interaction.deleteReply()
                return interaction.channel.send(`${enemy.displayName} Has Decline.`)
            }
        })
    },
}

async function makebutton(interaction:any, player:any, enemy:any, inter:ButtonInteraction, confirm:any) {

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
    
    const filter = (interaction:ButtonInteraction) => interaction.user.id === player["2"].id || interaction.user.id === player["1"].id;
    let maincollector = main.createMessageComponentCollector({
        filter: filter,
        time: 15000
    })

    let obj:any = {}

    maincollector.on("collect",async(inter:ButtonInteraction)=>{
        await inter.deferUpdate()
        let usernumber:any
        if(inter.user.id === player["1"].id){
            usernumber = "1"
        }else if(inter.user.id === player["2"].id){
            usernumber = "2"
        }

        if(inter.customId === "scissors"){
            obj[`player${usernumber}`] = "✌️"
        }else if(inter.customId === "rock"){
            obj[`player${usernumber}`] ="🤜"
        }else if(inter.customId === "paper"){
            obj[`player${usernumber}`] ="✋"
        }

        await interaction.channel.send(`${player[usernumber].name} Has Picked`)
        const win = await checkwinner(obj,inter,player)

        if(win){
            main.delete()
            return interaction.channel.send(`${player["1"].name} Picked ${obj.player1}\n${player["2"].name} Picked ${obj.player2} \n${win}`)
        }
    })
}

async function checkwinner(obj:any,inter:ButtonInteraction,player:any){
    let result = "No one wins"
    if(!obj.player1 || !obj.player2){
        return null
    }
    if(obj.player1 === obj.player2) result = "It's a draw!"
    else if (obj.player1 === "✌️" && obj.player2 === "✋") result = `**${player["1"].name}** wins!`;
    else if(obj.player1 === "🤜" && obj.player2 === "✌️") result = `**${player["1"].name}** wins!`;
    else if(obj.player1 === "✋" && obj.player2 === "🤜") result = `**${player["1"].name}** wins!`;
    else if (obj.player2 === "✌️" && obj.player1 === "✋") result = `**${player["2"].name}** wins!`;
    else if(obj.player2 === "🤜" && obj.player1 === "✌️") result = `**${player["2"].name}** wins!`;
    else if(obj.player2 === "✋" && obj.player1 === "🤜") result = `**${player["2"].name}** wins!`;
    
    return result
}
