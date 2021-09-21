import { Message,MessageEmbed,MessageActionRow,MessageButton, ButtonInteraction } from "discord.js"
import * as fs from 'fs' 
module.exports = {
    "name":"help",
    "usage":`${require("../../default").defaultprefix}help <Command/Category> <Category>`,
    "description":"Get Help of a Command",
    "execute":async function(msg:Message, command:String, args:Array<any>, prefix:string){
        if(args.length === 0){
            const commandFiles = fs.readdirSync('./src/TextCommands',{ withFileTypes: true }).filter((dirent:any) => dirent.isDirectory()).map((dirent:any) => dirent.name)

            let cats = []
            for (const folder of commandFiles) {
                cats.push(folder)
            }
            const embed = new MessageEmbed()
            .setAuthor("Help Command",msg.client.user?.displayAvatarURL())
            .addField("Command Category List",cats.join(" | "))

            let buts:Array<any> = []
            cats.forEach((cat:string) =>{
                let but = new MessageButton()
                .setCustomId(cat)
                .setStyle("PRIMARY")
                .setLabel(cat)
                buts.push(but)
            })
            var result = buts.reduce((resultArray:Array<any>, item:any, index:any) => { 
                const chunkIndex = Math.floor(index/5)
              
                if(!resultArray[chunkIndex]) {
                  resultArray[chunkIndex] = [] // start a new chunk
                }
              
                resultArray[chunkIndex].push(item)
              
                return resultArray
              }, [])
              let component:Array<any> = [] 
              result.forEach((buttons)=>{
                let row = new MessageActionRow()
                .addComponents(buttons)
                component.push(row)
              })
              let sended = await msg.channel.send({embeds:[embed],components:component})
              const filter = (interaction:ButtonInteraction) => interaction.user.id === msg.author.id
              let maincollector = sended.createMessageComponentCollector({
                componentType: "BUTTON",
                filter: filter,
                time: 15000
              })
              maincollector.on('collect', async (interaction:any) => {
                let cmds:Array<any> = []
                for (const file of fs.readdirSync('./src/TextCommands/'+interaction.customId).filter((file:any) => file.endsWith('.ts'))){
                    const cmd = require(`../${interaction.customId}/${file}`)
                    let obj:any = {CmdName:cmd.name||"No Name Setted",description:cmd.description||"No Description Setted",usage:cmd.usage||"No Usage Setted"}
                    if(cmd.alias && cmd.alias.length > 0){
                        obj.alias = "Alias:"+cmd.alias.join("/")
                    }else if(!cmd.alias){
                        obj.alias = ""
                    }
                    cmds.push(obj)
                }
                let embed = new MessageEmbed()
                .setAuthor(`${interaction.customId} List`,msg.client.user?.displayAvatarURL())
                cmds.forEach((cmd:any)=>{
                    embed.addField(cmd.CmdName,`Description:${cmd.description}\nUsage:${cmd.usage}\n${cmd.alias||""}`)
                })
                sended.edit({embeds:[embed],components:[]})
            })
        }
    }
}