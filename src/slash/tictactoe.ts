const {
    MessageActionRow,
    MessageButton
} = require('discord.js');

import { CommandInteraction,ButtonInteraction, GuildMember, Message } from 'discord.js'
module.exports = {
    name: "tictactoe",
    description: "Play Tic tac Toe Here :D",
    options: [{
        "name": "enemy",
        "type": "USER",
        "required": true,
        "description": "Mention User that you want to challange"
    }],
    interaction: async function (interaction:CommandInteraction) {
        const enemy = await interaction.options.get("enemy")?.member
        if((enemy as GuildMember).id === interaction.user.id){
            return interaction.reply({content:"You Cant Challange Your Self",ephemeral:true})
        }else if((enemy as GuildMember).user.bot){
            return interaction.reply({content:"You Cant Challange A Bot",ephemeral:true})
        }
        const confirmation = new MessageActionRow().addComponents([new MessageButton().setCustomId(`yes`).setLabel("Accept").setStyle("SUCCESS"), new MessageButton().setCustomId(`no`).setLabel("Decline").setStyle("DANGER")])
        await interaction.reply({
            content: `<@!${(enemy as GuildMember)?.id}> ${(interaction.member as GuildMember)?.displayName} Has challanged You to play tictactoe\n you got 15 second to reply`,
            components: [confirmation]
        })
        
        const confirm = await interaction.fetchReply()
        const filteryes:any = (interaction:ButtonInteraction) => interaction.customId === 'yes' && interaction.user.id === (enemy as GuildMember).id;
        const collectoryes = (confirm as Message).createMessageComponentCollector({
            filter: filteryes,
            time: 15000
        });
        collectoryes.on("collect", async (inter:any) => {
            await inter.deferUpdate()
            await interaction.editReply({
                content: `${(enemy as GuildMember).displayName} Has Accepted, Lets Play The Game!`,
                components: []
            })
            start(inter, interaction, confirm, enemy)
        })

        const filterno:any = (interaction:ButtonInteraction) => interaction.customId === 'no' && interaction.user.id === (enemy as GuildMember).id;
        const collectorno = (confirm as Message).createMessageComponentCollector({
            filter: filterno,
            time: 15000
        });
        collectorno.on("collect", async (inter:any) => {
            await inter.deferUpdate()
            await interaction.editReply({
                content: `${(enemy as GuildMember)?.displayName} Has Declined.`,
                components: []
            })
        })
    },
}

async function start(inter:ButtonInteraction, interaction:any, confirm:any, enemy:any) {
    const squares = [{
        val: false,
        but: new MessageButton().setCustomId('1').setLabel('.').setStyle('PRIMARY'),
        claimed:false
    }, {
        val: false,
        but: new MessageButton().setCustomId('2').setLabel('.').setStyle('PRIMARY'),
        claimed:false
    }, {
        val: false,
        but: new MessageButton().setCustomId('3').setLabel('.').setStyle('PRIMARY'),
        claimed:false
    }, {
        val: false,
        but: new MessageButton().setCustomId('4').setLabel('.').setStyle('PRIMARY'),
        claimed:false
    }, {
        val: false,
        but: new MessageButton().setCustomId('5').setLabel('.').setStyle('PRIMARY'),
        claimed:false
    }, {
        val: false,
        but: new MessageButton().setCustomId('6').setLabel('.').setStyle('PRIMARY'),
        claimed:false
    }, {
        val: false,
        but: new MessageButton().setCustomId('7').setLabel('.').setStyle('PRIMARY'),
        claimed:false
    }, {
        val: false,
        but: new MessageButton().setCustomId('8').setLabel('.').setStyle('PRIMARY'),
        claimed:false
    }, {
        val: false,
        but: new MessageButton().setCustomId('9').setLabel('.').setStyle('PRIMARY'),
        claimed:false
    }]
    let row = new MessageActionRow()
        .addComponents([squares[0].but, squares[1].but, squares[2].but])
    let row1 = new MessageActionRow()
        .addComponents([squares[3].but, squares[4].but, squares[5].but])
    let row2 = new MessageActionRow()
        .addComponents([squares[6].but, squares[7].but, squares[8].but])

    let users = [interaction.user.id, enemy.id]
    let player:any = {}

    let random = getfirst(users)

    player.x = random
    users.forEach(user => {
        if (user === random) return;
        player.o = user
    })

    let now:any = "x"
    await interaction.editReply({
        content: `GAME STARTED\n<@${random}> Start first As ${now}`,
        components: [row, row1, row2]
    });
    let game:any = await interaction.fetchReply()
    const filter = (interaction:ButtonInteraction) => interaction.user.id === random;
    const collector = game.createMessageComponentCollector({
        filter: filter,
        time: 15000
    });
    collector.on("collect", async (inter:ButtonInteraction) => {
        collector.stop()
        let clicked = Number(inter.customId) - 1
        await inter.deferUpdate()
        squares[clicked].claimed = now
        squares[clicked].but = squares[clicked].but.setDisabled(true)
        squares[clicked].but = squares[clicked].but.setLabel(now)

        next(interaction, inter, now, squares, users, player,game)
    })

}

async function next(interaction:any, inter:ButtonInteraction, now:string, squares:any, users:any, player:any,game:any) {
    let row = new MessageActionRow()
        .addComponents([squares[0].but, squares[1].but, squares[2].but])
    let row1 = new MessageActionRow()
        .addComponents([squares[3].but, squares[4].but, squares[5].but])
    let row2 = new MessageActionRow()
        .addComponents([squares[6].but, squares[7].but, squares[8].but])

    let curret:any
    users.forEach((user:string) => {
        if(user !== player[now]){
            curret = user
        }
    })
    if(player[now] === player.x){
        now = "o"
    }else if(player[now] === player.o){
        now = "x"
    }
    await interaction.editReply({
        content: `Next Move <@${curret}> Play As ${now}`,
        components: [row, row1, row2]
    })
    const filter = (interaction:ButtonInteraction) => interaction.user.id === curret;
    const collector = game.createMessageComponentCollector({
        filter: filter,
        time: 15000
    });
    collector.on("collect", async (inter:any) => {
        collector.stop()
        let clicked = inter.customId - 1
        squares[clicked].claimed = now
        await inter.deferUpdate()
        squares[clicked].but = squares[clicked].but.setDisabled(true)
        squares[clicked].but = squares[clicked].but.setLabel(now)
        const winner = await calculateWinner(squares) 
        if(winner){
            const userwin = player[winner]
            interaction.channel.send(`<@${userwin}> Wins As ${winner}`)
            return interaction.deleteReply()
        }
        if(squares[0].claimed && squares[1].claimed && squares[2].claimed && squares[3].claimed && squares[4].claimed && squares[5].claimed && squares[6].claimed && squares[7].claimed && squares[8].claimed){
            interaction.channel.send("Draw, No One Wins")
        }
        next(interaction, inter, now, squares, users, player,game)
    })
}

function getfirst(users:Array<any>):string {
    return users[Math.floor(Math.random() * users.length)]
}



function calculateWinner(squares:Array<any>) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a].claimed && squares[a].claimed === squares[b].claimed && squares[a].claimed === squares[c].claimed) {
            return squares[a].claimed
        }
    }
    return null;
}