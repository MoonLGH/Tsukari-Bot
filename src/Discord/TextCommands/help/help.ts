import { Message,MessageEmbed,MessageActionRow,MessageButton, ButtonInteraction } from "discord.js"
import * as fs from 'fs' 
import * as Interface from "../../util/others/typing"
import config from "../../default"

export = {
    "name":"help",
    "usage":`${config.defaultprefix}help <Command/Category> <Category>`,
    "description":"Get Help of a Command",
    "execute":async function(msg:Message, command:string, args:Array<string>){
        if(args.length === 0){
            const commandFiles = fs.readdirSync('./src/Discord/TextCommands',{ withFileTypes: true }).filter((dirent) => dirent.isDirectory()).map((dirent) => dirent.name)

            const cats = []
            for (const folder of commandFiles) {
                cats.push(folder)
            }
            const embed = new MessageEmbed()
            .setAuthor("Help Command",msg.client.user?.displayAvatarURL())
            .addField("Command Category List",cats.join(" | "))

            const buts:Array<MessageButton> = []
            cats.forEach((cat:string) =>{
                const but = new MessageButton()
                .setCustomId(cat)
                .setStyle("PRIMARY")
                .setLabel(cat)
                buts.push(but)
            })
            const result = buts.reduce((resultArray:Array<Array<MessageButton>>, item:MessageButton, index:number) => { 
                const chunkIndex = Math.floor(index/5)
              
                if(!resultArray[chunkIndex]) {
                  resultArray[chunkIndex] = [] // start a new chunk
                }
              
                resultArray[chunkIndex].push(item)
              
                return resultArray
              }, [])
              const component:Array<MessageActionRow> = [] 
              result.forEach((buttons:Array<MessageButton>)=>{
                const row = new MessageActionRow()
                .addComponents(buttons)
                component.push(row)
              })
              const sended = await msg.channel.send({embeds:[embed],components:component})
              const filter = (interaction:ButtonInteraction) => interaction.user.id === msg.author.id
              const maincollector = sended.createMessageComponentCollector({
                componentType: "BUTTON",
                filter: filter,
                time: 15000
              })
              maincollector.on('collect', async (interaction:ButtonInteraction) => {
                const cmds:Array<Interface.HelpInterface> = []
                for (const file of fs.readdirSync('./src/Discord/TextCommands/'+interaction.customId).filter((file:string) => file.endsWith('.ts'))){
                    const cmd = await import(`../${interaction.customId}/${file}`)
                    const obj:Interface.HelpInterface = {CmdName:cmd.name||"No Name Setted",description:cmd.description||"No Description Setted",usage:cmd.usage||"No Usage Setted"}
                    if(cmd.alias && cmd.alias.length > 0){
                        obj.alias = "Alias:"+cmd.alias.join("/")
                    }else if(!cmd.alias){
                        obj.alias = ""
                    }
                    cmds.push(obj)
                }
                const embed = new MessageEmbed()
                .setAuthor(`${interaction.customId} List`,msg.client.user?.displayAvatarURL())
                cmds.forEach((cmd:Interface.HelpInterface)=>{
                    embed.addField(cmd.CmdName,`Description:${cmd.description}\nUsage:${cmd.usage}\n${cmd.alias||""}`)
                })
                sended.edit({embeds:[embed],components:[]})
            })
        }
    }
}